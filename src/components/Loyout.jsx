import { createContext } from "react";
import { Navbar } from "./Navbar";
import { useQuery } from "react-query";

export const UserContext = createContext()

export const Loyout = ({ children }) => {
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ["userAuthStatus"],
        queryFn: () => fetch(`${process.env.REACT_APP_APIURL}/api/user/profile`, { method: 'GET', credentials: 'include' }).then(res => res.json())
    })
    if ( isLoading ) return <h1>Loading...</h1> 
    if ( isError ) return alert(isError);

    return (
        <UserContext.Provider value = {{data, isLoading, isError }}>
            <Navbar />
            { children }
        </UserContext.Provider>  
    )
}