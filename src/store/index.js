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
    async getOwnRecipes({ commit, state }) {
      let recipes = [];
      const db = getFirestore();
      const q = query(collection(db, `users/${state.uid}/recipes`), where("uid", "==", state.uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const data = doc.data();
        recipes.push(data);
      });

      commit("getOwnRecipes", recipes);
    },

    async addRecipe({ dispatch, state }, { recipe, image, }) {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, `users/${state.uid}/recipes`), {});

      recipe.uid = state.uid;     
      recipe.id = docRef.id;
      await updateDoc(docRef, recipe);

      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `users/${state.uid}/recipes/${recipe.id}`);
        uploadBytes(storageRef, image).then((snapshot) => {
          getDownloadURL(storageRef)
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
      const imageRef = ref(storage, `users/${state.uid}/recipes/${recipe.id}`);

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

    async deleteRecipe({ dispatch, state }, recipe) {
      const db = getFirestore();
      await deleteDoc(doc(db, `users/${state.uid}/recipes`, recipe.id));
      dispatch("getOwnRecipes");
    },

    async updateRecipe({ dispatch, state }, recipe) {
      const db = getFirestore();
      await updateDoc(doc(db, `users/${state.uid}/recipes`, recipe.id), recipe);
      dispatch("getOwnRecipes");
    },

  },

  modules: {
  }
})


export default store