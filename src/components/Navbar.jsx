import logo from "../logo2.svg";
import { Link } from "react-router-dom";
import { useContext,  useState } from "react";
import { UserContext } from "./Loyout";
import { QueryPosts } from "./QueryPosts";
import { AccMenu } from "./AccMenu";

export const Navbar = () => {
    const { data } = useContext(UserContext);
    const [searchOutput, setSearchOutput] = useState([]);
    const [previewSearchOutput, setPreviewSearchOutput] = useState(false);

    const [userMenu, setUserMenu] = useState(false);

    const HandleSearchPosts = (e) => {
        e.preventDefault()
        if (e.target.value.length > 0) {
            fetch(`${process.env.REACT_APP_APIURL}/api/content/search/${e.target.value}`, { method: 'GET' })
                .then(res => res.json())
                .then(data => setSearchOutput(data.postSearched))
                .catch(err => alert(err))
        } else setSearchOutput([])
    }

    return (  
        <>  
            {
                userMenu && <AccMenu/>
            }
            <nav className="flex fixed w-screen py-3 sm:px-10 bg-white border-b border-gray-200 justify-between px-4 z-10">
                <div className="flex items-center justify-between">
                    <Link to='/home' onClick={() => window.location.href='/home'} className="flex items-center">
                        <img className="w-auto h-10 sm:h-10" src={logo} alt=""/>
                        <h1 className="text-2xl font-medium hidden md:block">TR3lea.</h1>
                    </Link>
                </div>
                <div className="flex flex-col">
                    <form className="h-full px-2 sm:w-96 flex items-center border border-gray-800 rounded-md bg-white justify-between">

                        <input type="text" className="w-full text-sm bg-white focus:outline-none" placeholder="Search Posts..."
                            onChange={e => HandleSearchPosts(e)} 
                            onFocus={() => setPreviewSearchOutput(true)}
                            onBlur={(e) => { if (e.relatedTarget === null) return setPreviewSearchOutput(false) }}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </form>

                    {
                        (searchOutput.length > 0 && previewSearchOutput) &&
                            <div className="left-0 top-0 mt-20 fixed flex justify-center w-screen">
                                <div className="border border-gray-400 mx-2 bg-gray-50 rounded-lg overflow-y-auto min-h-fit max-h-96 w-[90%] md:w-[50%] lg:w-[35%] shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                                {
                                    searchOutput.map((post) => {
                                        return <QueryPosts key={post.post_id} details={post} />
                                    })
                                }
                                </div>
                            </div>
                    }

                </div>
                { data.user_id ? 
                    <div className="flex justify-between items-center" >
                        <h1 className="text-lg font-medium text-center text-gray-800 mr-2 hidden md:block" >{data.user_name}</h1>
                        <button className="border border-gray-800 flex items-center justify-center rounded-full"
                            onClick={(e) => setUserMenu(!userMenu)}
                            onBlur={(e) => { if (e.relatedTarget === null) return setUserMenu(false) }} >
                            <img className="object-cover w-8 h-8 rounded-full" src={`${process.env.REACT_APP_APIURL}${data.user_thumbnail}`} alt="" />
                        </button>
                    </div> 
                    : 
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
        </>
    )      
}