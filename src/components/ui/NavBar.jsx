import "../../App.css";
import url from '../../KodaLogo2-D3eRgjLV.png';
import { Bell,Moon,LogOut ,Sun } from "lucide-react";
import { Theme } from "../Context";
import { useContext } from "react";

const NavBar=()=>{
    const {theme,toggleTheme}=useContext(Theme)

    return(
            
                <div className="navBar  fixed flex  justify-between items-center ">

                    <div className='left_bar flex  items-center '>
                            <div className='imgcotaner'>
                                <img src={url} className='imgBrand' />
                            </div>
                            
                            <div className='Brand'>
                                <p className=' font-bold'>
                                    <span className='text-xl'>Koda Dashboard</span>
                                    <br/>
                                    <small className=' text-sce font-extralight text-xs  '>E-Commerce Admin Panel</small>
                                </p>
                            </div>

                        
                    </div> {/* left_bar*/}

                    <div className='right_bar flex   items-center'>

                            <button className='notifcation relative  '>
                                <Bell size={20}/>
                                <p className='not absolute bg-red-500 rounded-circle'></p>
                            </button>

                            <button className='notifcation  ' onClick={toggleTheme}>

                                {theme==="light" ? <Moon size={20} /> : <Sun size={20} /> }
                                
                            </button>

                        <div className='adminAccount  justify-around items-center rounded-4  '>
                                <div className='accountName rounded-circle bg-primary '><p className='text-white  pt-2'>AA</p></div>

                                <div className='rightside pt-3'>

                                    <p className='fw-bold pr-2'>
                                        Admin Account
                                        <br/>
                                        <span className='text-sce font-extralight  text-sm '>Admin</span>
                                    </p>
                                    
                                </div>
                        </div>

                        <button href='#' className='logoutbtn  bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2  rounded-xl '><LogOut className='logoutIcon' size={20}/> <span className='logOut'>Log Out</span></button>
                    </div> {/* right_bar*/}

            </div>

           
    );
}

export default NavBar