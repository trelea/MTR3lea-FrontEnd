import { Link } from "react-router-dom";
import { UserContext } from "./Loyout";
import { useContext, useState } from "react";
import { UploadPost } from "./UploadPost";


export const AccMenu = ({ userMenu, setUserMenu }) => {
    const { data } = useContext(UserContext);
    const [uploadPost, setUploadPost] = useState(false);

    if (uploadPost) return <UploadPost setUploadPost={setUploadPost} userMenu={userMenu} setUserMenu={setUserMenu}/>

    const handleLogOut = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_APIURL}/api/auth/signout`, { method: 'POST', credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.msg === 'Logout.') return window.location.href = '/home';
            })
    }
    
    return (
            <div className="fixed z-50 top-16 right-0" id="user-menu">
                <div className="border border-gray-300 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-xl mr-2 mt-4 bg-white">
                    <ul className="p-2 px-4">

                        <Link to={`/user/${data.user_name}`}>
                            <li className="text-black hover:bg-slate-200 hover:rounded-lg px-2 py-1 my-1 font-medium text-lg border-b border-slate-200 flex gap-2 items-center" onClick={() => window.location.href = `/user/${data.user_name}`}>
                                <img className="aspect-square h-5 w-5" src="https://img.icons8.com/ios-filled/50/user-male-circle.png" alt="user-male-circle"/>
                                <p>Profile</p>
                            </li>
                        </Link>
                        
                        <Link>
                            <li className="text-black hover:bg-slate-200 hover:rounded-lg px-2 py-1 my-1 font-medium text-lg border-b border-slate-200 flex gap-2 items-center" onClick={() => window.location.href = '/profile/settings'}>
                                <img className="aspect-square h-5 w-5" src="https://img.icons8.com/ios-filled/50/settings.png" alt="settings" />
                                <p>Edit Profile</p>
                            </li>
                        </Link>

                        <Link>
                            <li className="text-black hover:bg-slate-200 hover:rounded-lg px-2 py-1 my-1 font-medium text-lg border-b border-slate-200 flex gap-2 items-center" onClick={() => setUploadPost(true)}>
                                <img className="aspect-square h-5 w-5" src="https://img.icons8.com/ios/50/upload--v1.png" alt="upload--v1"/>
                                <p>New Ann...</p>    
                            </li>
                        </Link>
                            
                        <Link>
                            <li className="text-black hover:bg-slate-200 hover:rounded-lg px-2 py-1 my-1 font-medium text-lg border-b border-slate-200 flex gap-2 items-center" onClick={() => window.location.href = '/signin'}>
                                <img className="aspect-square h-5 w-5" src="https://img.icons8.com/ios/50/login-rounded-right--v1.png" alt="login-rounded-right--v1"/>
                                <p>Switch Accounts</p>
                            </li>
                        </Link>
                        
                        <Link>
                            <li className="text-red-600 hover:bg-slate-200 rounded-lg px-2 py-1 font-medium text-lg flex gap-2 items-center" onClick={e => handleLogOut(e)}>
                                <img className="aspect-square h-5 w-5" src="https://img.icons8.com/ios/50/logout-rounded-left.png" alt="logout-rounded-left"/>
                                <p>Logout</p>
                            </li>
                        </Link>
                        
                    </ul>
                </div>
            </div>
    )
}