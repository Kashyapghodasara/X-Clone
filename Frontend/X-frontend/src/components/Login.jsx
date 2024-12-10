import React, { useState } from 'react'

const Login = () => {

  const [isLoggendIn, setLoggedIn] = useState(true)

  const SignupLoginHandler = () => {
    setLoggedIn(!isLoggendIn)
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
            <h2 className="text-3xl text-blue-200 font-bold mb-5">{isLoggendIn ? "LogIn" : "SignUp"}</h2>

            {/* Signup buttons */}
            <div className="space-y-4 w-full max-w-sm">


              <div className="flex items-center">
                <hr className="flex-grow border-gray-600" />
                <hr className="flex-grow border-gray-600" />
              </div>
              <div>
                <div className="ml-10 flex items-center justify-center">
                  {/* Form Container */}
                  <form className="flex flex-col space-y-4 mb-5 w-full max-w-md p-8 rounded-lg shadow-lg">
                    {/* Input 1 */}

                    {!isLoggendIn && (
                      <>
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="w-full py-3 px-4 border border-gray-600 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Username"
                          className="w-full py-3 px-4 border border-gray-600 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-full py-3 px-4 border border-gray-600 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          className="w-full py-3 px-4 border border-gray-600 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </>
                    )}
                    {isLoggendIn ? (
                      <>
                        <input
                          type="text"
                          placeholder="Username"
                          className="w-full py-3 px-4 border border-gray-600 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-full py-3 px-4 border border-gray-600 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          className="w-full py-3 px-4 border border-gray-600 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </>
                    ) : null}


                    {/* Submit Button */}
                    <button className="items-center w-[60%] ml-12 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                      {isLoggendIn ? "Log In" : "Register"}
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
              {isLoggendIn ? "Don't Have an Account ? " : "Already Have an Account ? "}{" "}
              <button onClick={SignupLoginHandler} className="text-blue-400 hover:underline">
                {isLoggendIn ? "Sign Up" : "Log In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login