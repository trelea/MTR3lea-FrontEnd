import { Route, Routes } from "react-router";

import { Signin } from "./pages/Signin/Signin";
import { Signup } from "./pages/Signup/Signup";
import { Home } from "./pages/Home/Home";
import { Page404 } from "./pages/404";
import { Post } from "./pages/Post/Post";
import { Users } from "./pages/Users/Users";
import { Profile } from "./pages/Profile/Profile";
import { ResetPswd } from "./pages/ResetPswd/ResetPswd";

import { QueryClient, QueryClientProvider } from "react-query";

export default function App(){
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                
                <Route path="/" element={<Home/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/index" element={<Home/>} />

                <Route path="/signin" element={<Signin/>} />
                <Route path="/signup" element={<Signup/>} />

                <Route path="/post/:postId" element={<Post/>} />
                <Route path="/user/:userName" element={<Users/>} />

                <Route path="/accounts/profile/settings" element={<Profile/>} />
                <Route path="/accounts/password/reset" element={<ResetPswd/>} />
            
                <Route path="*" element={<Page404/>} />

            </Routes>
        </QueryClientProvider>
    )
}