"use client";

// 서버에 reverse된 순서로 저장했다가, 0~30 인덱스만 받아오기 -> 자동으로 갱신되는 것

import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation'
import { initializeApp } from "firebase/app";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { 
  getFirestore, 
  collection,
  // addDoc,   // 임의의 Id 지정
  // setDoc,   // Id 지정 가능
  updateDoc,   // update document
  arrayUnion,   // push elem to array
  getDocs,  // 전체 읽어오기
  getDoc,   // 문서 하나 읽어오기
  deleteDoc, // 삭제
  doc,       // 특정 데이터 읽기
  query,
 } from "firebase/firestore";

import '../styles/main.css';

export default function Posts() {
    const [msgData, setMsgData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [lineIndex, setLineIndex] = useState(-1);
    const router = useRouter();
    const [menuHomeOver, setMenuHomeOver] = useState(false);
    const [menuMyOver, setMenuMyOver] = useState(false);

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
        getDocs(collection(db, 'main'))
        .then(res => {
            res.forEach(doc => {
                let tempMsg = [];
                let tempUser = [];
                doc.data().contents.forEach(data => {
                    let splitted = data.split("+");
                    tempMsg.push(splitted[0]);
                    tempUser.push(splitted[1]);
                })
                setMsgData([...tempMsg].reverse());
                setUserData([...tempUser].reverse());
            })
        })
    }, [])
    

    return (
        <div className="h-auto min-h-screen w-screen bg-white flex flex-col justify-center items-center">
            <div className="h-1/6 w-1/2 flex justify-center items-center fixed top-0 z-40">
                <p 
                    className="tracking-[-5px] text-black text-8xl border-r-4 border-black pr-[15px] "
                    style={{fontFamily:'lemon-r'}}>
                    SCRAPPER
                </p>
            </div>

            <div className="right-0 mr-12 mt-12 opacity-1 fixed top-0 cursor-pointer flex flex-col" style={{zIndex:9999}} >
                <HomeIcon onClick={()=>router.push('/posts')} onMouseOver={()=>setMenuHomeOver(true)} onMouseLeave={()=>setMenuHomeOver(false)} className={menuHomeOver ? "scale-up" : "scale-down"} sx={{fontSize:50, color:'black'}} />
                <PersonIcon onClick={()=>router.push('/')} onMouseOver={()=>setMenuMyOver(true)} onMouseLeave={()=>setMenuMyOver(false)} className={menuMyOver ? "scale-up" : "scale-down"} sx={{fontSize:50, color:'black', marginTop:'3vh'}} />
            </div>

            <div className="w-5/6 h-screen">
                <div className="h-1/5" />
                <div className="h-auto flex flex-col justify-center items-center">
                    { msgData.map((res, index) => {
                        const unescapedMsg = res.replace(/\\n/g, "\n")

                        return (
                            <p 
                                key={index} 
                                style={{ whiteSpace: 'pre-line' }}
                                className={index === lineIndex ? 'mt-12 text-[20px] line-highlight font-thin text-center' : 'mt-12 text-[20px] line-un-highlight font-thin text-center'}
                                onMouseOver={() => {setLineIndex(index)}} 
                                onMouseLeave={() => setLineIndex(-1)}
                                onClick={() => {router.push(`/board/${userData[index]}`)}}
                                >{unescapedMsg}</p>
                        )
                    })
                    }

                </div>
            </div>
        </div>
    )
}