import Vue from 'vue'
import Vuex from 'vuex'
import {
  getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc, } from "firebase/firestore";
import { ref, getStorage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";




Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ownRecipes: [],
    // hardcode
    isLoggedIn: true,
    uid: 0,
    // Used to hide and show components in the RecipesList view
    completeRecipeHidden: true,
    editableRecipeHidden: true,

  },
  mutations: {
    setCompleteRecipeHidden(state, condition){
      state.completeRecipeHidden = condition;
    },
    setEditableRecipeHidden(state, condition){
      state.editableRecipeHidden = condition;
    },
    getOwnRecipes(state, recipes) {
      state.ownRecipes = recipes;
    },
    setUserId(state, uid) {
      state.uid = uid;
    },
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    resetImageUrl(state, recipe) {
      state.ownRecipes.forEach((element) => {
        if (recipe.id == element.id) {
          element.imageUrl = undefined;
        }
      })
    }
  },
  actions: {
    async getOwnRecipes({ commit }) {
      let recipes = [];

      const db = getFirestore();

      const q = query(collection(db, "recipes"), where("uid", "==", this.state.uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const data = doc.data();
        recipes.push(data);
      });

      commit("getOwnRecipes", recipes);
    },

    async addRecipe({ dispatch }, { recipe, image }) {
      const db = getFirestore();

      recipe.uid = this.state.uid;

      const docRef = await addDoc(collection(db, "recipes"), {});
      recipe.id = docRef.id;
      await updateDoc(docRef, recipe);

      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, recipe.id);
        uploadBytes(storageRef, image).then((snapshot) => {
          getDownloadURL(ref(storage, `${recipe.id}`))
            .then((url) => {
              updateDoc(docRef, { imageUrl: url });
              dispatch("getOwnRecipes");
            })
            .catch(err => console.log(`Failed with ${err}`));
        }).catch(err => console.log(`Failed with ${err}`));
      };

      dispatch("getOwnRecipes");
    },

    async deleteImage({ dispatch, commit }, recipe) {
      const storage = getStorage();
      const imageRef = ref(storage, recipe.id);

      // Delete the file
      deleteObject(imageRef).then(() => {
        commit("resetImageUrl", recipe)
        dispatch("getOwnRecipes");
      }).catch((err) => {
        console.log(err);
      });

    },


    async getCurrentUser({ commit, dispatch }) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit("setIsLoggedIn", true);
          commit("setUserId", user.uid);
          dispatch("getOwnRecipes");

        } else {
          commit("setIsLoggedIn", false);
          commit("setUserId", 0);
        }
      })
    },

    async deleteRecipe({ dispatch }, recipe) {
      const db = getFirestore();
      await deleteDoc(doc(db, "recipes", recipe.id));
      dispatch("getOwnRecipes");
    },

    async updateRecipe({ dispatch }, recipe) {
      const db = getFirestore();
      await updateDoc(doc(db, "recipes", recipe.id), recipe);
      dispatch("getOwnRecipes");
    },

  },

  modules: {
  }
})


export default store