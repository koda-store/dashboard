import { useState,useEffect} from "react";
import { Theme } from "../Context";
const ThemeContext=({children})=>{

    const [theme,setTheme]=useState("light")

    const toggleTheme=()=>{
        setTheme(prev=>(prev==="light" ? "dark" :"light"))
    }
    useEffect(()=>{
        document.body.className=theme
    },[theme])

    return(
        <div>
            <Theme.Provider value={{theme,toggleTheme}}>
                {children}
            </Theme.Provider>
        </div>
    );
}

export default ThemeContext;
