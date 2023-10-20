"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, getDoc, doc, addDoc, collection } from "firebase/firestore";

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
                    addDoc(collection(db, 'posts'), {
                        msg: "🎉Scrapper에 오신 것을 환영합니다🎉\n\nScrapper는 텍스트 기반 SNS 서비스입니다.\n\n위쪽 입력창에 나의 생각을 입력한 뒤, 상단의 로고를 클릭하여 남들과 공유할 수 있습니다.\n우측 메뉴의 최상단을 통해 Posts로 이동하여 다른 사람들의 글을 확인할 수도 있습니다.\n\n또한 마음에 드는 글이 있다면 원하는 구간을 드래그하여,\n👍좋아요를 표시할 수 있습니다.\n\n글 전체를 저장하고 싶다면, ⭐️을 통해 스크랩하고 확인할 수 있습니다.\n\n이제 여러분의 글을 공유해보세요!\n\n\nFeedBack : sjhong98@icloud.com",
                        likes: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 37 38 39 40 41 42 43 44 45 46 47 48 49 50 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 163 164 165 166 167 168 169 170 171 172 173 174 175 176 177 178 179 180 181 182 183 184 185 186 187 188 189 190 177 178 179 180 181 182 183 184 185 186 187 194 195 196 197 198 199 200 228 229 230 231 232 233 234 235 236 237 238 239 240 241 242 286 287 288 289 290 291 292 293 294 295 296 297 298 299 300 301 302 303 304 286 287 288 289 290 291 292 293 294 295 296 297 298 299 300 301 302 303 304 286 287 288 289 290 291 292 293 294 295 296 297 298 299 300 301 302 303 304 ",
                        user: id,
                        time: 0,
                        isIntro: true,
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
    
    return (
        <div className="w-screen h-screen bg-white flex flex-col">
            <div className="h-1/6 w-screen flex justify-center items-center fixed">
                <p className="text-black font-bold sm:text-8xl text-6xl border-r-4 border-black pr-2 sm:text-8xl text-6xl" style={{fontFamily:'lemon-r'}}>
                    SCRAPPER
                </p>
            </div>
            <div className="w-screen h-1/6" />
            <div className="w-screen h-5/6 flex flex-col justify-center items-center mb-32">
                <input value={id} onChange={(e) => setId(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter') handleSignup(e)}} placeholder="ID" type='text' className="sm:w-1/5 w-3/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black" />
                <input value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter') handleSignup(e)}} placeholder="PASSWORD" type='password' className="sm:w-1/5 w-3/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black mt-12" />
                <input value={pwCheck} onChange={(e) => setPwCheck(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter') handleSignup(e)}} placeholder="PW CHECK" type='password' className="sm:w-1/5 w-3/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black mt-12" />
                <button onClick={(e) => {handleSignup(e)}} className="sm:w-1/5 w-3/5 rounded-md bg-black text-white text-3xl mt-10">SIGN UP</button>
                <p className="text-xl mt-12">{msg}</p>
            </div>
        </div>
    )
}