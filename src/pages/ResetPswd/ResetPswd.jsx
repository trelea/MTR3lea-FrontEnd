import logo from '../../logo2.svg';
import { useState } from 'react';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { Link } from "react-router-dom";

export const ResetPswd = () => {
    const [step, setStep] = useState(1);

    return (
        <div className="h-screen flex justify-center items-center bg-slate-100">          
            <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md">
                <div className="flex justify-center mx-auto">
                    <img className="w-auto h-20 sm:h-20" src={logo} alt="" />
                </div>
                <h1 className="mt-3 text-2xl font-extrabold text-center text-gray-800">Reset Password.</h1>
                
                { (step === 1) && <StepOne setStep={setStep} /> }
                { (step === 2) && <StepTwo /> }

                <p className="mt-8 text-sm font-light text-center text-gray-400"> Don't have an account ? <Link to="/signup" className="font-medium text-gray-700 hover:underline">Create One</Link></p>
            </div>
        </div>
    )
}