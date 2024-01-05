import { useContext, useState } from "react";
import { UserContext } from "./Loyout";
import { Modal } from "./Modal";
import { useQuery } from "react-query";

export const UpdateCardUser = () => {
    const userObj = useContext(UserContext);

    const [user, setUser] = useState(userObj?.data?.user_name ? `${userObj.data.user_name}` : '');

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProfile'],
        queryFn: () => fetch(`${process.env.REACT_APP_APIURL}/api/user/profile/${user}`, { method: 'GET', credentials: 'include' }).then(res => res.json())
    })

    if (data?.msg === "Access Denied.") return <Modal/>
    if (isLoading) return <h1 className="flex justify-center items-center">Loading ...</h1>
    if (isError) return alert(isError);


    return (
        <div className="mb-2 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <div className="relative bg-gray-800 h-24 sm:h-32 md:h-40 w-full rounded-t-xl">
                <div className="absolute top-12 left-6 sm:top-16 sm:left-8 md:top-20 md:left-10 border-4 border-white rounded-full flex justify-center items-center">
                    <img className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 object-cover rounded-full" src={`${process.env.REACT_APP_APIURL}${data.infos.user_thumbnail}`} alt="" />
                </div> 
            </div>
            Edit Profile.
            {JSON.stringify(data)}
        </div>
    )
}