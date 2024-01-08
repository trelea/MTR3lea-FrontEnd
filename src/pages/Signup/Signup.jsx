import { useState } from "react";
import logo from "../../logo2.svg"
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { Link, useNavigate, useLocation } from "react-router-dom";



export const Signup = () => {
    const [step, setStep] = useState(1);
    const [fetchRes, setFetchRes] = useState(null);
    const location = useLocation();

    const [firstForm, setFirstForm] = useState({
        email: '',
        username: '',
        date: ''
    })
    const [secondForm, setSecondForm] = useState({
        optCode: 0,
        password: '',
        confirmPassword: ''
    })

    const stepOneFunction = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_APIURL}/api/auth/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(firstForm)
        });
        const jsRes = await res.json();
        setFetchRes(jsRes);
        if ( jsRes.user_email === firstForm.email ) {
            setFetchRes(null); 
            return setStep(step + 1);
        }
    }

    
    const navigate = useNavigate();
    const stepTwoFunction = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_APIURL}/api/auth/verification`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(secondForm)
        });
        const jsRes = await res.json();
        setFetchRes(jsRes);
        if ( jsRes.status ) {
            setFetchRes('Successfully Created Account.');
            const queryParams = new URLSearchParams(location.search);
            setTimeout(() => {
                if (queryParams.get('post')) return navigate(`/signin/?post=${queryParams.get('post')}`, { replace: true});
                return navigate('/signin', { replace: true });
            }, 3000)
        }
    }

    return (
        <div className="h-screen flex justify-center items-center bg-slate-100">          
            <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md">
                <div className="flex justify-center mx-auto">
                    <img className="w-auto h-20 sm:h-20" src={logo} alt="" />
                </div>
                <h1 class="mt-3 text-2xl font-extrabold text-center text-gray-800">Sign Up.</h1>
                {(() => {
                    switch (step) {
                        case 1: return <StepOne firstForm = { firstForm } setFirstForm = { setFirstForm } />;
                        case 2: return <StepTwo secondForm = { secondForm } setSecondForm = { setSecondForm } />;
                        default: return alert("default case");
                    };
                })()}

                { (fetchRes === "Successfully Created Account.") ? 
                    <div className="mt-6 flex items-center p-4 mb-4 text-sm text-green-800-800 border border-green-300 rounded-lg bg-green-50">
                        <div>
                            <span class="font-medium">Info!</span> Successfully Created Account. In 3 Seconds You Will Be Redirected To SignIn Page. 
                        </div>
                    </div> : 
                    <label className="block mt-6 text-center text-sm text-red-800 "> { fetchRes && JSON.stringify(fetchRes) } </label> 
                }
                
                <div className="mt-6">
                    <button 
                    className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                    onClick={(e) => {
                        if (step === 1) { stepOneFunction(e) }
                        if (step === 2) { stepTwoFunction(e) }
                    }}>Next</button>
                </div>
                <p className="mt-8 text-sm font-light text-center text-gray-400"> Have an account already ? 
                    <Link className="font-medium text-gray-700 hover:underline" to="/signin" preventScrollReset>Sign In</Link>
                </p>
            </div>
        </div>
    )
}