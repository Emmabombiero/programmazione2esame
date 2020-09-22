import firebase from '@firebase/app'; 
import '@firebase/firestore'; 

firebase.initializeApp({
  apiKey: "AIzaSyBe9b0l7HNzf8J8BDlKKNYWHrOguQ_bmz4",
  authDomain: "informatica-ii-2741a.firebaseapp.com",
  projectId: "informatica-ii-2741a",
});

var db = firebase.firestore();

export default {
  isAuthenticated() {
    return !!localStorage.getItem("username");
  },
  login(username) {
    localStorage.setItem("username", username);
  },
  logout() {
    localStorage.removeItem("username");
  },
  getBooks() {
    return db.collection("opere").get();
  },

  getBook(titolo) {
    return db.collection("opere").where('titolo','==',titolo).get();
  },

  getPreferitiBooks() {
    return db.collection("opere").where('preferito','==', true).get();
  },

  getFilms() {
    return db.collection("film").get();
  },

  getFilm(titolo) {
    return db.collection("film").where('titolo','==',titolo).get();
  },

  getPreferitiFilms() {
    return db.collection("film").where('preferito','==', true).get();
  },

  saveFavourite(id){
    return db.collection("opere").doc(id).set({preferiti: false,}).get();
  },

  searchBook(text) {
    if (!text || text.length < 3) {
      return new Promise(resolve => {
        resolve([]);
      });
    }
    return db.collection("opere")
    .get()
    .then((snapshot) => {
        
        var tmp3 = [];
        snapshot.docs.forEach(doc => {
          tmp3.push(doc.data());
        });
        return tmp3.filter(element => element.titolo.indexOf(text) >= 0)
          .map(element => element.titolo);
      });
  }
}; //chiusura export default