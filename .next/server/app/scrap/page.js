(()=>{var e={};e.id=875,e.ids=[875],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},6113:e=>{"use strict";e.exports=require("crypto")},9523:e=>{"use strict";e.exports=require("dns")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},85158:e=>{"use strict";e.exports=require("http2")},41808:e=>{"use strict";e.exports=require("net")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},12781:e=>{"use strict";e.exports=require("stream")},24404:e=>{"use strict";e.exports=require("tls")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},78810:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>o.a,__next_app__:()=>x,originalPathname:()=>d,pages:()=>u,routeModule:()=>g,tree:()=>c});var r=s(73137),a=s(54647),n=s(4183),o=s.n(n),i=s(71775),l={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);s.d(t,l);let p=r.AppPageRouteModule,c=["",{children:["scrap",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,36912)),"/Users/hongseungjae/Desktop/learning.js/scrapper/app/scrap/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,79958)),"/Users/hongseungjae/Desktop/learning.js/scrapper/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,51918,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],u=["/Users/hongseungjae/Desktop/learning.js/scrapper/app/scrap/page.tsx"],d="/scrap/page",x={require:s,loadChunk:()=>Promise.resolve()},g=new p({definition:{kind:a.x.APP_PAGE,page:"/scrap/page",pathname:"/scrap",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},69849:(e,t,s)=>{Promise.resolve().then(s.bind(s,74300))},74300:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>Scrap});var r=s(60080),a=s(9885),n=s(57114),o=s(72856),i=s(24937),l=s(20807),p=s(31670),c=s(61522);function Scrap(){let e=(0,n.useRouter)(),[t,s]=(0,a.useState)([]),[u,d]=(0,a.useState)(-1),[x,g]=(0,a.useState)(!1),[m,h]=(0,a.useState)(!1),[f,b]=(0,a.useState)(""),[_,v]=(0,a.useState)(""),[k,j]=(0,a.useState)(!1),S=(0,o.ZF)({apiKey:"AIzaSyB0wNhng69y2_dkHsPjN1k579LeYrSQWdU",authDomain:"scrapper-9558b.firebaseapp.com",databaseURL:"https://scrapper-9558b-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"scrapper-9558b",storageBucket:"scrapper-9558b.appspot.com",messagingSenderId:"241265284136",appId:"1:241265284136:web:253ec9f008e31a3d03911d"}),y=(0,c.ad)(S);(0,a.useEffect)(()=>{v(sessionStorage.getItem("scrapper-login")),getContentFromDb()},[]);let getContentFromDb=async()=>{let e=sessionStorage.getItem("scrapper-login"),t=[];await (0,c.QT)((0,c.JU)(y,"accounts",e)).then(e=>{t=e.data().scrap});let r=(0,c.IO)((0,c.hJ)(y,"posts"),(0,c.Xo)("time","desc"));await (0,c.PL)(r).then(e=>{let r=[];e.forEach(e=>{let s=e.data();for(let a=0;a<t.length;a++)if(e.id===t[a]){s.postId=e.id,r.push(s);break}}),s(r)})},uploadLikes=(e,t)=>{let s=(0,c.JU)(y,"posts",e);(0,c.r7)(s,{likes:t}),getContentFromDb()},handleTextSelection=()=>{let e,s,r;console.log(t);let a=t.find(e=>e.postId===f),n=window.getSelection();if(n&&n.rangeCount>0){let t=n.getRangeAt(0),r=t.toString();s=(e=a.msg.indexOf(r))+r.length-1}let o="";for(let t=0;t<e;t++)o+=a.msg[t];let i=0,l=o.match(/\\n/g);null!==l&&(i=l.length),i>0&&(e-=i,void 0!==s&&(s-=i)),void 0!==s&&(r=s-e);let p=e;if(void 0!==r)for(let e=0;e<r+1;e++)a.likes=a.likes+p.toString()+" ",p++;uploadLikes(f,a.likes)};return(0,r.jsxs)("div",{className:"h-auto min-h-screen w-screen bg-white flex flex-col justify-center items-center",children:[r.jsx("div",{className:"h-1/6 w-1/2 flex justify-center items-center fixed top-0 z-40",children:r.jsx("p",{className:"tracking-[-5px] text-black text-8xl border-r-4 border-black pr-[15px] ",style:{fontFamily:"lemon-r"},children:"SCRAPPER"})}),(0,r.jsxs)("div",{className:"right-0 mr-12 mt-12 opacity-1 fixed top-0 cursor-pointer flex flex-col",style:{zIndex:9999},children:[r.jsx(l.Z,{onClick:()=>e.push("/posts"),onMouseOver:()=>g(!0),onMouseLeave:()=>g(!1),className:x?"scale-up":"scale-down",sx:{fontSize:50,color:"black"}}),r.jsx(i.Z,{onClick:()=>e.push("/"),onMouseOver:()=>h(!0),onMouseLeave:()=>h(!1),className:m?"scale-up":"scale-down",sx:{fontSize:50,color:"black",marginTop:"3vh"}}),r.jsx(p.Z,{onClick:()=>e.push("/scrap"),onMouseOver:()=>j(!0),onMouseLeave:()=>j(!1),className:k?"scale-up":"scale-down",sx:{fontSize:50,color:"black",marginTop:"3vh"}})]}),(0,r.jsxs)("div",{className:"w-5/6 h-screen",children:[r.jsx("div",{className:"h-1/5"}),r.jsx("div",{className:"h-auto flex flex-col justify-center items-center",children:t.map((t,s)=>{let a=t.msg.replace(/\\n/g,"\n"),n=[],o=t.likes.split(" ");for(let e=0;e<a.length;e++)n[e]=0;for(let e=0;e<o.length;e++)n[o[e]]=n[o[e]]+1;return(0,r.jsxs)("div",{children:[r.jsx("p",{className:"text-black text-center mt-12",children:t.user}),r.jsx("p",{onMouseOver:()=>{d(s),b(t.postId)},onMouseLeave:()=>d(-1),onClick:()=>e.push(`/board/${t.user}`),style:{whiteSpace:"pre-wrap"},className:s===u?"leading-[38px] text-black font-extralight p-3 mt-2 text-[20px] text-center rounded-md line-highlight":"leading-[38px] text-black font-extralight text-[20px] p-3 mt-2 text-center rounded-md line-un-highlight",children:a.split("").map((e,t)=>{let s;return s=n[t]>8?"#A6A6A6":n[t]>=7?"#ADADAD":n[t]>=6?"#B5B5B5":n[t]>=5?"#BFBFBF":n[t]>=4?"#CCCCCC":n[t]>=3?"#D9D9D9":n[t]>=2?"#E6E6E6":n[t]>=1?"#F2F2F2":"#FFF",r.jsx("span",{onMouseUp:handleTextSelection,className:"text-black",style:{backgroundColor:s,userSelect:"text"},children:e},t)})},s)]},s)})})]})]})}s(95563)},36912:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>o,__esModule:()=>n,default:()=>l});var r=s(17536);let a=(0,r.createProxy)(String.raw`/Users/hongseungjae/Desktop/learning.js/scrapper/app/scrap/page.tsx`),{__esModule:n,$$typeof:o}=a,i=a.default,l=i},57481:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var r=s(96885);let __WEBPACK_DEFAULT_EXPORT__=e=>{let t=(0,r.fillMetadataSegment)(".",e.params,"favicon.ico");return[{type:"image/x-icon",sizes:"16x16",url:t+""}]}},95563:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),s=t.X(0,[255,37,218,484],()=>__webpack_exec__(78810));module.exports=s})();