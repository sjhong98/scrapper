"use client";
import { useRouter } from 'next/navigation'
import { useRef, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import StarIcon from '@mui/icons-material/Star';

export default function MenuBar() {
    
    const router = useRouter();
    const [menuHomeOver, setMenuHomeOver] = useState(false);
    const [menuMyOver, setMenuMyOver] = useState(false);
    const [menuScrapOver, setMenuScrapOver] = useState(false);
    const [menuLogoutOver, setMenuLogoutOver] = useState(false);
      // eslint-disable-next-linelint-disable @typescript-eslint/no-empty-function */
    const [showId, setShowId] = useState(false);

    return (
        <div className="w-screen sm:w-auto bg-white flex sm:justify-start justify-between right-0 sm:mr-12 sm:mt-12 fixed sm:top-0 top-[91vh] cursor-pointer sm:flex-col flex-row" style={{zIndex:9999}} >
            <DashboardIcon 
                onClick={()=>router.push('/posts')} 
                onMouseOver={()=>setMenuHomeOver(true)} 
                onMouseLeave={()=>setMenuHomeOver(false)} 
                className={menuHomeOver ? "scale-up" : "scale-down"} 
                sx={{fontSize:50, color:'black', marginTop:'3vh'}} 
            />
            <HomeIcon 
                onClick={()=>router.push('/')} 
                onMouseOver={()=>setMenuMyOver(true)} 
                onMouseLeave={()=>setMenuMyOver(false)} 
                className={menuMyOver ? "scale-up" : "scale-down"} 
                sx={{fontSize:50, color:'black', marginTop:'3vh'}} 
            />
            <StarIcon 
                onClick={()=>router.push('/scrap')} 
                onMouseOver={()=>setMenuScrapOver(true)} 
                onMouseLeave={()=>setMenuScrapOver(false)} 
                className={menuScrapOver ? "scale-up" : "scale-down"} 
                sx={{fontSize:50, color:'black', marginTop:'3vh'}} 
            />
            <LogoutIcon 
                onClick={()=>{sessionStorage.clear(); window.location.reload()}} 
                onMouseOver={()=>{setShowId(true); setMenuLogoutOver(true);}} 
                onMouseLeave={()=>{setShowId(false); setMenuLogoutOver(false);}} 
                className={menuLogoutOver ? "scale-up" : "scale-down"} 
                sx={{fontSize:40, marginLeft:'8px', color:'black', marginTop:'3vh'}} 
            />
        </div>
    )
}