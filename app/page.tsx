"use client";

import { useEffect, useRef, useState } from "react"
import './styles/main.css';

export default function Home() {
  const inputRef = useRef();
  const inputContainerRef = useRef();
  const loginRef = useRef();
  const [logo, setLogo] = useState("");

  useEffect(() => {
    let i = 0;
    let ch = "SCCRAPPER";

    const typeLogo = setInterval(() => {
      if (i < ch.length-1) {
        setLogo((prev) => prev + ch[i]);
        i++;
      } else {
        clearInterval(typeLogo);
      }
    }, 120);

    return () => {
      clearInterval(typeLogo);    // 렌더링될때마다 setInterval 활성화되는 것 방지
    };
  }, []);

  const handleLogin = (e) => {
    if(e.key === 'Enter') {   // 엔터가 눌렸을 때에만 반응
      loginRef.current.classList.add('login-done');
      inputContainerRef.current.classList.add('textarea-show-up');
      setTimeout(() => {
        inputRef.current.classList.add('textarea-show-up');
        inputRef.current.focus();
      }, 100);
      
      
    }
  };

  return (
    <div className="h-auto min-h-screen w-screen bg-white flex-col justify-center items-center">
      <div className="h-1/6 w-screen flex justify-center items-center fixed transform translate-y-80 z-50 logo-move-up">
        <p className="text-black font-bold text-8xl border-r-4 border-black pr-2" style={{fontFamily:'lemon-r'}}>
            {logo}
        </p>
      </div>

      <div ref={loginRef} className="w-screen h-screen absolute flex flex-col justify-center items-center transform -translate-y-32 login-show-up opacity-0" onKeyDown={handleLogin}>
        <input placeholder="EMAIL" type='text' className="w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black" style={{fontFamily:'lemon-r'}} />
        <input placeholder="PW" type='password' className="w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black mt-12" style={{fontFamily:'lemon-r'}} />
      </div>


      <div ref={inputContainerRef} className="h-5/6 w-screen flex justify-center absolute transform translate-y-16 opacity-0">
        <div ref={inputRef} contentEditable='true' className="w-2/3 text-black text-3xl text-center mt-80 focus:outline-none leading-[60px]" />
      </div>
      
    </div>
  )
}