(()=>{var e={};e.id=966,e.ids=[966],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},6113:e=>{"use strict";e.exports=require("crypto")},9523:e=>{"use strict";e.exports=require("dns")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},85158:e=>{"use strict";e.exports=require("http2")},41808:e=>{"use strict";e.exports=require("net")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},12781:e=>{"use strict";e.exports=require("stream")},24404:e=>{"use strict";e.exports=require("tls")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},94647:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>x,originalPathname:()=>d,pages:()=>u,routeModule:()=>g,tree:()=>c});var s=r(73137),a=r(54647),n=r(4183),i=r.n(n),o=r(71775),p={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(p[e]=()=>o[e]);r.d(t,p);let l=s.AppPageRouteModule,c=["",{children:["signup",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,57943)),"/Users/hongseungjae/Desktop/learning.js/scrapper/app/signup/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,79958)),"/Users/hongseungjae/Desktop/learning.js/scrapper/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,51918,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],u=["/Users/hongseungjae/Desktop/learning.js/scrapper/app/signup/page.tsx"],d="/signup/page",x={require:r,loadChunk:()=>Promise.resolve()},g=new l({definition:{kind:a.x.APP_PAGE,page:"/signup/page",pathname:"/signup",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},98040:(e,t,r)=>{Promise.resolve().then(r.bind(r,21458))},21458:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>Signup});var s=r(60080),a=r(9885),n=r(57114),i=r(72856),o=r(61522);function Signup(){let[e,t]=(0,a.useState)(""),[r,p]=(0,a.useState)(""),[l,c]=(0,a.useState)(""),[u,d]=(0,a.useState)(""),x=(0,n.useRouter)(),g=(0,i.ZF)({apiKey:"AIzaSyB0wNhng69y2_dkHsPjN1k579LeYrSQWdU",authDomain:"scrapper-9558b.firebaseapp.com",databaseURL:"https://scrapper-9558b-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"scrapper-9558b",storageBucket:"scrapper-9558b.appspot.com",messagingSenderId:"241265284136",appId:"1:241265284136:web:253ec9f008e31a3d03911d"}),h=(0,o.ad)(g),handleSignup=t=>{if(t.preventDefault(),"Enter"===t.key){if(console.log("엔터 입력"),e&&r&&l){if(r!==l)d("비밀번호가 일치하지 않습니다");else{let t=(0,o.JU)(h,"accounts",e);(0,o.QT)(t).then(t=>{if(console.log(t.data()),void 0===t.data()){let t=(0,o.JU)(h,"accounts",e);(0,o.pl)(t,{password:r,scrap:[]}).then(()=>x.push("/")),sessionStorage.setItem("scrapper-login",e),d("")}else d("중복된 아이디")})}}else d("모두 입력해주세요")}};return(0,s.jsxs)("div",{className:"w-screen h-screen bg-white flex flex-col",children:[s.jsx("div",{className:"h-1/6 w-screen flex justify-center items-center fixed",children:s.jsx("p",{className:"text-black font-bold text-8xl border-r-4 border-black pr-2",style:{fontFamily:"lemon-r"},children:"SCRAPPER"})}),s.jsx("div",{className:"w-screen h-1/6"}),(0,s.jsxs)("div",{className:"w-screen h-5/6 flex flex-col justify-center items-center mb-32",children:[s.jsx("input",{value:e,onChange:e=>t(e.target.value),onKeyDown:e=>{"Enter"===e.key&&handleSignup(e)},placeholder:"EMAIL",type:"text",className:"w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black"}),s.jsx("input",{value:r,onChange:e=>p(e.target.value),onKeyDown:e=>{"Enter"===e.key&&handleSignup(e)},placeholder:"PASSWORD",type:"password",className:"w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black mt-12"}),s.jsx("input",{value:l,onChange:e=>c(e.target.value),onKeyDown:e=>{"Enter"===e.key&&handleSignup(e)},placeholder:"PW CHECK",type:"password",className:"w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black mt-12"}),s.jsx("p",{className:"text-xl mt-12",children:u})]})]})}},57943:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>i,__esModule:()=>n,default:()=>p});var s=r(17536);let a=(0,s.createProxy)(String.raw`/Users/hongseungjae/Desktop/learning.js/scrapper/app/signup/page.tsx`),{__esModule:n,$$typeof:i}=a,o=a.default,p=o},57481:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var s=r(96885);let __WEBPACK_DEFAULT_EXPORT__=e=>{let t=(0,s.fillMetadataSegment)(".",e.params,"favicon.ico");return[{type:"image/x-icon",sizes:"16x16",url:t+""}]}}};var t=require("../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),r=t.X(0,[255,37,484],()=>__webpack_exec__(94647));module.exports=r})();