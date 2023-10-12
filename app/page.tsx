"use client";

import { useEffect, useRef, useState } from "react"
import './styles/main.css';

export default function Home() {
  const inputRef = useRef();
  const inputContainerRef = useRef();
  const loginRef = useRef();
  const [logo, setLogo] = useState("");
  const [content, setContent] = useState([]);
  const [contentRev, setContentRev] = useState([]);
  const [isKorean, setIsKorean] = useState(false);
  const [koreanFlag, setKoreanFlag] = useState(0);

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
      inputContainerRef.current.classList.add('textarea-show-up');
      setTimeout(() => {
        inputRef.current.classList.add('textarea-show-up');
        inputRef.current.focus();
      }, 200);
    }

    return () => {
      clearInterval(typeLogo);    // 렌더링될때마다 setInterval 활성화되는 것 방지
    };
  }, []);

  const handleLogin = (e) => {
    if(e.key === 'Enter') {   // 엔터가 눌렸을 때에만 반응
      loginRef.current.classList.add('login-done');
      inputContainerRef.current.classList.add('textarea-show-up');
      sessionStorage.setItem('scrapper-login', true);
      setTimeout(() => {
        inputRef.current.classList.add('textarea-show-up');
        inputRef.current.focus();
      }, 100);
    }
  };

  function isKoreanMixedWithNonKorean(text) {
    // 정규 표현식 패턴을 사용하여 한글과 한글이 아닌 문자가 섞인 문자열을 판별
    const pattern = /[가-힣]+|[^\w\s]+/g;
  
    // 패턴과 일치하는 부분을 모두 찾음
    const matches = text.match(pattern);
  
    // 일치하는 부분이 있고, 그 부분이 한글과 한글이 아닌 문자로 번갈아 나오는 경우에 true를 반환
    if (matches && matches.length > 0) {
      for (let i = 0; i < matches.length; i++) {
        // 짝수 인덱스에서는 한글, 홀수 인덱스에서는 한글이 아닌 문자가 나와야 함
        if (i % 2 === 0 && !/[가-힣]+/.test(matches[i])) {
          return false;
        } else if (i % 2 === 1 && !/[^\w\s]+/.test(matches[i])) {
          return false;
        }
      }
      return true;
    }
  
    return false;
  }

  const handleLineDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      let value = inputRef.current.innerText;
      let temp = [...content];
      temp.push(value);
      console.log(temp);

      if (/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(value)) {
        if(/^[\s]*[가-힣\s]*[\s]*$/.test(value)) {    // 순수 한글만 포함된 문자열
          console.log("순수 한글");
          if(isKorean) {
            temp.pop();
            setIsKorean(false);
          }
          else{
            setIsKorean(true);
            setKoreanFlag(prev => prev+1);
          }
        }
      }

      setContent(temp);
      inputRef.current.innerText = ''; 
    }
  }

  useEffect(() => {
    if(koreanFlag === 1) {
      setIsKorean(false);
    }
  }, [koreanFlag]);

  useEffect(() => {
    let temp = [...content].reverse();
    setContentRev(temp);
  }, [content]);

  return (
    <div className="h-auto min-h-screen w-screen bg-white flex-col justify-center items-center">
      <div className="h-1/6 w-screen flex justify-center items-center fixed transform translate-y-80 z-50 logo-move-up">
        <p className="text-black font-bold text-8xl border-r-4 border-black pr-2" style={{fontFamily:'lemon-r'}}>
            {logo}
        </p>
      </div>

      <div ref={loginRef} className="w-screen h-screen absolute flex flex-col justify-center items-center transform -translate-y-32 opacity-0" onKeyDown={handleLogin}>
        <input placeholder="EMAIL" type='text' className="w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black" style={{fontFamily:'lemon-r'}} />
        <input placeholder="PW" type='password' className="w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black mt-12" style={{fontFamily:'lemon-r'}} />
      </div>


      <div ref={inputContainerRef} className="w-screen flex flex-col justify-center items-center absolute transform translate-y-16 opacity-0 overflow-hidden">
        <div 
          onKeyDown={handleLineDown} 
          ref={inputRef} 
          contentEditable='true' 
          className="w-2/3 text-black text-3xl text-center mt-80 focus:outline-none leading-[60px] overflow-hidden" 
        />
        <div className="w-2/3 h-screen flex flex-col items-center">
        { contentRev.map((item, index) => (
            <p key={index} className="text-black text-3xl mt-12">{item}</p>
        ))}
        </div>
      </div>
      
    </div>
  )
}