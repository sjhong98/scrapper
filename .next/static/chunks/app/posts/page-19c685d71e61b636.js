(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[991],{5510:function(e,t,s){Promise.resolve().then(s.bind(s,1097))},1097:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return Posts}});var l=s(7437),n=s(2265),a=s(4033),o=s(994),r=s(2303),c=s(8333),i=s(4174),p=s(4086);function Posts(){let e=(0,a.useRouter)(),[t,s]=(0,n.useState)([]),[d,u]=(0,n.useState)(-1),[h,x]=(0,n.useState)(!1),[f,m]=(0,n.useState)(!1),[g,b]=(0,n.useState)(""),[k,v]=(0,n.useState)(!1),S=(0,o.ZF)({apiKey:"AIzaSyB0wNhng69y2_dkHsPjN1k579LeYrSQWdU",authDomain:"scrapper-9558b.firebaseapp.com",databaseURL:"https://scrapper-9558b-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"scrapper-9558b",storageBucket:"scrapper-9558b.appspot.com",messagingSenderId:"241265284136",appId:"1:241265284136:web:253ec9f008e31a3d03911d"}),j=(0,p.ad)(S);(0,n.useEffect)(()=>{getContentFromDb()},[]);let getContentFromDb=async()=>{let e=(0,p.IO)((0,p.hJ)(j,"posts"),(0,p.Xo)("time","desc"));await (0,p.PL)(e).then(e=>{let t=[];e.forEach(e=>{let s=e.data();s.postId=e.id,t.push(s)}),s(t),console.log(t)})},uploadLikes=(e,t)=>{let s=(0,p.JU)(j,"posts",e);(0,p.r7)(s,{likes:t}),getContentFromDb()},handleTextSelection=()=>{let e,s,l;console.log(t);let n=t.find(e=>e.postId===g),a=window.getSelection();if(a&&a.rangeCount>0){let t=a.getRangeAt(0),l=t.toString();s=(e=n.msg.indexOf(l))+l.length-1}let o="";for(let t=0;t<e;t++)o+=n.msg[t];let r=0,c=o.match(/\\n/g);null!==c&&(r=c.length),r>0&&(e-=r,void 0!==s&&(s-=r)),void 0!==s&&(l=s-e);let i=e;if(void 0!==l)for(let e=0;e<l+1;e++)n.likes=n.likes+i.toString()+" ",i++;uploadLikes(g,n.likes)};return(0,l.jsxs)("div",{className:"h-auto min-h-screen w-screen bg-white flex flex-col justify-center items-center",children:[(0,l.jsx)("div",{className:"h-1/6 w-1/2 flex justify-center items-center fixed top-0 z-40",children:(0,l.jsx)("p",{className:"tracking-[-5px] text-black text-8xl border-r-4 border-black pr-[15px] ",style:{fontFamily:"lemon-r"},children:"SCRAPPER"})}),(0,l.jsxs)("div",{className:"right-0 mr-12 mt-12 opacity-1 fixed top-0 cursor-pointer flex flex-col",style:{zIndex:9999},children:[(0,l.jsx)(c.Z,{onClick:()=>e.push("/posts"),onMouseOver:()=>x(!0),onMouseLeave:()=>x(!1),className:h?"scale-up":"scale-down",sx:{fontSize:50,color:"black"}}),(0,l.jsx)(r.Z,{onClick:()=>e.push("/"),onMouseOver:()=>m(!0),onMouseLeave:()=>m(!1),className:f?"scale-up":"scale-down",sx:{fontSize:50,color:"black",marginTop:"3vh"}}),(0,l.jsx)(i.Z,{onClick:()=>e.push("/scrap"),onMouseOver:()=>v(!0),onMouseLeave:()=>v(!1),className:k?"scale-up":"scale-down",sx:{fontSize:50,color:"black",marginTop:"3vh"}})]}),(0,l.jsxs)("div",{className:"w-5/6 h-screen",children:[(0,l.jsx)("div",{className:"h-1/5"}),(0,l.jsx)("div",{className:"h-auto flex flex-col justify-center items-center",children:t.map((t,s)=>{let n=t.msg.replace(/\\n/g,"\n"),a=[],o=t.likes.split(" ");for(let e=0;e<n.length;e++)a[e]=0;for(let e=0;e<o.length;e++)a[o[e]]=a[o[e]]+1;return(0,l.jsxs)("div",{children:[(0,l.jsx)("p",{className:"text-black text-center mt-12",children:t.user}),(0,l.jsx)("p",{onMouseOver:()=>{u(s),b(t.postId)},onMouseLeave:()=>u(-1),onClick:()=>e.push("/board/".concat(t.user)),style:{whiteSpace:"pre-wrap"},className:s===d?"leading-[38px] text-black font-extralight p-3 mt-2 text-[20px] text-center rounded-md line-highlight":"leading-[38px] text-black font-extralight text-[20px] p-3 mt-2 text-center rounded-md line-un-highlight",children:n.split("").map((e,t)=>{let s;return s=a[t]>8?"#A6A6A6":a[t]>=7?"#ADADAD":a[t]>=6?"#B5B5B5":a[t]>=5?"#BFBFBF":a[t]>=4?"#CCCCCC":a[t]>=3?"#D9D9D9":a[t]>=2?"#E6E6E6":a[t]>=1?"#F2F2F2":"#FFF",(0,l.jsx)("span",{onMouseUp:handleTextSelection,className:"text-black",style:{backgroundColor:s,userSelect:"text"},children:e},t)})},s)]},s)})})]})]})}s(2276)},2276:function(){}},function(e){e.O(0,[358,650,136,971,864,744],function(){return e(e.s=5510)}),_N_E=e.O()}]);