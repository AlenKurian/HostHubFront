import React, { useState } from "react";
import { FiMail, FiLock, FiUser, FiUsers, FiBriefcase, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import log from "../assets/log.jpg";
import Iridescence from "../components/Iridescence";
import { googleLoginUserAPI, loginUserAPI, RegisterUserAPI } from "../services/allAPIs";
import { Bounce, ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


function Auth({ register }) {
    console.log(register);

    // state to hold user data
    const [userData, setUserData] = useState({ 'username': '', 'email': '', 'password': '', 'role': 'user' });

    const [token,setToken] = useState('')
    const [role, setRole] = useState("user");

    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
        setUserData({ ...userData, role: selectedRole });
    }

    const navigate = useNavigate();

    const handleRegister = async () => {
        console.log(userData);
        if (!userData.username || !userData.email || !userData.password) {
            alert('please fill the fields');
        }
        else {
            // call register api
            try {
                const response = await RegisterUserAPI(userData);
                console.log(response);
                if (response.status === 200 || response.status === 201) {
                    setIsLogin(true)
                    toast.success("Registration successful. Please login")
                } else {
                    alert("Registration Failed! ");
                    console.log(response.response.data.message);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    const handleLogin = async () => {
        console.log(userData);
        const {email, password} = userData
        if (email == '' || password == '') {
            toast('please fill the form')
        }
        else {
            try {
                const response = await loginUserAPI({ email, password})
                console.log(response);
                if (response.status == 200) {
                    const newToken = response.data.token
                    setToken(newToken)
                    sessionStorage.setItem("token", newToken)
                    
                    sessionStorage.setItem('userDetails', JSON.stringify(response.data.existingUser
                    ))
                    toast.success(response.data.message)
                }
                if (response.status == 200) {
                    
                    if (response.data.existingUser.role == "admin") {
                        setTimeout(() => {
                            navigate('/admin')
                        }, 2000)
                    }
                    else if (response.data.existingUser.role == 'user'){
                        setTimeout(() => {
                            navigate('/user-home')
                        }, 2000);
                    }
                    else if (response.data.existingUser.role == 'organizer'){
                        setTimeout(() => {
                            navigate('/organizer')
                        }, 2000);
                    }
                } else {
                    alert(response.response.data)
                }
                console.log(response.data)
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    const [isLogin, setIsLogin] = useState(true);

    const handleGoogleLogin = async (credentialResponse) => {
        console.log(credentialResponse);
        console.log("inside google login");
        const decode = jwtDecode(credentialResponse.credential)
        console.log(decode);
        try {
            const response = await googleLoginUserAPI({ username: decode.name, email: decode.email, password: 'googlepswd', photo: decode.picture, role: userData.role })
            console.log(response);
            if (response.status == 200) {

                const newToken = response.data.token;
                setToken(newToken)

                sessionStorage.setItem("token", newToken)
                console.log(response);

                sessionStorage.setItem('userDetails', JSON.stringify(response.data.existingUser
                ))

                console.log("Token set to sessionstorage", newToken);
                setTimeout(() => {
                    const role = response.data.existingUser.role;

                    if (role === "organizer") navigate("/organizer");
                    else navigate("/user-home");
                }, 1500);
            }
            else {
                toast.error(response.response.data, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }

        }
        catch (err) {
            console.log(err);
        }

    }

    return (
        <div className="relative min-h-screen overflow-hidden">

            <div className="absolute inset-0 -z-10">
                <Iridescence
                    color={[1, 1, 1]}
                    mouseReact={false}
                    amplitude={0.1}
                    speed={1.0}
                />
            </div>

            <div className="absolute inset-0 bg-black/10 -z-10"></div>

            <div className="min-h-screen flex items-center justify-center px-4">
                <div
                    className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2
          bg-black/50 backdrop-blur-4xl border border-white/20
          rounded-3xl shadow-2xl overflow-hidden"
                >
                    <div className="hidden md:flex items-center justify-center p-10">
                        <img
                            src={log}
                            alt="Auth Visual"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>

                    <div className="p-10 sm:p-14 flex flex-col justify-center">
                        <h1 className="text-3xl text-center text-white font-bold mb-2">
                            {isLogin ? "Log in to your account" : "Create your account"}
                        </h1>

                        <p className="text-white text-center mb-8">
                            {isLogin
                                ? "Welcome back! Please enter your details."
                                : "Join HostHub and start managing events."}
                        </p>

                        <div className="flex gap-3 mb-6">
                            <button
                                onClick={() => handleRoleChange("user")}
                                className={`flex-1 py-2 rounded-lg border transition ${role === "user"
                                        ? "bg-black text-white border-black"
                                        : "bg-white/10 text-blue-950 border-white/30 hover:bg-white/20"
                                    }`}
                            >
                                <FiUsers className="inline mr-2" />
                                User
                            </button>

                            <button
                                onClick={() => handleRoleChange("organizer")}
                                className={`flex-1 py-2 rounded-lg border transition ${role === "organizer"
                                        ? "bg-black text-white border-black"
                                        : "bg-white/10 text-blue-950 border-white/30 hover:bg-white/20"
                                    }`}
                            >
                                <FiBriefcase className="inline mr-2" />
                                Organizer
                            </button>
                        </div>

                        <ToastContainer
                            position="top-center"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick={false}
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                            transition={Bounce}
                        />

                        <form className="space-y-5">
                            {!isLogin && (
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                                    <input
                                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                        id="name"
                                        type="text"
                                        placeholder="Full Name"
                                        className="glass-input"
                                    />
                                </div>
                            )}

                            <div className="relative">
                                <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                                <input 
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    id="email"
                                    type="email"
                                    placeholder="Email address"
                                    className="glass-input"
                                />
                            </div>

                            <div className="relative">
                                <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                                <input
                                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    className="glass-input"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={isLogin ? handleLogin : handleRegister}
                                className="w-full py-3 bg-black text-white rounded-lg
             flex items-center justify-center gap-2
             hover:bg-gray-900 transition"
                            >
                                {isLogin ? "Log In" : "Sign Up"}
                                <FiArrowRight />
                            </button>

                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                    handleGoogleLogin(credentialResponse)
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />;

                        </form>

                        <p className="text-center text-white mt-6">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-blue-300 font-medium ml-2 hover:underline"
                            >
                                {isLogin ? "Sign up" : "Log in"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
