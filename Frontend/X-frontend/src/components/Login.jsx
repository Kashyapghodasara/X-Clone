import React, { useState } from 'react'
import axios from 'axios'
import Toast from "react-hot-toast"
import { USER_API_ENDPOINT } from '../utils/constant'
import { useDispatch } from "react-redux"
import { getUser } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'



const Login = () => {

  const [isLoggedIn, setLoggedIn] = useState(true)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const SignupLoginHandler = () => {
    setLoggedIn(!isLoggedIn)
  }

  const loginSignupHandler = async (e) => {
    // Unverified
    if (!isLoggedIn) {
      // Signup
      try {
        e.preventDefault();
        const res = await axios.post(
          `${USER_API_ENDPOINT}/register`
          , // Concatenate endpoint string
          { name, username, email, password }, // Request body - req.body
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // Include credentials like cookies
          },
        );
        if (res.data.success === false) {
          Toast.error(res.data.message)
        } else {
          console.log(res.data.message)
          Toast.success("Signup Successful")
          setLoggedIn(true)
        }
      } catch (error) {
        Toast.error("Signup Error", error.response.data.message) || Toast.error("Signup Error", error)
      }
    } else {
      // Login
      try {
        e.preventDefault();
        const res = await axios.post(
          `${USER_API_ENDPOINT}/login`, { username, email, password }, // Request body - req.body
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // Include credentials like cookies
          });
          dispatch(getUser(res?.data?.findUser))

        if (res.data.success) {
          console.log(res)
          navigate("/")
          Toast.success(res.data.message)
        } else {
          Toast.error(res.data.message)
        }
      } catch (error) {
        Toast.error("Login Error", error.response.data.message)
      }
    }
  }


  return (
    <div>
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        {/* Container */}
        <div className="flex flex-row items-center justify-center space-x-10 max-w-6xl">
          {/* Left Section - Logo */}
          <img className="w-[350px] h-[380px] mr-12" src='https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-white-icon.png' alt="X-logo" />

          {/* Right Section - Form */}
          <div className="flex flex-col items-center mb-5">
            {/* Title */}
            <h1 className="text-4xl font-bold mb-5 ">Happening now</h1>

            {/* Subtitle */}
            <h2 className="text-3xl text-blue-200 font-bold mb-5">{isLoggedIn ? "LogIn" : "SignUp"}</h2>

            {/* Signup buttons */}
            <div className="space-y-4 w-full max-w-sm">


              <div className="flex items-center">
                <hr className="flex-grow border-gray-600" />
                <hr className="flex-grow border-gray-600" />
              </div>
              <div>
                <div className="ml-10 flex items-center justify-center">
                  {/* Form Container */}
                  <form
                    className="flex flex-col space-y-4 mb-5 w-full max-w-md p-8 rounded-lg shadow-lg"
                    onSubmit={loginSignupHandler}
                  >


                    {!isLoggedIn && (
                      <>
                        <input
                          type="text"
                          value={name}
                          placeholder="Full Name"
                          onChange={(e) => setName(e.target.value)}
                          className="w-full py-3 px-4 border border-gray-600 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full py-3 px-4 border border-gray-600 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full py-3 px-4 border border-gray-600 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full py-3 px-4 border border-gray-600 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </>
                    )}
                    {isLoggedIn ? (
                      <>
                        <input
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full py-3 px-4 border border-gray-600 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full py-3 px-4 border border-gray-600 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full py-3 px-4 border border-gray-600 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </>
                    ) : null}


                    {/* Submit Button */}
                    <button className="items-center w-[60%] ml-12 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                      {isLoggedIn ? "Log In" : "Register"}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-400 max-w-sm mb-5 text-center">
              By signing up, you agree to the Terms of Service and Privacy Policy,
              including Cookie Use.
            </p>

            {/* Sign in */}
            <div className="text-sm">
              {isLoggedIn ? "Don't Have an Account ? " : "Already Have an Account ? "}{" "}
              <button onClick={SignupLoginHandler} className="text-blue-400 hover:underline">
                {isLoggedIn ? "Sign Up" : "Log In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login