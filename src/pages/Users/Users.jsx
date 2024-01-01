import { Loyout } from "../../components/Loyout";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Page404 } from "../404";
import { Modal } from "../../components/Modal";
import { Home } from "../Home/Home";
import { CardPost } from "../../components/CardPost";
import { CardUser } from "../../components/CardUser";

export const Users = () => {
    const user = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: 'fetchUser',
        queryFn: () => fetch(`${process.env.REACT_APP_APIURL}/api/user/profile/${user.userName}`, { method: 'GET', credentials: 'include' }).then(res => res.json())
    });

    if ( isLoading ) return <h1 className="flex justify-center items-center">Loading ...</h1>
    if ( isError ) return alert(isError);

    if ( data.msg === "Invalid User") return (
        <Loyout>
            <Page404 />
        </Loyout>
    )

    if ( data.msg === "Access Denied.") return (
        <Loyout>
            <Home />
            <Modal />
        </Loyout>
    )

    return (
        <Loyout>
            <div className="bg-slate-100 pt-20 flex flex-col items-center w-screen p-2">
                <div className="flex flex-col gap-2 w-full sm:w-[95%] md:w-[80%] lg:w-[65%] xl:w-[50%] 2xl:w-[40%] min-h-screen">
                    <CardUser userInfo={data.infos} posts={data.posts}/>
                    <div className="flex flex-col gap-2">
                        {data.posts.map((post) => {
                            return <CardPost key={post.post_id} post={post} postOptions={false}/> 
                        })}
                    </div>
                </div>         
            </div>
        </Loyout>
    )
}