"use client";

// 서버에 reverse된 순서로 저장했다가, 0~30 인덱스만 받아오기 -> 자동으로 갱신되는 것

import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation'
import { initializeApp } from "firebase/app";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { 
  getFirestore, 
  addDoc,   
  updateDoc,   
  getDocs,  
  getDoc,  
  deleteDoc, 
  collection,
  orderBy,
  query,
  doc     
 } from "firebase/firestore";

import './styles/main.css';

export default function Home() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLParagraphElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [logo, setLogo] = useState("");
  const [contentRev, setContentRev] = useState([]);
  const [lineIndex, setLineIndex] = useState(-1);
  const [result, setResult] = useState();
  const [active, setActive] = useState(false);
  const [msg, setMsg] = useState("");
  const [id, setId] = useState<any>("");
  const [pw, setPw] = useState("");
  const [writing, setWriting] = useState("");
  const [textareaHeight, setTextareaHeight] = useState(10);
  const [selectedId, setselectedId] = useState<string>("");;
  const [msgData, setMsgData] = useState([]);
  const [menuHomeOver, setMenuHomeOver] = useState(false);
  const [menuMyOver, setMenuMyOver] = useState(false);
  const [menuScrapOver, setMenuScrapOver] = useState(false);
  const [menuLogoutOver, setMenuLogoutOver] = useState(false);
  const [showId, setShowId] = useState(false);
  const previousTime:any = new Date('2023-10-15T12:00:00');

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
    let _id:any = sessionStorage.getItem('scrapper-login');
    setId(_id && _id);
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
      if(loginRef.current !== undefined)
        loginRef.current && loginRef.current.classList.add('login-show-up');
    else {
      getContentFromDb();
      setTimeout(() => {
        if(inputContainerRef.current !== undefined && inputRef.current !== undefined && menuRef !== undefined) {
          inputContainerRef.current && inputContainerRef.current.classList.add('textarea-show-up');
          inputRef.current && inputRef.current.classList.add('textarea-show-up');
          menuRef.current && menuRef.current.classList.add('textarea-show-up');
          inputRef.current && inputRef.current.focus();
        }
        
      }, 1000);
    }

    return () => {
      clearInterval(typeLogo);    // 렌더링될때마다 setInterval 활성화되는 것 방지
    };
  }, []);

  useEffect(() => {
    if(writing !== "") {
      if(logoRef.current !== undefined && logoRef.current) {
        logoRef.current.classList.remove('not-available-to-upload');
        logoRef.current.classList.add('available-to-upload');
      }
    }
    else {
      if(logoRef.current !== undefined && logoRef.current) {
        logoRef.current.classList.remove('available-to-upload');
        logoRef.current.classList.add('not-available-to-upload');
      }
    }
    if(writing.match(/\n/g) !== null) {
      const matchResult = writing.match(/\n/g);
      const lineCount = matchResult ? matchResult.length : 0;
      setTextareaHeight((10 + lineCount) * 3.5);
    }
  }, [writing])

  useEffect(() => {
    if(msgData){
      let temp = msgData && [...msgData].reverse();
      setContentRev(temp);
    }
  }, [msgData]);

  const handleLogin = async (e:any) => {
    if(e.key === 'Enter') {   // 엔터가 눌렸을 때에만 반응
      if(!id || !pw)
        setMsg("모두 입력해주세요");
      else {
        getContentFromDb();
        getDoc(doc(db, 'accounts', id)).then((res:any) => {
          let dbPw = res.data().password;
          if(dbPw === null)
            setMsg("존재하지 않는 아이디");
          else {
            if(pw === dbPw) {
              setMsg("");
              sessionStorage.setItem('scrapper-login', id);
              loginRef.current && loginRef.current.classList.add('login-done');
              inputContainerRef.current && inputContainerRef.current.classList.add('textarea-show-up');
              menuRef.current && menuRef.current.classList.add('textarea-show-up');
              setTimeout(() => {
                inputRef.current && inputRef.current.classList.add('textarea-show-up');
                inputRef.current && inputRef.current.focus();
              }, 100);
              getContentFromDb();
            }
            else 
              setMsg("비밀번호 미일치");
      }
        });
      }
    }
  };

  const handleLogoOver = () => {
    logoRef.current && logoRef.current.classList.add('font-black');
  }

  const handleLogoOut = () => {
    logoRef.current && logoRef.current.classList.remove('font-black');
  }

  const handleLogoClick = () => {
    uploadMsg(writing);
  }
  
  const uploadMsg = (word: string) => {
    let currentTime:any = new Date();
    let uploadTime = currentTime - previousTime;
    addDoc(collection(db, 'posts'), {
      msg: word,
      likes: "",
      user: id,
      time: uploadTime
    })

    getContentFromDb();
    setWriting("");
  }

  const getContentFromDb = async () => {   
    let id = sessionStorage.getItem('scrapper-login');
    let q = query(collection(db, 'posts'), orderBy('time', 'desc'))
    await getDocs(q)
    .then((res:any) => {
      let temp:any = [];
      res.forEach((doc:any) => {
        let docTemp = doc.data();
        if(docTemp.user === id) {
          docTemp.postId = doc.id;
          temp.push(docTemp);
        }
      });    
      setPostList(temp);
    })
  }

  const uploadLikes= (postId: string, newLikes: string) => {

    const documentRef = doc(db, 'posts', postId);
    updateDoc(documentRef, {
      likes: newLikes
    });
    getContentFromDb();
  }

  const handleTextSelection = () => {
    let startIndex;
    let endIndex;
    const findObj = postList.find((item: any) => (item as any).postId === selectedId) as any;

    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
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
    if(testLineBreaks.match(/\\n/g) !== null) {
      const _testLineBreaks = testLineBreaks.match(/\\n/g);
      const _lineBreaks = _testLineBreaks ? _testLineBreaks.length : 0
      linebreaks = _lineBreaks
    }
      

    if(linebreaks > 0) {
      startIndex -= linebreaks;
      if(endIndex)
      endIndex -= linebreaks;
    } 

    let length;
    if(endIndex !== undefined)
    length = endIndex - startIndex;
    let count = startIndex;

    if(length!==undefined)
      for(let i=0; i<length+1; i++) {
        findObj.likes = findObj.likes + count.toString() + " ";
        count++;
      }

    uploadLikes(selectedId, findObj.likes);
  };

  const handleDelete = () => {
    deleteDoc(doc(db, 'posts', selectedId))
    .then((res:any) => {
      alert("삭제되었습니다.");
    })
    getContentFromDb();
  }

  const handleScrap = () => {   // 나중에 아이콘 채워지도록 만들기
    getDoc(doc(db, 'accounts', id))
    .then((res:any) => {
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
      .then((res:any) => {
        alert("스크랩되었습니다.");
      })
    })
  }

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
          <DashboardIcon onClick={()=>router.push('/posts')} onMouseOver={()=>setMenuHomeOver(true)} onMouseLeave={()=>setMenuHomeOver(false)} className={menuHomeOver ? "scale-up" : "scale-down"} sx={{fontSize:50, color:'black'}} />
          <HomeIcon onClick={()=>router.push('/')} onMouseOver={()=>setMenuMyOver(true)} onMouseLeave={()=>setMenuMyOver(false)} className={menuMyOver ? "scale-up" : "scale-down"} sx={{fontSize:50, color:'black', marginTop:'3vh'}} />
          <StarIcon onClick={()=>router.push('/scrap')} onMouseOver={()=>setMenuScrapOver(true)} onMouseLeave={()=>setMenuScrapOver(false)} className={menuScrapOver ? "scale-up" : "scale-down"} sx={{fontSize:50, color:'black', marginTop:'3vh'}} />
          <LogoutIcon onClick={()=>{sessionStorage.clear(); window.location.reload()}} onMouseOver={()=>{setShowId(true); setMenuLogoutOver(true);}} onMouseLeave={()=>{setShowId(false); setMenuLogoutOver(false);}} className={menuLogoutOver ? "scale-up" : "scale-down"} sx={{fontSize:40, marginLeft:'8px', color:'black', marginTop:'3vh'}} />
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
          className="w-5/6 text-black text-2xl text-center font-thin mt-80 focus:outline-none overflow-hidden resize-none" 
        />
        <div className="w-5/6 h-screen flex flex-col items-center">
        { postList.map((item: any, index: any) => {
            const unescapedMsg = item.msg.replace(/\\n/g, "\n");
            
            // 좋아요 정보 시각화 로직
            let likesCount:any = [];
            let likes = item.likes.split(" ");
            for(let i=0; i<unescapedMsg.length; i++)  // 초기화
              likesCount[i] = 0;
            for(let i=0; i<likes.length; i++) { // 드래그된 부분의 숫자 증가
              likesCount[likes[i]] = likesCount[likes[i]] + 1;
            }
              return (
                <div key={index} className="flex flex-row justify-center items-center ml-6" onMouseOver={() => {setLineIndex(index); setselectedId(item.postId)}} onMouseLeave={() => setLineIndex(-1)}>
                  <p 
                    key={index} 
                    ref={lineRef}
                    style={{ whiteSpace: 'pre-wrap' }}
                    className={index === lineIndex ? "leading-[38px] text-black font-extralight p-3 mt-2 text-[20px] text-center rounded-md line-highlight" : "leading-[38px] text-black font-extralight text-[20px] p-3 mt-2 text-center rounded-md line-un-highlight"}
                  >
                  { unescapedMsg.split("").map((char: string, index: number) => {
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
                        <span key={index} onMouseUp={handleTextSelection} className="text-black" style={{ backgroundColor: changeColor, userSelect: 'text' }}>{char}</span>
                      )
                    })
                  }
                  </p>
                  <div className={index === lineIndex ? "opacity-1" : "opacity-0"}>
                    <StarIcon sx={{color:'#333', cursor:'pointer'}} onClick={handleScrap} />
                    <DeleteIcon sx={{color:'#333', cursor:'pointer'}} onClick={handleDelete} />
                  </div>
                </div>
              );  
          })}
        </div>
      </div>
      
    </div>
  )
}