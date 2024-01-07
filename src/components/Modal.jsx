import { Link } from "react-router-dom"
import logo from "../logo2.svg"


export const Modal = (action) => {
    return (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="m-5 rounded-2xl overflow-y-auto bg-white sm:w-[75%] md:w-[50%] lg:w-[40%] xl:w-[25%]">
                <div className="p-3">

                    <div className="mb-8 w-fit h-fit">
                        <div className="flex justify-between">
                            <div></div>
                            <button className="border border-gray-800 rounded-full hover:bg-gray-200 p-1" onClick={() => window.location.href = '/'}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button> 
                        </div>
                        <div className="flex gap-2 px-8 py-2">
                            <h1 className="text-3xl font-extrabold">Get Into</h1>
                            <div className="flex justify-center items-center">
                                <img className="w-auto h-10 sm:h-10" src={logo} alt=""/>
                                <h1 className="text-2xl font-medium hidden md:block">TR3lea.</h1> 
                            </div>
                        </div>
                        <p className="text-gray-600 text-md px-8">Get the most out of [m]TR3lea. by staying up to date with what's happening.</p>
                    </div>


                    <div className="flex justify-center items-center gap-6 mb-4">
                        <button className="text-xl bg-gray-800 border border-gray-800 text-white rounded-3xl font-semibold p-2 px-8">
                            <Link to='/signin' 

                                onClick={() => {
                                    if (action.post_redirection) return window.location.href=`/signin/?post=${window.location.pathname.split('/')[2]}`
                                    return window.location.href='/signin'

                                }}

                                >SignIn</Link>
                        </button>
                        <button className="text-xl bg-white text-gray-800 border border-gray-800 rounded-3xl font-semibold p-2 px-8">
                            <Link to='/signup' 

                                onClick={() => {
                                    if (action.post_redirection) return window.location.href=`/signup/?post=${window.location.pathname.split('/')[2]}`
                                    return window.location.href='/signup'
                                }}

                                >SignUp</Link>
                        </button>
                    </div>


                </div>
            </div>
        </div>
    )
}

