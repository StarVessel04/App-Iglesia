import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

//import 'firebase/compat/'


export const firebaseConfig = {
    apiKey: "AIzaSyBek6RnzBsn7iWFYVgPuy1crR7AC-MakYs",
    authDomain: "work-56dd4.firebaseapp.com",
    databaseURL: "https://work-56dd4-default-rtdb.firebaseio.com",
    projectId: "work-56dd4",
    storageBucket: "work-56dd4.appspot.com",
    messagingSenderId: "519167947529",
    appId: "1:519167947529:web:7d4e098b565386b7d599d8",
    measurementId: "G-037N1PRTDH"
  };
  
  // Initialize Firebase
  //const app = initializeApp(firebaseConfig);
 firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();





export default {
    firebase,
    db,
    


}