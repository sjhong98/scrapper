import { getFirestore, getDoc, updateDoc, doc, query, collection, orderBy, getDocs, addDoc } from "firebase/firestore";
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

export interface PostList {
  postId: string,
  msg: string,
  likes: string,
}

export const handleScrap = (id:string, selectedId:string) => {  
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

export const handleTextSelection = (postList:PostList[], selectedId:string) => {
  let startIndex;
  let endIndex;

  const findObj:PostList|undefined = postList.find((item:PostList) => item.postId === selectedId);

  const selection = window.getSelection();

  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if(findObj !== undefined) {
      startIndex = findObj.msg.indexOf(selectedText);
      endIndex = startIndex + selectedText.length - 1;
    }
  }

  let testLineBreaks = "";    // 줄바꿈 문자만큼 하이라이트를 앞 당김
  if(startIndex !== undefined)
    for(let i=0; i<startIndex; i++) {
      if(findObj != undefined)
      testLineBreaks += findObj.msg[i];
    }
  let linebreaks = 0;
  if(testLineBreaks.match(/\\n/g) !== null) {
    const _testLineBreaks = testLineBreaks.match(/\\n/g);
    const _lineBreaks = _testLineBreaks ? _testLineBreaks.length : 0
    linebreaks = _lineBreaks
  }
    

  if(linebreaks > 0 && startIndex !== undefined) {
    startIndex -= linebreaks;
    if(endIndex)
    endIndex -= linebreaks;
  } 

  let length;
  if(endIndex !== undefined && startIndex !== undefined)
    length = endIndex - startIndex;
  let count = startIndex;

  if(length !== undefined && findObj !== undefined && count !== undefined)
    for(let i=0; i<length+1; i++) {
      findObj.likes = findObj.likes + count.toString() + " ";
      count++;
    }

  if(selectedId && findObj !== undefined)
    uploadLikes(selectedId, findObj.likes);
};

const uploadLikes= (postId: string, newLikes: string) => {

  const documentRef = doc(db, 'posts', postId);
  updateDoc(documentRef, {
    likes: newLikes
  });
  getContentFromDb();
}

export const getContentFromDb = async () => {
  try {
    let id = sessionStorage.getItem('scrapper-login');
    console.log("id : ", id);
    let q = query(collection(db, 'posts'), orderBy('time', 'desc'));

    const res: any = await getDocs(q);
    let temp: PostList[] = [];

    res.forEach((doc: any) => {
      let docTemp = doc.data();
      if (docTemp.user === id) {
        docTemp.postId = doc.id;
        temp.push(docTemp);
      }
    });
    return temp;
    
  } catch (error) {
    throw error;
  }
}

export const uploadMsg = (word: string) => {
  let previousTime:Date = new Date('2023-10-15T12:00:00');
  let currentTime:Date = new Date();
  let uploadTime = currentTime.getTime() - previousTime.getTime();
  if(word !== ""){
    addDoc(collection(db, 'posts'), {
      msg: word,
      likes: "",
      user: id,
      time: uploadTime
    })

    getContentFromDb();
    
  }
}

export const handleUnscrap = (selectedId:string) => {   // 나중에 아이콘 채워지도록 만들기
  getDoc(doc(db, 'accounts', id))
  .then((res:any) => {
    let _scrap = res.data().scrap;
    let result = _scrap.find((item:any) => {item !== selectedId});
    updateDoc(doc(db, 'accounts', id), {
      scrap: result
    })
    .then((res:any) => {
      alert("스크랩이 취소되었습니다.");
    })
  })
}