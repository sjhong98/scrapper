"use client";

// 서버에 reverse된 순서로 저장했다가, 0~30 인덱스만 받아오기 -> 자동으로 갱신되는 것

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import MenuBar from "../modules/menuBar";
import StarIcon from '@mui/icons-material/Star';
import { PostList, getContentFromDb, handleTextSelection, handleUnscrap } from "../functions";

import '../styles/main.css';

export default function Scrap() {
    const router = useRouter();
    const [postList, setPostList] = useState([]);
    const [lineIndex, setLineIndex] = useState(-1);
    const [selectedId, setSelectedId] = useState("");
    
    useEffect(() => {
      if(sessionStorage.getItem('scrapper-login')===null) {
        router.push('/');
      }
        const fetchData = async ():Promise<void> => {
          const res:any = await getContentFromDb();
          setPostList(res);
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="h-auto min-h-screen w-screen bg-white flex flex-col justify-center items-center">
            <div className="h-1/6 w-1/2 flex justify-center items-center fixed top-0 z-40">
                <p className="tracking-[-5px] text-black sm:text-8xl text-6xl border-r-4 border-black pr-[15px] "
                    style={{fontFamily:'lemon-r'}}>
                    SCRAPPER
                </p>
            </div>

            <div className="fixed" style={{zIndex:9999}}>
              <MenuBar />
            </div>

            <div className="w-5/6 h-screen">
                <div className="h-1/5" />
                <div className="h-auto flex flex-col justify-center items-center">
                { postList.map((item:PostList, index:number) => {
                    const unescapedMsg = item.msg.replace(/\\n/g, "\n");
                    
                    // 좋아요 정보 시각화 로직
                    let likesCount:number[] = [];
                    let likes:string[] = item.likes.split(" ");
                    for(let i=0; i<unescapedMsg.length; i++)  // 초기화
                    likesCount[i] = 0;
                    for(let i=0; i<likes.length; i++)  // 드래그된 부분의 숫자 증가
                        likesCount[Number(likes[i])] = likesCount[Number(likes[i])] + 1;

                    return (
                      <div key={index}>
                      <p key={index} className="text-black text-center mt-12 ">{item.user}</p>
                        <div key={index} className="flex flex-row justify-center items-center ml-6" onMouseOver={() => {setLineIndex(index); setSelectedId(item.postId)}} onMouseLeave={() => setLineIndex(-1)}>
                          
                          <p 
                          key={index} 
                          onClick={() => router.push(`/board/${item.user}`)}
                          style={{ whiteSpace: 'pre-wrap' }}
                          className={index === lineIndex ? "leading-[38px] text-black font-extralight p-3 mt-2 text-[20px] text-center rounded-md line-highlight" : "leading-[38px] text-black font-extralight text-[20px] p-3 mt-2 text-center rounded-md line-un-highlight"}
                          >
                          { unescapedMsg.split("").map((char:string, index:number) => {
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
                            <StarIcon sx={{color:'#333', cursor:'pointer'}} onClick={() => {handleUnscrap(selectedId)}} />
                          </div>
                        </div>
                        </div>
                    );
                })}

                </div>
            </div>
        </div>

    )
}