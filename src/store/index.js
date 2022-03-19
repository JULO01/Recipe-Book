import Vue from 'vue'
import Vuex from 'vuex'
import {
  getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";



Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ownRecipes: [],
    // hardcode
    isLoggedIn: true,
    uid: 0,

  },
  mutations: {
    getOwnRecipes(state, recipes) {
      state.ownRecipes = recipes;
    },
    setUserId(state, uid) {
      state.uid = uid;
    },
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
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

    async addRecipe({ commit, dispatch }, recipe) {
      const db = getFirestore();

      // dummy
      if (!recipe.imageUrl) {
        recipe.imageUrl = "https://www.edeka.de/media/01-rezeptbilder/rezeptbilder-a-d/rez-edeka-burger-the-big-american-rezept-a-d-1-1.jpg"
      }
      recipe.uid = this.state.uid;

      const docRef = await addDoc(collection(db, "recipes"), {});

      recipe.id = docRef.id;

      await updateDoc(docRef, recipe);

      // const docRef = await addDoc(collection(db, "recipes"), recipe);

      dispatch("getOwnRecipes");
    },

    async getCurrentUser({ commit, dispatch }) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit("setIsLoggedIn", true);
          commit("setUserId", user.uid);
          dispatch("getOwnRecipes");

        } else {
          console.log("No user logged in");
          commit("setIsLoggedIn", false);
          commit("setUserId", 0);
        }
      })
    }
  },
  modules: {
  }
})


export default store