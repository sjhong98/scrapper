(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[966],{8511:function(e,t,a){Promise.resolve().then(a.bind(a,5455))},5455:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return Signup}});var s=a(7437),n=a(2265),r=a(4033),l=a(994),c=a(4086);function Signup(){let[e,t]=(0,n.useState)(""),[a,o]=(0,n.useState)(""),[p,d]=(0,n.useState)(""),[u,i]=(0,n.useState)(""),b=(0,r.useRouter)(),h=(0,l.ZF)({apiKey:"AIzaSyB0wNhng69y2_dkHsPjN1k579LeYrSQWdU",authDomain:"scrapper-9558b.firebaseapp.com",databaseURL:"https://scrapper-9558b-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"scrapper-9558b",storageBucket:"scrapper-9558b.appspot.com",messagingSenderId:"241265284136",appId:"1:241265284136:web:253ec9f008e31a3d03911d"}),f=(0,c.ad)(h),handleSignup=t=>{if(t.preventDefault(),"Enter"===t.key){if(console.log("엔터 입력"),e&&a&&p){if(a!==p)i("비밀번호가 일치하지 않습니다");else{let t=(0,c.JU)(f,"accounts",e);(0,c.QT)(t).then(t=>{if(console.log(t.data()),void 0===t.data()){let t=(0,c.JU)(f,"accounts",e);(0,c.pl)(t,{password:a,scrap:[]}).then(()=>b.push("/")),sessionStorage.setItem("scrapper-login",e),i("")}else i("중복된 아이디")})}}else i("모두 입력해주세요")}};return(0,s.jsxs)("div",{className:"w-screen h-screen bg-white flex flex-col",children:[(0,s.jsx)("div",{className:"h-1/6 w-screen flex justify-center items-center fixed",children:(0,s.jsx)("p",{className:"text-black font-bold text-8xl border-r-4 border-black pr-2",style:{fontFamily:"lemon-r"},children:"SCRAPPER"})}),(0,s.jsx)("div",{className:"w-screen h-1/6"}),(0,s.jsxs)("div",{className:"w-screen h-5/6 flex flex-col justify-center items-center mb-32",children:[(0,s.jsx)("input",{value:e,onChange:e=>t(e.target.value),onKeyDown:e=>{"Enter"===e.key&&handleSignup(e)},placeholder:"EMAIL",type:"text",className:"w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black"}),(0,s.jsx)("input",{value:a,onChange:e=>o(e.target.value),onKeyDown:e=>{"Enter"===e.key&&handleSignup(e)},placeholder:"PASSWORD",type:"password",className:"w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black mt-12"}),(0,s.jsx)("input",{value:p,onChange:e=>d(e.target.value),onKeyDown:e=>{"Enter"===e.key&&handleSignup(e)},placeholder:"PW CHECK",type:"password",className:"w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black mt-12"}),(0,s.jsx)("p",{className:"text-xl mt-12",children:u})]})]})}}},function(e){e.O(0,[358,650,971,864,744],function(){return e(e.s=8511)}),_N_E=e.O()}]);