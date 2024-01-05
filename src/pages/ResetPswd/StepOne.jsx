import { useState } from "react";

export const StepOne = ({ setStep }) => {
    const [email, setEmail] = useState({ email: null });
    const [response, setResponse] = useState();

    const generatePswdResetToken = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_APIURL}/api/settings/generatepswdtoken`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(email)
        })
        .then(res => res.json())
        .then(data => {
            if (data?.user_email === email.email) return setStep(2);
            else return setResponse(data);
        })
    }

    return (
        <form className="mt-6" onSubmit={e => generatePswdResetToken(e)}>
            <label className="block text-sm text-gray-800 ">Email</label>
            <input 
            type="email" 
            required={true}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:outline-none" 
            placeholder="email"
            onChange={e => setEmail({ email: e.target.value })}/>
            <p className="mt-6 text-center text-sm text-gray-800">Enter your email and we'll send you a OTP Code to reset your password account</p>
            {
                response && <label className="block mt-6 text-center text-sm text-red-800 "> { JSON.stringify(response) } </label> 
            }
            <button type='submit' className="mt-6 w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">Next</button>       
        </form>
    )
}