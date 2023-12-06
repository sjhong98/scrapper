"use client";

// 서버에 reverse된 순서로 저장했다가, 0~30 인덱스만 받아오기 -> 자동으로 갱신되는 것

import { useEffect, useRef, useState } from "react";
import React from 'react';
import { initializeApp } from "firebase/app";
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { getFirestore, addDoc, getDoc, deleteDoc, collection, orderBy, query, doc, DocumentSnapshot, DocumentData } from "firebase/firestore";
import { handleScrap, PostList, handleTextSelection, getContentFromDb, uploadMsg } from "./functions";
import MenuBar from "./modules/menuBar";
import './styles/main.css';

export default function Home() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLParagraphElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [logo, setLogo] = useState("");
  const [lineIndex, setLineIndex] = useState(-1);
  const [msg, setMsg] = useState("");
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState("");
  const [writing, setWriting] = useState("");
  const [textareaHeight, setTextareaHeight] = useState(10);
  const [selectedId, setselectedId] = useState<string>("");
  

  const [postList, setPostList] = useState<PostList[]>([]);

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
    let _id:string|null = sessionStorage.getItem('scrapper-login');
    if(_id)
      setId(_id);
    let i:number = 0;
    let ch:string = "SSCRAPPER";

    const typeLogo = setInterval(() => {
      if (i < ch.length-1) {
        setLogo((prev) => prev + ch[i]);
        i++;
      } else {
        clearInterval(typeLogo);
      }
    }, 120);

    if(!_id) {
      if(loginRef.current !== undefined)
        loginRef.current && loginRef.current.classList.add('login-show-up');
    }
    else {
      const fetchData = async ():Promise<void> => {
        const res:any = await getContentFromDb();
        setPostList(res);
      }
      fetchData();
      setTimeout(() => {
        if(inputContainerRef.current !== undefined && inputRef.current !== undefined && menuRef !== undefined) {
          inputContainerRef.current && inputContainerRef.current.classList.add('textarea-show-up');
          inputRef.current && inputRef.current.classList.add('textarea-show-up');
          menuRef.current && menuRef.current.classList.add('textarea-show-up');
          inputRef.current && inputRef.current.focus();
        }
      }, 1000);
    }
  // eslint-disable-next-line
    return () => {
      clearInterval(typeLogo);    // 렌더링될때마다 setInterval 활성화되는 것 방지
    };
    // eslint-disable-next-line
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
      setTextareaHeight((lineCount) * 3 + 10);
    }
  }, [writing])

  const handleLogin = async (e:React.KeyboardEvent<HTMLInputElement>) => {
      if(!id || !pw)
        setMsg("모두 입력해주세요");
      else {
        getContentFromDb();
        getDoc(doc(db, 'accounts', id))
        .then((res: any) => {
            let dbPw = res.data().password;
            let isNewbie = res.data().isNewbie;
          
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

              const fetchData = async ():Promise<void> => {
                const res:PostList[] = await getContentFromDb();
                setPostList(res);
              }
              fetchData();

              console.log("===== app/page.tsx : PostList =====\n", postList);
            }
            else 
              setMsg("비밀번호 미일치");
      }
        });
      }
  };

  useEffect(() => {
    console.log("final : ", postList);
  }, [postList]);

  const handleLogoOver = () => {
    logoRef.current && logoRef.current.classList.add('font-black');
  }

  const handleLogoOut = () => {
    logoRef.current && logoRef.current.classList.remove('font-black');
  }

  const handleLogoClick = () => {
    uploadMsg(writing);
    setWriting("");
  }

  const handleDelete = () => {
    deleteDoc(doc(db, 'posts', selectedId))
    .then((res:any) => {
      alert("삭제되었습니다.");
    })
    const fetchData = async ():Promise<void> => {
      const res:any = await getContentFromDb();
      setPostList(res);
    }
    fetchData();
  }

  return (
    <div className="h-auto min-h-screen w-screen bg-white flex flex-col items-center">

      {/* logo */}
      <div className="h-1/6 w-1/2 flex justify-center items-center fixed transform translate-y-80 top-0 z-40 logo-move-up"> 
        <p 
          onMouseOver={handleLogoOver}
          onMouseOut={handleLogoOut}
          onClick={handleLogoClick}
          ref={logoRef} 
          className="tracking-[-5px] text-gray-500 sm:text-8xl text-6xl border-r-4 border-black pr-[15px] cursor-pointer" 
          style={{fontFamily:'lemon-r'}}>
            {logo}
        </p>
      </div>

      {/* login */}
      <div ref={loginRef} className="w-screen h-screen absolute flex flex-col justify-center items-center transform -translate-y-32 opacity-0">
        <input placeholder="ID" value={id} onChange={e => setId(e.target.value)} onKeyDown={e => {if(e.key === 'Enter') handleLogin(e)}} type='text' className="sm:w-1/5 w-3/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black sm:mt-24 mt-32" />
        <input placeholder="PW" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => {if(e.key === 'Enter') handleLogin(e)}} type='password' className="sm:w-1/5 w-3/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black mt-12" />
        <button onClick={(e) => {handleLogin(e)}} className="sm:w-1/5 w-3/5 rounded-md bg-black text-white text-3xl mt-10">LOGIN</button>
        <p className="text-xl mt-12">{msg}</p>
        <a className="text-xl mt-12" href='/signup' >or  SIGN UP</a>
      </div>

      {/* menu */}
      <div className="fixed opacity-0 flex sm:justify-start sm:items-start justify-center items-center " style={{zIndex:9998}} ref={menuRef}>
        <MenuBar />
      </div>

      <div ref={inputContainerRef} className="w-screen flex flex-col justify-center items-center absolute opacity-0 overflow-hidden">
        <div className="h-[100vh] w-screen sm:h-[40vh]" />

          {/* text input */}
          <textarea
            value={writing}
            onChange={(e) => setWriting(e.target.value)}
            ref={inputRef} 
            style={{height:`${textareaHeight}vh`}}
            className="lg:w-5/6 text-black text-2xl text-center font-thin focus:outline-none overflow-hidden resize-none" 
          />

          {/* show my posts */}
          <div className="w-5/6 h-auto flex flex-col items-center">
          { postList !== undefined && postList.map((item: PostList, index: number) => {
              const unescapedMsg = item.msg.replace(/\\n/g, "\n");
              
              // visualizing likes on text
              let likesCount:number[] = [];
              let likes:string[] = item.likes.split(" ");
              for(let i=0; i<unescapedMsg.length; i++)  // 초기화
                likesCount[i] = 0;
              for(let i=0; i<likes.length; i++) { // 드래그된 부분의 숫자 증가
                likesCount[Number(likes[i])] = likesCount[Number(likes[i])] + 1;
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
                          <span key={index} onMouseUp={() => {handleTextSelection(postList, selectedId)}} className="text-black" style={{ backgroundColor: changeColor, userSelect: 'text' }}>{char}</span>
                        )
                      })
                    }
                    </p>

                    {/* post options */}
                    <div key={index} className={index === lineIndex ? "opacity-1" : "opacity-0"}>
                      <StarIcon sx={{color:'#333', cursor:'pointer'}} onClick={() => {handleScrap(id, selectedId)}} />
                      <DeleteIcon sx={{color:'#333', cursor:'pointer'}} onClick={handleDelete} />
                    </div>

                  </div>
                );  
            })}
            <div className="h-[10vh] w-screen" />
          </div>
        </div>
    </div>
  )
}