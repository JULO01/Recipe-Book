import Vue from 'vue'
import Vuex from 'vuex'
import {
  getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs, doc, setDoc } from "firebase/firestore";



Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ownRecipes: [],
    // hardcode
    isLoggedIn: false,
    uid: 0,

  },
  mutations: {
    getOwnRecipes(state, recipes) {
      state.ownRecipes = recipes;
    },
    setUserId(state, uid){
      state.uid = uid;
    },
    setIsLoggedIn(state, isLoggedIn){
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

    async addRecipe({ commit }, recipe) {
      const db = getFirestore();

      const recipesRef = collection(db, "recipes");

      // dummy
      if (!recipe.imageUrl) {
        recipe.imageUrl = "https://www.edeka.de/media/01-rezeptbilder/rezeptbilder-a-d/rez-edeka-burger-the-big-american-rezept-a-d-1-1.jpg"
      }

      await setDoc(doc(recipesRef), {
        imageUrl: recipe.imageUrl,
        ingredients: recipe.ingredients,
        name: recipe.name,
        preperation: recipe.preperation,
        uid: this.state.uid,
      });
    },

    async getCurrentUser({ commit }) {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        commit("setIsLoggedIn", true);
        commit("setUserId", user.uid);
      } else {
        commit("setIsLoggedIn", false);
        commit("setUserId", 0);
      }
    }
  },
  modules: {
  }
})


export default store