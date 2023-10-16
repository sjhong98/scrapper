"use client";

// 서버에 reverse된 순서로 저장했다가, 0~30 인덱스만 받아오기 -> 자동으로 갱신되는 것

import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation'
import { initializeApp } from "firebase/app";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { 
  getFirestore, 
  // addDoc,   // 임의의 Id 지정
  // setDoc,   // Id 지정 가능
  updateDoc,   // update document
  arrayUnion,   // push elem to array
  getDocs,  // 전체 읽어오기
  getDoc,   // 문서 하나 읽어오기
  deleteDoc, // 삭제
  collection,
  doc       // 특정 데이터 읽기
 } from "firebase/firestore";

import './styles/main.css';

export default function Home() {
  const inputRef = useRef();
  const lineRef = useRef();
  const logoRef = useRef();
  const inputContainerRef = useRef();
  const loginRef = useRef();
  const menuRef = useRef();
  const router = useRouter();

  const [logo, setLogo] = useState("");
  const [content, setContent] = useState([]);
  const [contentRev, setContentRev] = useState([]);
  const [lineIndex, setLineIndex] = useState(-1);
  const [result, setResult] = useState();
  const [active, setActive] = useState(false);
  const [msg, setMsg] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [writing, setWriting] = useState("");
  const [textareaHeight, setTextareaHeight] = useState(10);
  const [selectedIndex, setSelectedIndex] = useState(-1);;
  const [likesData, setLikesData] = useState([]);
  const [msgData, setMsgData] = useState([]);
  const [menuHomeOver, setMenuHomeOver] = useState(false);
  const [menuMyOver, setMenuMyOver] = useState(false);
  const [menuLogoutOver, setMenuLogoutOver] = useState(false);

  const [postList, setPostList] = useState([]);

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
    let ch = "SSCRAPPER";

    const typeLogo = setInterval(() => {
      if (i < ch.length-1) {
        setLogo((prev) => prev + ch[i]);
        i++;
      } else {
        clearInterval(typeLogo);
      }
    }, 120);

    if(!sessionStorage.getItem('scrapper-login')) 
      loginRef.current.classList.add('login-show-up');
    else {
      setId(sessionStorage.getItem('scrapper-login'));
      getContentFromDb();
      setTimeout(() => {
        inputContainerRef.current.classList.add('textarea-show-up');
        inputRef.current.classList.add('textarea-show-up');
        menuRef.current.classList.add('textarea-show-up');
        inputRef.current.focus();
      }, 1000);
    }

    return () => {
      clearInterval(typeLogo);    // 렌더링될때마다 setInterval 활성화되는 것 방지
    };
  }, []);

  useEffect(() => {
    if(writing !== "") {
      logoRef.current.classList.remove('not-available-to-upload');
      logoRef.current.classList.add('available-to-upload');
    }
    else {
      logoRef.current.classList.remove('available-to-upload');
      logoRef.current.classList.add('not-available-to-upload');
    }
    setTextareaHeight((10 + writing.match(/\n/g) || []).length * 3.5);    // textarea height 조절
  }, [writing])

  useEffect(() => {     // 로그인
    if(active) {
      if(result === null)
        setMsg("존재하지 않는 아이디");
      else {
        let dbPw = result.data.value.mapValue.fields.password.stringValue;
        if(pw === dbPw) {
          setMsg("");
          sessionStorage.setItem('scrapper-login', id);
          loginRef.current.classList.add('login-done');
          inputContainerRef.current.classList.add('textarea-show-up');
          menuRef.current.classList.add('textarea-show-up');
          setTimeout(() => {
            inputRef.current.classList.add('textarea-show-up');
            inputRef.current.focus();
          }, 100);
          getContentFromDb();
        }
        else 
          setMsg("비밀번호 미일치");
      }
    }
    setActive(true);
  }, [result]);

  useEffect(() => {
    if(msgData){
      let temp = msgData && [...msgData].reverse();
      setContentRev(temp);
    }
  }, [msgData]);

  const handleLogin = async (e) => {
    if(e.key === 'Enter') {   // 엔터가 눌렸을 때에만 반응
      if(!id || !pw)
        setMsg("모두 입력해주세요");
      else {
        getContentFromDb();
        getDoc(doc(db, 'content', id)).then(res => setResult(res._document));
      }
    }
  };

  const handleLogoOver = () => {
    logoRef.current.classList.add('font-black');
  }

  const handleLogoOut = () => {
    logoRef.current.classList.remove('font-black');
  }

  const handleLogoClick = () => {
    uploadWordToDb(writing);
  }
  
  const uploadWordToDb = (word) => {
    let newData = word.replace(/\n/g, "\\n") + "+" + " ";
    let newDataWithId = word.replace(/\n/g, "\\n") + "+" + " " + "+" + id;
    
    const documentRef =  doc(db, "content", id);
    const documentRef2 = doc(db, "main", "data");
    updateDoc(documentRef, {
      contents: arrayUnion(newData),
    })

    updateDoc(documentRef2, {
      contents: arrayUnion(newDataWithId),
    })
    getContentFromDb();
    setWriting("");
  }

  const getContentFromDb = async () => {   
    await getDocs(collection(db, 'posts'))
    .then(res => {
      let temp = [];
      res.forEach(doc => {
        let docTemp = doc.data();
        docTemp.postId = doc.id;
        temp.push(docTemp);
      });    
      setPostList(temp.reverse());
    })
  }

  const uploadHighlight = (postId, newLikes) => {

    const documentRef = doc(db, 'posts', postId);
    updateDoc(documentRef, {
      posts: newLikes
    });
    getContentFromDb();
  }

  const handleTextSelection = (postId) => {
    let startIndex;
    let endIndex;
    const findObj = postList.find(item => item.postId === selectedIndex);

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

    uploadHighlight(postId, findObj.likes);
  };

  return (
    <div className="h-auto min-h-screen w-screen bg-white flex flex-col justify-center items-center">
      <div className="h-1/6 w-1/2 flex justify-center items-center fixed transform translate-y-80 top-0 z-40 logo-move-up">
        <p 
          onMouseOver={handleLogoOver}
          onMouseOut={handleLogoOut}
          onClick={handleLogoClick}
          ref={logoRef} 
          className="tracking-[-5px] text-gray-500 text-8xl border-r-4 border-black pr-[15px] cursor-pointer" 
          style={{fontFamily:'lemon-r'}}>
            {logo}
        </p>
      </div>

      <div className="right-0 mr-12 mt-12 opacity-0 fixed top-0 cursor-pointer flex flex-col" style={{zIndex:9999}} ref={menuRef} >
          <HomeIcon onClick={()=>router.push('/posts')} onMouseOver={()=>setMenuHomeOver(true)} onMouseLeave={()=>setMenuHomeOver(false)} className={menuHomeOver ? "scale-up" : "scale-down"} sx={{fontSize:50, color:'black'}} />
          <PersonIcon onClick={()=>router.push('/')} onMouseOver={()=>setMenuMyOver(true)} onMouseLeave={()=>setMenuMyOver(false)} className={menuMyOver ? "scale-up" : "scale-down"} sx={{fontSize:50, color:'black', marginTop:'3vh'}} />
          <LogoutIcon onClick={()=>{sessionStorage.clear(); window.location.reload()}} onMouseOver={()=>setMenuLogoutOver(true)} onMouseLeave={()=>setMenuLogoutOver(false)} className={menuLogoutOver ? "scale-up" : "scale-down"} sx={{fontSize:50, color:'black', marginTop:'3vh'}} />
      </div>

      <div ref={loginRef} className="w-screen h-screen absolute flex flex-col justify-center items-center transform -translate-y-32 opacity-0">
        <input placeholder="EMAIL" value={id} onChange={e => setId(e.target.value)} onKeyDown={e => {if(e.key === 'Enter') handleLogin(e)}} type='text' className="w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black" />
        <input placeholder="PW" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => {if(e.key === 'Enter') handleLogin(e)}} type='password' className="w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black mt-12" />
        <p className="text-xl mt-12">{msg}</p>
        <a className="text-xl mt-12" href='/signup' >or  SIGN UP</a>
      </div>


      <div ref={inputContainerRef} className="w-screen flex flex-col mt-60 justify-center items-center absolute transform translate-y-16 opacity-0 overflow-hidden">
        <textarea
          value={writing}
          onChange={(e) => setWriting(e.target.value)}
          ref={inputRef} 
          style={{height:`${textareaHeight}vh`}}
          className="w-5/6 text-black text-2xl text-center font-thin mt-80 focus:outline-none leading-[100px] overflow-hidden resize-none" 
        />
        <div className="w-5/6 h-screen flex flex-col items-center">
        { postList.map((item, index) => {
            const unescapedMsg = item.msg.replace(/\\n/g, "\n");
            
            // 좋아요 정보 시각화 로직
            let likesCount = [];
            for(let i=0; i<unescapedMsg.length; i++)  // 초기화
              likesCount[i] = 0;
            for(let i=0; i<item.likes.length; i++) { // 드래그된 부분의 숫자 증가
              likesCount[item.likes[i]] = likesCount[item.likes[i]] + 1;
            }
              return (
                <p 
                  key={index} 
                  ref={lineRef}
                  onMouseOver={() => {setLineIndex(index); setSelectedIndex(item.postId)}} 
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