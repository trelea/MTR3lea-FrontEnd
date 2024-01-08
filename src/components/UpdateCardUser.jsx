import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./Loyout";
import { MoreSettings } from "./MoreSettings";
import { useNavigate } from "react-router-dom";

export const UpdateCardUser = () => {
    const userObj = useContext(UserContext);
    const [user] = useState(userObj?.data?.user_name ? `${userObj.data.user_name}` : false);
    const [response, setResponse] = useState({});
    const [info, setInfo] = useState();
    const navigate = useNavigate();

    const [newThumb, setNewThumb] = useState(null)

    const refName = useRef();
    const refDesc = useRef();
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_APIURL}/api/user/profile/${user}`, { method: 'GET', credentials: 'include'})
            .then(res => res.json())
            .then(data => {
                if (data.msg === "Access Denied.") return navigate('/signin', { replace: true });
                refName.current.value = data.infos.user_additional_name;
                refDesc.current.value = data.infos.user_description;
                return setResponse(data.infos)
            })
    }, [user, navigate])


    const removeThumbnail = (e) => {
        e.preventDefault()
        if (!newThumb && response.user_thumbnail === '/images/profilesThumbnails/defaultUserProfileThumbnail.png') return
        fetch(`${process.env.REACT_APP_APIURL}/api/settings/removethumb`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ removeThumb: 'true' })
        })
        .then(res => res.json())
        .then(data => {
            if (data.removeThumb.command === "UPDATE") {
                setNewThumb(null)
                return setResponse({ ...response, user_thumbnail: '/images/profilesThumbnails/defaultUserProfileThumbnail.png' })
            }
        });
    }

    const updateUserProfile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user_additional_name', refName.current.value);
        formData.append('user_description', refDesc.current.value);
        if (newThumb) formData.append('thumbnail', newThumb);

        fetch(`${process.env.REACT_APP_APIURL}/api/settings/updateprofile`, {
            method: 'PUT',
            credentials: 'include',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.msg === "UPDATE") return window.location.reload();
            return setInfo(data);
        })

    }


    return (
        user &&
            <div className="mb-2 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                <div className="relative bg-gray-800 h-32 sm:h-40 md:h-48 w-full rounded-t-xl">
                    <div className="absolute top-28 left-8 sm:top-20 sm:left-10 md:top-24 md:left-12 border-4 border-white rounded-full flex justify-center items-center">
                        {
                            (newThumb) ?
                                <img className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 object-cover rounded-full" src={`${URL.createObjectURL(newThumb)}`} alt="" /> :
                                <img className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 object-cover rounded-full" src={`${process.env.REACT_APP_APIURL}${response.user_thumbnail}`} alt="" />    
                        } 
                    </div>
                </div>
                <div className="bg-white rounded-b-xl border border-gray-400">
                    <div className="flex flex-col justify-end mt-4 mr-10 ml-48 gap-4 sm:flex-row sm:mt-6 sm:gap-6">
                        <button className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-gray-800 border border-gray-800 text-white hover:bg-slate-100 hover:text-gray-800 rounded-xl p-1 text-sm font-semibold sm:px-3 sm:text-lg">
                            <label className="relative cursor-pointer">
                                <p>Upload Photo</p>
                                <input 
                                    accept="images/*"
                                    type="file" 
                                    name="file" 
                                    id="file" 
                                    className="hidden"
                                    onChange={e => setNewThumb(e.target.files[0])}/>
                            </label>
                        </button>
                        <button className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-gray-800 border border-gray-800 text-white hover:bg-slate-100 hover:text-gray-800 rounded-xl p-1 text-sm font-semibold sm:px-3 sm:text-lg" onClick={(e) => removeThumbnail(e)}>
                            <p>Remove photo</p>
                        </button>
                    </div>
                    <h1 className="sm:mt-14 md:mt-16 mt-12 mx-10 text-2xl border-b border-gray-800">Public Profile</h1>
                    <div className="mt-2 ml-10">
                        <h1 className="font-bold text-xl text-black">{response.user_name}</h1>
                        <h1 className="font-medium text-base text-gray-700">@{response.user_additional_name}</h1>
                        <div className="mt-1 flex items-center justify-start">
                            <img className="h-6 w-6" src="https://img.icons8.com/ios/50/calendar--v1.png" alt="calendar--v1"/>
                            <h3 className="pl-2 font-medium text-base text-gray-700"> Joined On {`${(new Date(response.user_created_at).toDateString()).split(" ")[1]} ${(new Date(response.user_created_at).toDateString()).split(" ")[3]}`}</h3>
                        </div>
                    </div>
                        
                    <div className="mx-10 flex flex-col mt-4">
                        <label htmlFor="name" className="font-medium text-base text-gray-700 mb-1">Name</label>
                        <input 
                            ref={refName}
                            type="text"
                            className="bg-white border border-gray-800 rounded-xl p-2 focus:outline-none"
                            placeholder="Your name..."
                            />
                    </div>
                    <div className="mx-10 flex flex-col mt-4">
                        <label htmlFor="description" className="font-medium text-base text-gray-700 mb-1">Description</label>
                        <textarea 
                            ref={refDesc}
                            rows="8"
                            className="bg-white border border-gray-800 rounded-xl p-2 focus:outline-none"
                            placeholder="Write your account description..."
                            />
                    </div>
                    <label className="block mt-6 text-center text-sm text-red-800 "> { info && JSON.stringify(info) } </label> 
                    <div className="flex justify-end mx-10 mt-8">
                        <button className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-gray-800 border border-gray-800 text-white hover:bg-slate-100 hover:text-gray-800 rounded-xl px-2 p-1 text-sm font-semibold sm:px-3 sm:text-lg" onClick={e => updateUserProfile(e)}>
                            <p>Update Profile</p>
                        </button>
                    </div>
                    <MoreSettings/>
                </div>
            </div>  
    )
}