"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import events from 'events';
events.defaultMaxListeners = 20;



export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            // toast.success("Login success");
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "You have successfully logged in!",
                confirmButtonText: 'OK',
                confirmButtonColor: 'rgb(34 197 94',
              });
              localStorage.setItem("userEmail", user.email);
            router.push("/Dashboard");


        } catch (error:any) {
            console.log("Login failed", error.message);
            if(user.email =="" && user.password ==""){
                Swal.fire({
                    icon: "error",
                    title: "Log in fail",
                    text: "Please enter email or password!",
                    confirmButtonText: 'OK',
                    confirmButtonColor: 'rgb(34 197 94',
                  });
            }
            else{

                
                Swal.fire({
                    icon: "error",
                title: "Log in fail",
                text: "You have entered wrong email or password!",
            });
        }
            // toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className='w-[100vw] bg-gray-50 h-[100vh] flex justify-center items-center'>
        <div className='bg-white w-[30%] border-2 border-white shadow-2xl p-9 rounded-lg'> 
        <h1 className='text-center text-2xl pb-5 font-medium'>
        Welcome Back
        </h1>
        {/* <br/> */}
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
            className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black w-full py-3"
        />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password " value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black w-full py-3"
        />
        {/* <button onClick={onSignup}>{buttonisabled ? "No signup" :"Sign up"}</button> */}
        <br/>
        <p className='text-center text-lg'>Create new account?<span className='text-green-500'><Link href="/"> Sign Up</Link></span></p>

            <button
         onClick={onLogin}
        className="bg-green-500 p-3 font-bold text-white border-2 border-green-500 shadow-lg rounded-[4px] text-xl w-full mt-4">Login here</button>
        </div>
        </div>
    
    )

}