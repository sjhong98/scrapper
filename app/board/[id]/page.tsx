"use client";

// 서버에 reverse된 순서로 저장했다가, 0~30 인덱스만 받아오기 -> 자동으로 갱신되는 것

import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation'
import MenuBar from "../../modules/menuBar";
import StarIcon from '@mui/icons-material/Star';
import { handleScrap, PostList, handleTextSelection, getContentFromDb } from "@/app/functions";

import '../../styles/main.css';

interface BoardParams{
  params: {
    id:string,
  }
}

export default function Board(params: BoardParams) {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const inputContainerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [logo, setLogo] = useState("");
  const [lineIndex, setLineIndex] = useState(-1);
  const [postList, setPostList] = useState<PostList[]>([]);
  const myId:string = sessionStorage.getItem('scrapper-login') ?? "null";     // nullish 병합 연산자 -> sessionStorage에 해당 값이 없을 경우 null 리턴 -> "null"이라는 문자열로 대체
  const [selectedId, setselectedId] = useState<string>("");

  useEffect(() => {
    let i = 0;
    let ch = params.params.id[0] + params.params.id;

    if(sessionStorage.getItem('scrapper-login')===null) {
      router.push('/');
    }

    const typeLogo = setInterval(() => {
      if (i < ch.length-1) {
        setLogo((prev) => prev + ch[i]);
        i++;
      } else {
        clearInterval(typeLogo);
      }
    }, 120);

    inputContainerRef.current && inputContainerRef.current.classList.add('textarea-show-up');
    menuRef.current && menuRef.current.classList.add('textarea-show-up');

    const fetchData = async ():Promise<void> => {
        const res:any = await getContentFromDb();
        setPostList(res);
      }
      fetchData();

    return () => {
      clearInterval(typeLogo);    // 렌더링될때마다 setInterval 활성화되는 것 방지
    };
    // eslint-disable-next-line
  }, [])

  return (
    <div className="h-auto min-h-screen w-screen bg-white flex flex-col justify-center items-center">
      <div className="h-1/6 w-1/2 flex justify-center items-center fixed top-0 z-40">
        <p className="tracking-[-5px] text-black sm:text-8xl text-6xl border-r-4 border-black pr-[15px] cursor-pointer" 
          style={{fontFamily:'lemon-r'}}>
            {logo}
        </p>
      </div>

      <div className="fixed opacity-0" style={{zIndex:9999}} ref={menuRef}>
        <MenuBar />
      </div>

      <div ref={inputContainerRef} className="w-screen flex flex-col mt-60 justify-center items-center absolute transform translate-y-16 opacity-0 overflow-hidden">
        <div className="w-5/6 mt-32 h-screen flex flex-col items-center">
        { postList.map((item: PostList, index: number) => {
            const unescapedMsg = item.msg.replace(/\\n/g, "\n");
            
            // 좋아요 정보 시각화 로직
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
                  <div key={index} className={index === lineIndex ? "opacity-1" : "opacity-0"}>
                    <StarIcon sx={{color:'#333', cursor:'pointer'}} onClick={() => handleScrap(myId, selectedId)} />
                  </div>
                </div>
              );
          })}
        </div>
      </div>
      
    </div>
  )
}