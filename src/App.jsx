import { Route, Routes } from "react-router";

import { Signin } from "./pages/Signin/Signin";
import { Signup } from "./pages/Signup/Signup";
import { Home } from "./pages/Home/Home";
import { Page404 } from "./pages/404";
import { Post } from "./pages/Post/Post";

import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Logout = () => {    
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${process.env.REACT_APP_APIURL}/api/auth/signout`, { method: 'POST', credentials: 'include'})
            .then(res => res.json())
            .then(d => {
                console.log(d)
                return navigate('/home')
            });     
    }, [navigate])
    return (
        <h1>Logout</h1>
    )
}



export default function App(){
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                
                <Route path="/" element={<Home/>} />
                <Route path="/home" element={<Home/>} />

                <Route path="/signin" element={<Signin/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/logout" element={<Logout/>} />

                <Route path="/post/:postId" element={<Post/>} />

                <Route path="*" element={<Page404/>} />
            </Routes>
        </QueryClientProvider>
    )
}