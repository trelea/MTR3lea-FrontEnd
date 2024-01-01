import { useEffect, useState, useContext } from "react";
import { UserContext } from "./Loyout";

export const CardUser = ({ userInfo, posts }) => {
    const [likes, setLikes] = useState(0);
    const { data } = useContext(UserContext);

    useEffect(() => {
        posts.map(p => setLikes(l => l + p.post_likes.length));
    }, [posts]);

    return (

            <div className="mb-2 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                <div className="relative bg-gray-800 h-24 sm:h-32 md:h-40 w-full rounded-t-xl">
                    <div className="absolute top-12 left-6 sm:top-16 sm:left-8 md:top-20 md:left-10 border-4 border-white rounded-full flex justify-center items-center">
                        <img className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 object-cover rounded-full" src={`${userInfo.user_thumbnail}`} alt="" />
                    </div> 
                </div>
                <div className="bg-white rounded-b-xl border border-gray-400">
                    {
                        (data.user_name === userInfo.user_name) && 
                            <div className="flex justify-end items-center p-4 sm:p-6 md:p-10">
                                <button className="bg-gray-800 border border-gray-800 text-white rounded-3xl font-semibold p-1 px-4 hover:bg-white hover:text-gray-800">Edit Profile</button>
                            </div>
                    }
                    <div className={(data.user_name === userInfo.user_name) ? "pl-6 sm:pl-8 md:pl-10" : "pt-16 sm:pt-20 md:pt-24 pl-6 sm:pl-8 md:pl-10"}>
                        <h1 className="font-bold text-2xl text-black">{userInfo.user_additional_name}</h1>
                        <h3 className="font-medium text-base text-gray-700">@{userInfo.user_name}</h3>
                    </div>

                    <div className="px-6 sm:px-8 md:px-10 mt-4 font-normal">
                        <p>{userInfo.user_description}</p>
                    </div>

                    <div className="pl-6 sm:pl-8 md:pl-10 mt-4 flex items-center justify-start">
                        <img className="h-6 w-6" src="https://img.icons8.com/ios/50/calendar--v1.png" alt="calendar--v1"/>
                        <h3 className="pl-2 font-medium text-base text-gray-700"> Joined On {`${(new Date(userInfo.user_created_at).toDateString()).split(" ")[1]} ${(new Date(userInfo.user_created_at).toDateString()).split(" ")[3]}`}</h3>
                    </div>

                    <div className="pl-6 sm:pl-8 md:pl-10 mt-4 flex items-center justify-start gap-4 pb-4 text-black font-semibold text-base">
                        <h1>Posts {posts.length}</h1>
                        <h1>Likes {likes}</h1>
                    </div>
                </div>
            </div>
    )
}