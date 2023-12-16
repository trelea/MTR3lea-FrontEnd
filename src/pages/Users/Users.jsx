import { Loyout } from "../../components/Loyout";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Page404 } from "../404";
import { Modal } from "../../components/Modal";
import { Home } from "../Home/Home";

export const Users = () => {
    const user = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: 'fetchUser',
        queryFn: () => fetch(`${process.env.REACT_APP_APIURL}/api/user/profile/${user.userName}`, { method: 'GET', credentials: 'include' }).then(res => res.json())
    })

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
            <div className="pt-20">
                {JSON.stringify(data)}
            </div>
            
        </Loyout>
    )
}