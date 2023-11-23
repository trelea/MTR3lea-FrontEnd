import logo from "../logo2.svg";
import { useNavigate } from "react-router-dom";
import { Loyout } from "../components/Loyout";

export const Page404 = () => {
    const navigate = useNavigate();
    
    return (
        <Loyout>
            <div className="h-screen flex justify-center items-center bg-slate-100">          
                <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-xl">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-20 sm:h-20" src={logo} alt="" />
                    </div>
                    <h1 className="mt-3 text-3xl font-extrabold text-center text-gray-800">404 Page not found.</h1>
                    
                    <div className="mt-6 flex items-center p-4 mb-4 text-sm text-pink-800 border border-pink-300 rounded-lg bg-pink-50">
                        <div>
                            <span className="font-semibold text-lg">Info!</span> <p className="font-light text-lg">Sorry, the path you are looking for <span className="font-semibold text-lg">{ window.location.href }</span> could not be found.</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button 
                        className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                        onClick={() => navigate(-1)}>Go Back</button>
                    </div>
                </div>
            </div>
        </Loyout>
    )
}


