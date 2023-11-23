import { useState } from "react"

export const StepTwo = ({ secondForm, setSecondForm }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
            <p className="mt-6 text-center text-sm text-gray-800">Check Your Email Inbox Or Spam Section For OTP. Cookies And OTP Code Will Expire in 1h.</p>
            <form className="mt-6" >
                <div>
                    <label for="email" className="block text-sm text-gray-800">Otp Code</label>
                    <input 
                    type="text" 
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  focus:outline-none" 
                    placeholder="otp code"
                    onChange={(e) => {
                        setSecondForm({
                            ...secondForm,
                            otpCode: Number(e.target.value)
                        })
                    }}/>        
                </div>
                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <label for="password" className="block text-sm text-gray-800 ">Password</label>
                    </div>
                    <input 
                    type={showPassword ? "text" : "password"} 
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  focus:outline-none" 
                    placeholder="password"
                    onChange={(e) => {
                        setSecondForm({
                            ...secondForm,
                            password: e.target.value
                        })
                    }}/>
                </div>
                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <label for="password" className="block text-sm text-gray-800 ">Password</label>
                    </div>
                    <input 
                    type={showPassword ? "text" : "password"}  
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  focus:outline-none" 
                    placeholder="retype password"
                    onChange={(e) => {
                        setSecondForm({
                            ...secondForm,
                            confirmPassword: e.target.value
                        })
                    }}/>
                </div>
                <div className="mt-4 text-right">
                    <label 
                    className="text-sm text-gray-600  hover:underline"
                    onClick={() => setShowPassword(!showPassword)}><strong>{showPassword ? "[ Hide ]" : "[ Show ]"}</strong></label>
                </div>
            </form>
        </>
    )
                
}