"use client";

// 서버에 reverse된 순서로 저장했다가, 0~30 인덱스만 받아오기 -> 자동으로 갱신되는 것

import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation'
import { initializeApp } from "firebase/app";
import MenuBar from "../modules/menuBar";
import StarIcon from '@mui/icons-material/Star';
import { 
  getFirestore, 
  collection,
  orderBy,
  updateDoc,   // update document
  getDocs,  // 전체 읽어오기
  getDoc,   // 문서 하나 읽어오기
  doc,       // 특정 데이터 읽기
  query,
 } from "firebase/firestore";

import '../styles/main.css';

export default function Posts() {
    const router = useRouter();
    const [postList, setPostList] = useState([]);
    const [lineIndex, setLineIndex] = useState(-1);
    const [selectedId, setSelectedId] = useState<string>("");

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
      if(sessionStorage.getItem('scrapper-login')===null) {
        router.push('/');
      }
      else
        getContentFromDb();
        // eslint-disable-next-line
    }, []);

    const getContentFromDb = async () => {   
        let q = query(collection(db, 'posts'), orderBy('time', 'desc'))
        await getDocs(q)
        .then((res:any) => {
          let temp:any = [];
          res.forEach((doc:any) => {
            let docTemp = doc.data();
            docTemp.postId = doc.id;
            temp.push(docTemp);
            console.log(docTemp.time);
          });    
          let notIntro:any = temp.filter((item:any) => item.time !== 0);
          setPostList(notIntro);
          console.log(notIntro);
        })
      }

    const uploadLikes= (postId:string, newLikes:string) => {
        const documentRef = doc(db, 'posts', postId);
        updateDoc(documentRef, {
            likes: newLikes
        });
        getContentFromDb();
    }
    
    const handleTextSelection = () => {
        let startIndex;
        let endIndex;
        console.log(postList);
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
        const matches = testLineBreaks.match(/\\n/g);
        if (matches !== null) {
          linebreaks = matches.length;
        }
    
        if(linebreaks > 0) {
          startIndex -= linebreaks;
          if(endIndex !== undefined)
            endIndex -= linebreaks;
        } 
    
        let length
        if(endIndex !== undefined)
          length = endIndex - startIndex;
        let count = startIndex;
    
        if(length !== undefined)
          for(let i=0; i<length+1; i++) {
            findObj.likes = findObj.likes + count.toString() + " ";
            count++;
          }
    
        uploadLikes(selectedId, findObj.likes);
      };
  
    const handleScrap = () => {   // 나중에 아이콘 채워지도록 만들기
      let id:any = sessionStorage.getItem('scrapper-login');
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
                { postList.map((item:any, index:any) => {
                    const unescapedMsg = item.msg.replace(/\\n/g, "\n");
                    
                    // 좋아요 정보 시각화 로직
                    let likesCount:any = [];
                    let likes = item.likes.split(" ");
                    for(let i=0; i<unescapedMsg.length; i++)  // 초기화
                    likesCount[i] = 0;
                    for(let i=0; i<likes.length; i++)  // 드래그된 부분의 숫자 증가
                        likesCount[likes[i]] = likesCount[likes[i]] + 1;

                    return (
                      <div key={index}>
                        <p key={index} className="text-black text-center mt-12">{item.user}</p>
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
                            <span key={index} onMouseUp={handleTextSelection} className="text-black" style={{ backgroundColor: changeColor, userSelect: 'text' }}>{char}</span>
                            )
                        })
                        }
                        </p>
                        <div key={index} className={index === lineIndex ? "opacity-1" : "opacity-0"}>
                          <StarIcon sx={{color:'#333', cursor:'pointer'}} onClick={handleScrap} />
                        </div>
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