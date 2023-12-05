import { getFirestore, getDoc, updateDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB0wNhng69y2_dkHsPjN1k579LeYrSQWdU",
  authDomain: "scrapper-9558b.firebaseapp.com",
  databaseURL: "https://scrapper-9558b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "scrapper-9558b",
  storageBucket: "scrapper-9558b.appspot.com",
  messagingSenderId: "241265284136",
  appId: "1:241265284136:web:253ec9f008e31a3d03911d"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const handleScrap = (id:string) => {  
    getDoc(doc(db, 'accounts', id))
    .then((res: any) => {
      let _scrap = res.data().scrap;
      for(let i=0; i<_scrap.length; i++) {
        if(_scrap[i] === selectedId) {
          alert("이미 스크랩된 게시물입니다.");
          return;
        }
      }
      _scrap.push(selectedId);
      updateDoc(doc(db, 'accounts', id), {
        scrap: _scrap
      })
      .then(() => {
        alert("스크랩되었습니다.");
      })
    })
}