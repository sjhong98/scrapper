"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc,   // 임의의 Id 지정
  setDoc,   // Id 지정 가능
  updateDoc,   // 수정
  getDocs,  // 전체 읽어오기
  getDoc,   // 문서 하나 읽어오기
  deleteDoc, // 삭제
  doc       // 특정 데이터 읽기
 } from "firebase/firestore";


export default function Signup() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwCheck, setPwCheck] = useState("");
    const [msg, setMsg] = useState("");
    const router = useRouter();

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

    const handleSignup = (e:any) => {
        e.preventDefault();
        if(e.key === 'Enter') {
            console.log("엔터 입력");
            if(!id || !pw || !pwCheck) 
                setMsg("모두 입력해주세요")
            else if(pw !== pwCheck) 
                setMsg("비밀번호가 일치하지 않습니다");
            else {
                let query = doc(db, 'accounts', id);
                getDoc(query).then((res:any) => {
                    console.log(res.data())
                    if(res.data() === undefined) {
                        const newDocRef = doc(db, 'accounts', id); 
                        setDoc(newDocRef, {
                            password: pw,
                            scrap: []
                        })
                        .then(() => router.push('/'));
                        sessionStorage.setItem('scrapper-login', id);
                        setMsg("");
                    }
                    else 
                        setMsg("중복된 아이디");
                });
            }
        }
    }
    
    return (
        <div className="w-screen h-screen bg-white flex flex-col">
            <div className="h-1/6 w-screen flex justify-center items-center fixed">
                <p className="text-black font-bold text-8xl border-r-4 border-black pr-2" style={{fontFamily:'lemon-r'}}>
                    SCRAPPER
                </p>
            </div>
            <div className="w-screen h-1/6" />
            <div className="w-screen h-5/6 flex flex-col justify-center items-center mb-32">
                <input value={id} onChange={(e) => setId(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter') handleSignup(e)}} placeholder="ID" type='text' className="w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black" />
                <input value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter') handleSignup(e)}} placeholder="PASSWORD" type='password' className="w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black mt-12" />
                <input value={pwCheck} onChange={(e) => setPwCheck(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter') handleSignup(e)}} placeholder="PW CHECK" type='password' className="w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black mt-12" />
                <p className="text-xl mt-12">{msg}</p>
            </div>
        </div>
    )
}