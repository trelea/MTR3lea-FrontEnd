export const AccMenu = () => {
    const handleLogOut = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_APIURL}/api/auth/signout`, { method: 'POST', credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.msg === 'Logout.') return window.location.href = '/home';
            })
    }
    return (
        <div className="fixed z-50 top-16 right-0">
            <div className="border border-gray-300 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-xl mr-2 mt-4 bg-white">
                <ul className="p-2 px-4">
                    <li className="text-black hover:bg-slate-200 hover:rounded-lg px-2 py-1 my-1 font-medium text-lg border-b border-slate-200">Profile</li>
                    <li className="text-black hover:bg-slate-200 hover:rounded-lg px-2 py-1 my-1 font-medium text-lg border-b border-slate-200">Edit Profile</li>
                    <li className="text-black hover:bg-slate-200 hover:rounded-lg px-2 py-1 my-1 font-medium text-lg border-b border-slate-200" onClick={() => window.location.href = '/signin'}>Switch Accounts</li>
                    <li className="text-red-600 hover:bg-slate-200 rounded-lg px-2 py-1 font-medium text-lg"
                        onClick={e => handleLogOut(e)}>Logout</li>
                </ul>
            </div>
        </div>
    )
}