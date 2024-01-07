import { Link } from "react-router-dom";
import { useState } from "react";
import { DeleteAccModal } from "./DeleteAccModal";

export const MoreSettings = () => {
    const [deleteAccModal, setDeleteAccModal] = useState(false);
    return (
        <>
            {
                deleteAccModal && <DeleteAccModal setDeleteAccModal={setDeleteAccModal}/>
            }
            <h1 className="mt-6 mx-10 text-2xl border-b border-gray-800">More Settings</h1>
            <div className="mx-10 mb-6 mt-4">
                <div className="text-slate-600 text-lg font-light border-b border-slate-400 hover:text-blue-500 mt-1">
                    <Link to='/accounts/password/reset' >Reset Password</Link>
                </div>
                <div className="text-slate-600 text-lg font-light border-b border-slate-400 hover:text-red-500 mt-1">
                    <Link onClick={() => setDeleteAccModal(true)}>Delete Account</Link>
                </div>
                <div className="text-slate-600 text-lg font-light border-b border-slate-400 hover:text-green-500 mt-1">
                    <Link to='https://github.com/trelea/MTR3lea-FrontEnd' target="_blank">About Us</Link>
                </div>
            </div>
        </>
    )
}