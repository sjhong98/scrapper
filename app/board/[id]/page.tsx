"use client";

// 서버에 reverse된 순서로 저장했다가, 0~30 인덱스만 받아오기 -> 자동으로 갱신되는 것

import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation'
import { initializeApp } from "firebase/app";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StarIcon from '@mui/icons-material/Star';
import { 
  getFirestore, 
  query,
  orderBy,
  // addDoc,   // 임의의 Id 지정
  // setDoc,   // Id 지정 가능
  updateDoc,   // update document
  arrayUnion,   // push elem to array
  getDocs,  // 전체 읽어오기
  getDoc,   // 문서 하나 읽어오기
  deleteDoc, // 삭제
  doc,       // 특정 데이터 읽기
  collection
 } from "firebase/firestore";

import '../../styles/main.css';

export default function Board(params) {
  const inputRef = useRef();
  const lineRef = useRef();
  const logoRef = useRef();
  const inputContainerRef = useRef();
  const loginRef = useRef();
  const menuRef = useRef();
  const homeRef = useRef();
  const myRef = useRef();
  const router = useRouter();

  const [logo, setLogo] = useState("");
  const [content, setContent] = useState([]);
  const [contentRev, setContentRev] = useState([]);
  const [lineIndex, setLineIndex] = useState(-1);
  const [postList, setPostList] = useState([]);
  const [msg, setMsg] = useState("");
  const [id, setId] = useState(params.params.id);
  const [selectedId, setselectedId] = useState(-1);;
  const [likesData, setLikesData] = useState([]);
  const [msgData, setMsgData] = useState([]);
  const [menuHomeOver, setMenuHomeOver] = useState(false);
  const [menuMyOver, setMenuMyOver] = useState(false);
  const [menuScrapOver, setMenuScrapOver] = useState(false);

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

  useEffect(() => {
    let i = 0;
    let ch = params.params.id[0] + params.params.id;

    const typeLogo = setInterval(() => {
      if (i < ch.length-1) {
        setLogo((prev) => prev + ch[i]);
        i++;
      } else {
        clearInterval(typeLogo);
      }
    }, 120);

    inputContainerRef.current.classList.add('textarea-show-up');
    menuRef.current.classList.add('textarea-show-up');
    getContentFromDb();

    return () => {
      clearInterval(typeLogo);    // 렌더링될때마다 setInterval 활성화되는 것 방지
    };
  }, [])

  useEffect(() => {
    if(msgData){
      let temp = msgData && [...msgData].reverse();
      setContentRev(temp);
    }
  }, [msgData]);


  const getContentFromDb = async () => {   
    let q = query(collection(db, 'posts'), orderBy('time', 'desc'))
    await getDocs(q)
    .then(res => {
      let temp = [];
      res.forEach(doc => {
        let docTemp = doc.data();
        if(docTemp.user === id) {
          docTemp.postId = doc.id;
          temp.push(docTemp);
        }
      });    
      setPostList(temp);
    })
  }

  const uploadLikes= (postId, newLikes) => {
    console.log(postId, newLikes)

    const documentRef = doc(db, 'posts', postId);
    updateDoc(documentRef, {
      likes: newLikes
    });
    getContentFromDb();
  }

  const handleTextSelection = (postId) => {
    let startIndex;
    let endIndex;
    const findObj = postList.find(item => item.postId === selectedId);

    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      startIndex = findObj.msg.indexOf(selectedText);
      endIndex = startIndex + selectedText.length - 1;
    }

    let testLineBreaks = "";    // 줄바꿈 문자만큼 하이라이트를 앞 당김
    for(let i=0; i<startIndex; i++) {
      testLineBreaks += findObj.msg[i];
    }
    let linebreaks = 0;
    if(testLineBreaks.match(/\\n/g) !== null)
      linebreaks = testLineBreaks.match(/\\n/g).length;

    if(linebreaks > 0) {
      startIndex -= linebreaks;
      endIndex -= linebreaks;
    } 

    let length = endIndex - startIndex;
    let count = startIndex;

    for(let i=0; i<length+1; i++) {
      findObj.likes = findObj.likes + count.toString() + " ";
      count++;
    }

    uploadLikes(selectedId, findObj.likes);
  };

  return (
    <div className="h-auto min-h-screen w-screen bg-white flex flex-col justify-center items-center">
      <div className="h-1/6 w-1/2 flex justify-center items-center fixed top-0 z-40">
        <p 
          className="tracking-[-5px] text-black text-8xl border-r-4 border-black pr-[15px] cursor-pointer" 
          style={{fontFamily:'lemon-r'}}>
            {logo}
        </p>
      </div>

      <div className="right-0 mr-12 mt-12 opacity-0 fixed top-0 cursor-pointer flex flex-col" style={{zIndex:9999}} ref={menuRef} >
          <DashboardIcon ref={homeRef} onClick={()=>router.push('/posts')} onMouseOver={()=>setMenuHomeOver(true)} onMouseLeave={()=>setMenuHomeOver(false)} className={menuHomeOver ? "scale-up" : "scale-down"} sx={{fontSize:50, color:'black'}} />
          <HomeIcon ref={myRef} onClick={()=>router.push('/')} onMouseOver={()=>setMenuMyOver(true)} onMouseLeave={()=>setMenuMyOver(false)} className={menuMyOver ? "scale-up" : "scale-down"} sx={{fontSize:50, color:'black', marginTop:'3vh'}} />
          <StarIcon onClick={()=>router.push('/scrap')} onMouseOver={()=>setMenuScrapOver(true)} onMouseLeave={()=>setMenuScrapOver(false)} className={menuScrapOver ? "scale-up" : "scale-down"} sx={{fontSize:50, color:'black', marginTop:'3vh'}} />
      </div>

      <div ref={inputContainerRef} className="w-screen flex flex-col mt-60 justify-center items-center absolute transform translate-y-16 opacity-0 overflow-hidden">
        <div className="w-5/6 mt-32 h-screen flex flex-col items-center">
        { postList.map((item, index) => {
            const unescapedMsg = item.msg.replace(/\\n/g, "\n");
            
            // 좋아요 정보 시각화 로직
            let likesCount = [];
            let likes = item.likes.split(" ");
            for(let i=0; i<unescapedMsg.length; i++)  // 초기화
              likesCount[i] = 0;
            for(let i=0; i<likes.length; i++) { // 드래그된 부분의 숫자 증가
              likesCount[likes[i]] = likesCount[likes[i]] + 1;
            }
              return (
                
                  <p 
                    key={index} 
                    ref={lineRef}
                    onMouseOver={() => {setLineIndex(index); setselectedId(item.postId)}} 
                    onMouseLeave={() => setLineIndex(-1)}
                    style={{ whiteSpace: 'pre-wrap' }}
                    className={index === lineIndex ? "leading-[38px] text-black font-extralight p-3 mt-2 text-[20px] text-center rounded-md line-highlight" : "leading-[38px] text-black font-extralight text-[20px] p-3 mt-2 text-center rounded-md line-un-highlight"}
                  >
                  { unescapedMsg.split("").map((char, index) => {
                      let changeColor;
                      if(likesCount[index] > 8) changeColor = '#A6A6A6';
                      else if(likesCount[index] >= 7) changeColor = '#ADADAD';
                      else if(likesCount[index] >= 6) changeColor = '#B5B5B5';
                      else if(likesCount[index] >= 5) changeColor = '#BFBFBF';
                      else if(likesCount[index] >= 4) changeColor = '#CCCCCC';
                      else if(likesCount[index] >= 3) changeColor = '#D9D9D9';
                      else if(likesCount[index] >= 2) changeColor = '#E6E6E6';
                      else if(likesCount[index] >= 1) changeColor = '#F2F2F2';
                      else changeColor = '#FFF'

                      return (
                        <span key={index} onMouseUp={(index) => handleTextSelection(index)} className="text-black" style={{ backgroundColor: changeColor, userSelect: 'text' }}>{char}</span>
                      )
                    })
                  }
                  </p>
              );
          })}
        </div>
      </div>
      
    </div>
  )
}