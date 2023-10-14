"use client";

// 서버에 reverse된 순서로 저장했다가, 0~30 인덱스만 받아오기 -> 자동으로 갱신되는 것

import { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { 
  getFirestore, 
  // addDoc,   // 임의의 Id 지정
  // setDoc,   // Id 지정 가능
  updateDoc,   // update document
  arrayUnion,   // push elem to array
  // getDocs,  // 전체 읽어오기
  getDoc,   // 문서 하나 읽어오기
  deleteDoc, // 삭제
  doc       // 특정 데이터 읽기
 } from "firebase/firestore";

import './styles/main.css';

export default function Home() {
  const inputRef = useRef();
  const lineRef = useRef();
  const logoRef = useRef();
  const inputContainerRef = useRef();
  const loginRef = useRef();
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
  const [selectedSpans, setSelectedSpans] = useState([]);
  const [likesData, setLikesData] = useState([]);
  const [msgData, setMsgData] = useState([]);
  const [startIndex, setStartIndex] = useState();
  const [endIndex, setEndIndex] = useState();

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
        inputRef.current.focus();
      }, 1000);
    }

    return () => {
      clearInterval(typeLogo);    // 렌더링될때마다 setInterval 활성화되는 것 방지
    };
  }, []);

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

  useEffect(() => {
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
  
  const uploadWordToDb = (word) => {
    let newData = word.replace(/\n/g, "\\n") + "+ " + " ";
    
    const documentRef =  doc(db, "content", id);
    updateDoc(documentRef, {
      contents: arrayUnion(newData + "+" + " ")
    })
    getContentFromDb();
    setWriting("");
  }

  const getContentFromDb = async () => {   
    await getDoc(doc(db, 'content', sessionStorage.getItem('scrapper-login'))).then(res => {
      let data = res._document.data.value.mapValue.fields.contents.arrayValue.values;
      setContent(res._document.data.value.mapValue.fields.contents.arrayValue.values);
      let likesTemp = [];
      let msgTemp = [];
      for(let i=0; i<data.length; i++){
        let splitData = data[i].stringValue.split("+");
        msgTemp.push(splitData[0]);
        likesTemp.push(splitData[1]);
      }
      setMsgData(msgTemp);
      setLikesData(likesTemp);
    });
  }

  useEffect(() => {
    if(msgData){
      let temp = msgData && [...msgData].reverse();
      setContentRev(temp);
    }
  }, [msgData]);

  const uploadHighlight = (res) => {
    const documentRef = doc(db, 'content', id);
    updateDoc(documentRef, {
      contents: res
    });
    getContentFromDb();
  }

  const handleTextSelection = (index) => {
    let startIndex;
    let endIndex;
    let likesRev = [...likesData].reverse();
    let msgRev = [...msgData].reverse();
    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      startIndex = msgRev[selectedIndex].indexOf(selectedText);
      endIndex = startIndex + selectedText.length - 1;
    }

    let testLineBreaks = "";
    for(let i=0; i<startIndex; i++) {
      testLineBreaks += msgRev[selectedIndex][i];
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
      likesRev[selectedIndex] = likesRev[selectedIndex] + count.toString() + " ";
      count++;
    }
    
    let test = [];
    for(let i=0; i<content.length; i++) {
      test.push(msgRev[i] + '+' + likesRev[i]);
    }
    let testRev = [...test].reverse();
    uploadHighlight(testRev);
  };

  return (
    <div className="h-auto min-h-screen w-screen bg-white flex-col justify-center items-center">
      <div className="h-1/6 w-screen flex justify-center items-center fixed transform translate-y-80 z-50 logo-move-up">
        <p 
          onMouseOver={handleLogoOver}
          onMouseOut={handleLogoOut}
          onClick={handleLogoClick}
          ref={logoRef} 
          className="text-gray-500 text-8xl border-r-4 border-black pr-2 cursor-pointer" 
          style={{fontFamily:'lemon-r'}}>
            {logo}
        </p>
      </div>

      <div ref={loginRef} className="w-screen h-screen absolute flex flex-col justify-center items-center transform -translate-y-32 opacity-0">
        <input placeholder="EMAIL" value={id} onChange={e => setId(e.target.value)} onKeyDown={e => {if(e.key === 'Enter') handleLogin(e)}} type='text' className="w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black" />
        <input placeholder="PW" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => {if(e.key === 'Enter') handleLogin(e)}} type='password' className="w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black mt-12" />
        <p className="text-xl mt-12">{msg}</p>
        <a className="text-xl mt-12" href='/signup' >or  SIGN UP</a>
      </div>


      <div ref={inputContainerRef} className="w-screen flex flex-col justify-center items-center absolute transform translate-y-16 opacity-0 overflow-hidden">
        <textarea
          value={writing}
          onChange={(e) => setWriting(e.target.value)}
          ref={inputRef} 
          style={{height:`${textareaHeight}vh`}}
          className="w-5/6 text-black text-3xl text-center mt-80 focus:outline-none leading-[60px] overflow-hidden resize-none" 
        />
        <div className="w-5/6 h-screen flex flex-col items-center">
        {contentRev && contentRev.map((item, index) => {
            const unescapedMsg = item.replace(/\\n/g, "\n");
            let likesRev = [...likesData].reverse();
            let likes = likesRev[index].split(" ");
            let likesCount = [];
            for(let i=0; i<unescapedMsg.length; i++) 
              likesCount[i] = 0;
            for(let i=0; i<likes.length; i++) {
              likesCount[likes[i]] = likesCount[likes[i]] + 1;
            }
              return (
                <p 
                  key={index} 
                  ref={lineRef}
                  onMouseOver={() => {setLineIndex(index); setSelectedIndex(index)}} 
                  onMouseLeave={() => setLineIndex(-1)}
                  style={{ whiteSpace: 'pre-wrap' }}
                  className={index === lineIndex ? "text-black p-3 mt-2 text-2xl text-center rounded-md w-5/6 line-highlight" : "text-black text-2xl p-3 mt-2 text-center rounded-md w-5/6"}
                >
                { unescapedMsg.split("").map((char, index) => {
                    let changeColor;
                    if(likesCount[index] > 8)
                      changeColor = '#FFB508';
                    else if(likesCount[index] >= 7)
                      changeColor = '#FFC210';
                    else if(likesCount[index] >= 6)
                      changeColor = '#FFCD16';
                    else if(likesCount[index] >= 5)
                      changeColor = '#FFD91D';
                    else if(likesCount[index] >= 4)
                      changeColor = '#FFDA39';
                    else if(likesCount[index] >= 3)
                      changeColor = '#FFE06A';
                    else if(likesCount[index] >= 2)
                      changeColor = '#FFE188';
                    else if(likesCount[index] >= 1)
                      changeColor = '#FFEBAE';
                    else 
                      changeColor = '#FFF'

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