(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{6446:function(e,t,s){"use strict";var a=s(6314);t.Z=void 0;var r=a(s(984)),n=s(7437),l=(0,r.default)((0,n.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.Z=l},9104:function(e,t,s){"use strict";var a=s(6314);t.Z=void 0;var r=a(s(984)),n=s(7437),l=(0,r.default)((0,n.jsx)("path",{d:"m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"}),"Logout");t.Z=l},3671:function(e,t,s){Promise.resolve().then(s.bind(s,7139))},7139:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return Home}});var a=s(7437),r=s(2265),n=s(4033),l=s(994),o=s(2303),c=s(8333),u=s(9104),i=s(6446),d=s(4174),p=s(4086);function Home(){let e=(0,r.useRef)(null),t=(0,r.useRef)(null),s=(0,r.useRef)(null),h=(0,r.useRef)(null),f=(0,r.useRef)(null),x=(0,r.useRef)(null),m=(0,n.useRouter)(),[g,v]=(0,r.useState)(""),[b,k]=(0,r.useState)([]),[S,w]=(0,r.useState)(-1),[y,L]=(0,r.useState)(),[j,C]=(0,r.useState)(!1),[N,D]=(0,r.useState)(""),[M,F]=(0,r.useState)(""),[I,E]=(0,r.useState)(""),[z,O]=(0,r.useState)(""),[R,T]=(0,r.useState)(10),[Z,A]=(0,r.useState)(""),[U,B]=(0,r.useState)([]),[H,J]=(0,r.useState)(!1),[P,_]=(0,r.useState)(!1),[V,K]=(0,r.useState)(!1),[Q,W]=(0,r.useState)(!1),[G,X]=(0,r.useState)(!1),Y=new Date("2023-10-15T12:00:00"),[q,$]=(0,r.useState)([]),ee=(0,l.ZF)({apiKey:"AIzaSyB0wNhng69y2_dkHsPjN1k579LeYrSQWdU",authDomain:"scrapper-9558b.firebaseapp.com",databaseURL:"https://scrapper-9558b-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"scrapper-9558b",storageBucket:"scrapper-9558b.appspot.com",messagingSenderId:"241265284136",appId:"1:241265284136:web:253ec9f008e31a3d03911d"}),et=(0,p.ad)(ee);(0,r.useEffect)(()=>{let t=sessionStorage.getItem("scrapper-login");F(t&&t);let s=0,a="SSCRAPPER",r=setInterval(()=>{s<a.length-1?(v(e=>e+a[s]),s++):clearInterval(r)},120);return!sessionStorage.getItem("scrapper-login")&&(void 0!==f.current?f.current&&f.current.classList.add("login-show-up"):(getContentFromDb(),setTimeout(()=>{void 0!==h.current&&void 0!==e.current&&void 0!==x&&(h.current&&h.current.classList.add("textarea-show-up"),e.current&&e.current.classList.add("textarea-show-up"),x.current&&x.current.classList.add("textarea-show-up"),e.current&&e.current.focus())},1e3))),()=>{clearInterval(r)}},[]),(0,r.useEffect)(()=>{if(""!==z?void 0!==s.current&&s.current&&(s.current.classList.remove("not-available-to-upload"),s.current.classList.add("available-to-upload")):void 0!==s.current&&s.current&&(s.current.classList.remove("available-to-upload"),s.current.classList.add("not-available-to-upload")),null!==z.match(/\n/g)){let e=z.match(/\n/g),t=e?e.length:0;T((10+t)*3.5)}},[z]),(0,r.useEffect)(()=>{U&&k(U&&[...U].reverse())},[U]);let handleLogin=async t=>{"Enter"===t.key&&(M&&I?(getContentFromDb(),(0,p.QT)((0,p.JU)(et,"accounts",M)).then(t=>{let s=t.data().password;null===s?D("존재하지 않는 아이디"):I===s?(D(""),sessionStorage.setItem("scrapper-login",M),f.current&&f.current.classList.add("login-done"),h.current&&h.current.classList.add("textarea-show-up"),x.current&&x.current.classList.add("textarea-show-up"),setTimeout(()=>{e.current&&e.current.classList.add("textarea-show-up"),e.current&&e.current.focus()},100),getContentFromDb()):D("비밀번호 미일치")})):D("모두 입력해주세요"))},uploadMsg=e=>{let t=new Date;(0,p.ET)((0,p.hJ)(et,"posts"),{msg:e,likes:"",user:M,time:t-Y}),getContentFromDb(),O("")},getContentFromDb=async()=>{let e=sessionStorage.getItem("scrapper-login"),t=(0,p.IO)((0,p.hJ)(et,"posts"),(0,p.Xo)("time","desc"));await (0,p.PL)(t).then(t=>{let s=[];t.forEach(t=>{let a=t.data();a.user===e&&(a.postId=t.id,s.push(a))}),$(s)})},uploadLikes=(e,t)=>{let s=(0,p.JU)(et,"posts",e);(0,p.r7)(s,{likes:t}),getContentFromDb()},handleTextSelection=()=>{let e,t,s;let a=q.find(e=>e.postId===Z),r=window.getSelection();if(r&&r.rangeCount>0){let s=r.getRangeAt(0),n=s.toString();t=(e=a.msg.indexOf(n))+n.length-1}let n="";for(let t=0;t<e;t++)n+=a.msg[t];let l=0;if(null!==n.match(/\\n/g)){let e=n.match(/\\n/g),t=e?e.length:0;l=t}l>0&&(e-=l,t&&(t-=l)),void 0!==t&&(s=t-e);let o=e;if(void 0!==s)for(let e=0;e<s+1;e++)a.likes=a.likes+o.toString()+" ",o++;uploadLikes(Z,a.likes)},handleDelete=()=>{(0,p.oe)((0,p.JU)(et,"posts",Z)).then(e=>{alert("삭제되었습니다.")}),getContentFromDb()},handleScrap=()=>{(0,p.QT)((0,p.JU)(et,"accounts",M)).then(e=>{let t=e.data().scrap;for(let e=0;e<t.length;e++)if(t[e]===Z){alert("이미 스크랩된 게시물입니다.");return}t.push(Z),(0,p.r7)((0,p.JU)(et,"accounts",M),{scrap:t}).then(e=>{alert("스크랩되었습니다.")})})};return(0,a.jsxs)("div",{className:"h-auto min-h-screen w-screen bg-white flex flex-col justify-center items-center",children:[(0,a.jsx)("div",{className:"h-1/6 w-1/2 flex justify-center items-center fixed transform translate-y-80 top-0 z-40 logo-move-up",children:(0,a.jsx)("p",{onMouseOver:()=>{s.current&&s.current.classList.add("font-black")},onMouseOut:()=>{s.current&&s.current.classList.remove("font-black")},onClick:()=>{uploadMsg(z)},ref:s,className:"tracking-[-5px] text-gray-500 text-8xl border-r-4 border-black pr-[15px] cursor-pointer",style:{fontFamily:"lemon-r"},children:g})}),(0,a.jsxs)("div",{className:"right-0 mr-12 mt-12 opacity-0 fixed top-0 cursor-pointer flex flex-col",style:{zIndex:9999},ref:x,children:[(0,a.jsx)(c.Z,{onClick:()=>m.push("/posts"),onMouseOver:()=>J(!0),onMouseLeave:()=>J(!1),className:H?"scale-up":"scale-down",sx:{fontSize:50,color:"black"}}),(0,a.jsx)(o.Z,{onClick:()=>m.push("/"),onMouseOver:()=>_(!0),onMouseLeave:()=>_(!1),className:P?"scale-up":"scale-down",sx:{fontSize:50,color:"black",marginTop:"3vh"}}),(0,a.jsx)(d.Z,{onClick:()=>m.push("/scrap"),onMouseOver:()=>K(!0),onMouseLeave:()=>K(!1),className:V?"scale-up":"scale-down",sx:{fontSize:50,color:"black",marginTop:"3vh"}}),(0,a.jsx)(u.Z,{onClick:()=>{sessionStorage.clear(),window.location.reload()},onMouseOver:()=>{X(!0),W(!0)},onMouseLeave:()=>{X(!1),W(!1)},className:Q?"scale-up":"scale-down",sx:{fontSize:40,marginLeft:"8px",color:"black",marginTop:"3vh"}})]}),(0,a.jsxs)("div",{ref:f,className:"w-screen h-screen absolute flex flex-col justify-center items-center transform -translate-y-32 opacity-0",children:[(0,a.jsx)("input",{placeholder:"EMAIL",value:M,onChange:e=>F(e.target.value),onKeyDown:e=>{"Enter"===e.key&&handleLogin(e)},type:"text",className:"w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black"}),(0,a.jsx)("input",{placeholder:"PW",value:I,onChange:e=>E(e.target.value),onKeyDown:e=>{"Enter"===e.key&&handleLogin(e)},type:"password",className:"w-1/5 focus:outline-none text-center text-3xl border-b-2 border-black pb-2 placeholder-black mt-12"}),(0,a.jsx)("p",{className:"text-xl mt-12",children:N}),(0,a.jsx)("a",{className:"text-xl mt-12",href:"/signup",children:"or  SIGN UP"})]}),(0,a.jsxs)("div",{ref:h,className:"w-screen flex flex-col mt-60 justify-center items-center absolute transform translate-y-16 opacity-0 overflow-hidden",children:[(0,a.jsx)("textarea",{value:z,onChange:e=>O(e.target.value),ref:e,style:{height:"".concat(R,"vh")},className:"w-5/6 text-black text-2xl text-center font-thin mt-80 focus:outline-none overflow-hidden resize-none"}),(0,a.jsx)("div",{className:"w-5/6 h-screen flex flex-col items-center",children:q.map((e,s)=>{let r=e.msg.replace(/\\n/g,"\n"),n=[],l=e.likes.split(" ");for(let e=0;e<r.length;e++)n[e]=0;for(let e=0;e<l.length;e++)n[l[e]]=n[l[e]]+1;return(0,a.jsxs)("div",{className:"flex flex-row justify-center items-center ml-6",onMouseOver:()=>{w(s),A(e.postId)},onMouseLeave:()=>w(-1),children:[(0,a.jsx)("p",{ref:t,style:{whiteSpace:"pre-wrap"},className:s===S?"leading-[38px] text-black font-extralight p-3 mt-2 text-[20px] text-center rounded-md line-highlight":"leading-[38px] text-black font-extralight text-[20px] p-3 mt-2 text-center rounded-md line-un-highlight",children:r.split("").map((e,t)=>{let s;return s=n[t]>8?"#A6A6A6":n[t]>=7?"#ADADAD":n[t]>=6?"#B5B5B5":n[t]>=5?"#BFBFBF":n[t]>=4?"#CCCCCC":n[t]>=3?"#D9D9D9":n[t]>=2?"#E6E6E6":n[t]>=1?"#F2F2F2":"#FFF",(0,a.jsx)("span",{onMouseUp:handleTextSelection,className:"text-black",style:{backgroundColor:s,userSelect:"text"},children:e},t)})},s),(0,a.jsxs)("div",{className:s===S?"opacity-1":"opacity-0",children:[(0,a.jsx)(d.Z,{sx:{color:"#333",cursor:"pointer"},onClick:handleScrap}),(0,a.jsx)(i.Z,{sx:{color:"#333",cursor:"pointer"},onClick:handleDelete})]})]},s)})})]})]})}s(2276)},2276:function(){}},function(e){e.O(0,[358,650,136,971,864,744],function(){return e(e.s=3671)}),_N_E=e.O()}]);