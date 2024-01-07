import { useRef, useState } from "react"

export const DeleteAccModal = ({ setDeleteAccModal }) => {
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState(null);
    const inputRef = useRef();

    const handleDeleteAccount = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_APIURL}/api/settings/deleteacc`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ password })
        })
        .then(res => res.json())
        .then(data => {
            inputRef.current.value = '';
            setPassword("");
            if (data.response === 'DELETE') return window.location.href = '/';
            return setResponse(data);
        });
    }

    return (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-full m-5 sm:w-[85%] md:w-[70%] lg:w-[55%] xl:w-[40%] 2xl:w-[30%] rounded-2xl overflow-y-auto bg-white p-6 ">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-extrabold sm:text-2xl md:text-3xl">Delete Your Account</h1>    
                    <button className="border border-gray-800 rounded-full hover:bg-gray-200 p-1" onClick={() => setDeleteAccModal(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button> 
                </div>

                <div className="flex flex-col mt-8 gap-1">
                    <label className="text-lg font-semibold text-gray-400">Password</label>
                    <input 
                        ref={inputRef}
                        type="password" 
                        className="p-2 focus:outline-none border-2 border-gray-800 rounded-xl"
                        placeholder="Your Password..."
                        onChange={e => setPassword(e.target.value)}/>
                </div>
                
                {
                    response &&
                        <div className="flex items-center justify-center mt-5">
                            <p>{JSON.stringify(response)}</p>
                        </div>
                }

                <div className="mt-8 flex flex-col">
                    {
                        (password.length >= 1) && 
                            <button className="bg-red-600 border-2 border-red-600 rounded-xl text-xl font-semibold text-white p-2 hover:bg-red-100 hover:text-red-600 hover:border-red-600 mb-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                                onClick={e => handleDeleteAccount(e)}>
                                Delete Account
                            </button>
                    }
                    <button className="bg-gray-800 border-2 border-gray-800 rounded-xl text-xl font-semibold text-white p-2 hover:bg-green-100 hover:text-green-600 hover:border-green-600 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                        onClick={() => setDeleteAccModal(false)}>
                        Keep Account
                    </button>
                </div>
            </div>
        </div>
    )
}