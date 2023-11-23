import logo from "../logo2.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./Loyout";


export const Navbar = () => {
    const { data } = useContext(UserContext);

    return (  
          
        <nav className="flex fixed w-screen py-3 sm:px-10 bg-white border-b border-gray-200 justify-between px-4">
            <div className="flex items-center justify-between">
                <Link to='/home' onClick={() => window.location.href='/home'} className="flex items-center">
                    <img className="w-auto h-10 sm:h-10" src={logo} alt=""/>
                    <h1 className="text-2xl font-medium hidden md:block">TR3lea.</h1>
                </Link>
            </div>
            <form className="px-2 sm:w-96 flex items-center border border-gray-800 rounded-md bg-white justify-between">
                <input type="text" className="w-full text-sm bg-white focus:outline-none" placeholder="Search"/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </form>
            { data.user_id ? 
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-medium text-center text-gray-800 mr-2 hidden md:block" >{data.user_name}</h1>
                    <button className="border border-gray-800 flex items-center justify-center rounded-full">
                        <img className="object-cover w-8 h-8 rounded-full" src={`${process.env.REACT_APP_APIURL}${data.user_thumbnail}`} alt="" />
                    </button>
                </div> : 
                <div className="flex justify-between items-center">


                    <button className="bg-gray-800 border border-gray-800 text-white rounded-3xl font-semibold p-1 px-4">
                        <Link to='/signin'onClick={() => window.location.href='/signin'}>SignIn</Link>
                    </button>
                    <button className="bg-white text-gray-800 border border-gray-800 rounded-3xl font-semibold p-1 px-4 ml-4 hidden md:block">
                        <Link to='/signup' onClick={() => window.location.href='/signup'}>SignUp</Link>
                    </button>


                </div>
            }            
        </nav>
    )      
}