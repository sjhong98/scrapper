"use client";
import { useRouter } from 'next/navigation'
import { useRef, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import StarIcon from '@mui/icons-material/Star';

export default function MenuBar() {
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [menuHomeOver, setMenuHomeOver] = useState(false);
    const [menuMyOver, setMenuMyOver] = useState(false);
    const [menuScrapOver, setMenuScrapOver] = useState(false);
    const [menuLogoutOver, setMenuLogoutOver] = useState(false);
      // eslint-disable-next-linelint-disable @typescript-eslint/no-empty-function */
    const [showId, setShowId] = useState(false);

    return (
        <div className="right-0 mr-12 mt-12 opacity-0 fixed top-0 cursor-pointer flex flex-col" style={{zIndex:9999}} ref={menuRef} >
            <DashboardIcon onClick={()=>router.push('/posts')} onMouseOver={()=>setMenuHomeOver(true)} onMouseLeave={()=>setMenuHomeOver(false)} className={menuHomeOver ? "scale-up" : "scale-down"} sx={{fontSize:50, color:'black'}} />
            <HomeIcon onClick={()=>router.push('/')} onMouseOver={()=>setMenuMyOver(true)} onMouseLeave={()=>setMenuMyOver(false)} className={menuMyOver ? "scale-up" : "scale-down"} sx={{fontSize:50, color:'black', marginTop:'3vh'}} />
            <StarIcon onClick={()=>router.push('/scrap')} onMouseOver={()=>setMenuScrapOver(true)} onMouseLeave={()=>setMenuScrapOver(false)} className={menuScrapOver ? "scale-up" : "scale-down"} sx={{fontSize:50, color:'black', marginTop:'3vh'}} />
            <LogoutIcon onClick={()=>{sessionStorage.clear(); window.location.reload()}} onMouseOver={()=>{setShowId(true); setMenuLogoutOver(true);}} onMouseLeave={()=>{setShowId(false); setMenuLogoutOver(false);}} className={menuLogoutOver ? "scale-up" : "scale-down"} sx={{fontSize:40, marginLeft:'8px', color:'black', marginTop:'3vh'}} />
        </div>
    )
}