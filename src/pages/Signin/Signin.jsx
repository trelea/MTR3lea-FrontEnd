import logo from "../../logo2.svg";
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";



export const Signin = () => {

    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);
    const [loginBody, setLoginBody] = useState({
        email: '',
        password: ''
    });
    const [fetchRes, setFetchRes] = useState(null);

    const navigate = useNavigate();
    const loginFunction = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_APIURL}/api/auth/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(loginBody)
        });
        const json = await res.json();
        if ( json.msg === "Logged In." ) {
            setFetchRes("Successfully Logged In.");
            const queryParams = new URLSearchParams(location.search);
            if (queryParams.get('post')) return navigate(`/post/${queryParams.get('post')}`);
            return navigate('/home');
        }
        setFetchRes(json);
        
    }

    return (   
        <div className="h-screen flex justify-center items-center bg-slate-100">          
            <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-xl">
                <div className="flex justify-center mx-auto">
                    <img className="w-auto h-20 sm:h-20" src={logo} alt="" />
                </div>
                <h1 className="mt-3 text-2xl font-extrabold text-center text-gray-800">Sign In.</h1>
                <form className="mt-6" onSubmit={(e) => loginFunction(e)}>
                    <div>
                        <label for="email" className="block text-sm text-gray-800">Email</label>
                        <input 
                        type="email" 
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:outline-none" 
                        placeholder="email"
                        onChange={(e) => setLoginBody({ 
                            ...loginBody,
                            email: e.target.value 
                        })}/>
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <label for="password" className="block text-sm text-gray-800 ">Password</label>
                            <Link to="/accounts/password/reset" className="text-sm text-gray-600 hover:underline">Forget Password?</Link>
                        </div>

                        
                        <input 
                        type={showPassword ? "text" : "password"}  
                        placeholder="password"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:outline-none"
                        onChange={(e) => setLoginBody({ 
                            ...loginBody,
                            password: e.target.value 
                        })}/>
                    </div>

                    <div className="mt-4 text-right">
                        <label 
                        className="text-sm text-gray-600  hover:underline"
                        onClick={() => setShowPassword(!showPassword)}><strong>{showPassword ? "[ Hide ]" : "[ Show ]"}</strong></label>
                    </div>

                    { (fetchRes === "Successfully Logged In.") ? 
                        <div className="mt-6 flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50">
                            <div>
                                <span class="font-medium">Info!</span> Successfully Logged In.
                            </div>
                        </div> : 
                        <label className="block mt-6 text-center text-sm text-red-800 "> { fetchRes && JSON.stringify(fetchRes) } </label> 
                    }               

                    <div className="mt-6">
                        <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                            Sign In
                        </button>
                    </div>
                </form>
                <p className="mt-8 text-sm font-light text-center text-gray-400"> Don't have an account ? <Link to="/signup" className="font-medium text-gray-700 hover:underline">Create One</Link></p>
            </div>
        </div>
    )
}