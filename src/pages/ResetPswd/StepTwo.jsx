import { useState } from "react";

export const StepTwo = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [resetPswdForm, setResetPswdForm] = useState({ otpCode: 0, password: null, confirmPassword: null});
    const [response, setResponse] = useState();

    const resetPassword = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_APIURL}/api/settings/resetpswd`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resetPswdForm)
        })
        .then(res => res.json())
        .then(data => {
            if (data.msg === "UPDATE") {
                setResponse("Password reset successfully.");
                return setTimeout(() => {
                    window.location.href = '/signin';
                }, 2000)
            }
            return setResponse(data);
        })
    }

    return (
        <>
            <p className="mt-6 text-center text-sm text-gray-800">Check Your Email Inbox Or Spam Section For OTP. Cookies And OTP Code Will Expire in 1h.</p>
            <form className="mt-6" onSubmit={e => resetPassword(e)}>
                <div>
                    <label className="block text-sm text-gray-800">Otp Code</label>
                    <input 
                    type="text" 
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  focus:outline-none" 
                    placeholder="otp code"
                    onChange={e => setResetPswdForm({
                        ...resetPswdForm,
                        otpCode: e.target.value
                    })}/>        
                </div>
                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm text-gray-800 ">New Password</label>
                    </div>
                    <input 
                    type={showPassword ? "text" : "password"} 
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  focus:outline-none" 
                    placeholder="new password"
                    onChange={e => setResetPswdForm({
                        ...resetPswdForm,
                        password: e.target.value
                    })}/>
                </div>
                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm text-gray-800 ">Retype New Password</label>
                    </div>
                    <input 
                    type={showPassword ? "text" : "password"}  
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  focus:outline-none" 
                    placeholder="retype new password"
                    onChange={e => setResetPswdForm({
                        ...resetPswdForm,
                        confirmPassword: e.target.value
                    })}/>
                </div>
                <div className="mt-4 text-right">
                    <label 
                    className="text-sm text-gray-600  hover:underline"
                    onClick={() => setShowPassword(!showPassword)}><strong>{showPassword ? "[ Hide ]" : "[ Show ]"}</strong></label>
                </div>
                {
                    (response === "Password reset successfully.") ?
                        <label className="block mt-6 text-center text-sm text-green-600"> { JSON.stringify(response) } </label>:
                        <label className="block mt-6 text-center text-sm text-red-800"> { JSON.stringify(response) } </label> 
                }
                <button type='submit' className="mt-6 w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">Reset Password</button> 
            </form>
        </>
    )
}