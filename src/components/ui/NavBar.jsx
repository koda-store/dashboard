// import 
// import  url from '' 
// import '.'
import '../App.css';
import url from '../KodaLogo2-D3eRgjLV.png';
import { Bell,Moon,LogOut } from "lucide-react";
const NavBar=()=>{
    return(
            
                <div className="navBar bg-white  position-fixed d-flex  justify-content-between align-items-center ">

  
                <div className='left_bar w-35 h-90  d-flex  align-items-center d-sm-flex'>
                    <div className='imgcotaner'>
                        <img src={url} className='imgBrand' />
                    </div>
                    
                    <div className='Brand'>
                        <p className=' fw-bold'>
                            <span className='fs-5'>Koda Dashboard</span>
                            <br/>
                            <small className='fw-light text-xs  fs-9'>E-Commerce Admin Panel</small>
                        </p>
                    </div>

                    
                </div>
{/* ///////////////////////////////////////////////////////////////////// */}
                <div className='right_bar d-flex   align-items-center '>

                    {/* <div className='moodbtn d-flex justify-content-around align-items-center'>
                       
                    </div> */}
                     <button className='notifcation position-relative  '>
                           <Bell size={20}/>
                            <p className='not position-absolute bg-danger rounded-circle'></p>
                        </button>
                        <button className='notifcation  '><Moon size={20} /> </button>

                    <div className='adminAccount  justify-content-around align-items-center rounded-4 bg-slate-50 border border-secondary-subtle'>
                        <div className='accountName rounded-circle bg-primary '><p className='text-white  pt-2'>AA</p></div>
                        <div className='rightside pt-3'>
                            <p className='fw-bold fs-8 pr-2'>
                                Admin Account
                                <br/>
                                <span className='fw-light mt-2'>admin</span>
                            </p>
                            
                            
                        </div>
                    </div>

                    <button href='#' className='logoutbtn btn rounded-3 btn-danger '><LogOut className='logoutIcon' size={20}/> <span className='logOut'>Log Out</span></button>
                </div>

            </div>

           
    );
}

export default NavBar