import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginWithGoogle, user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/userpanel");
    }
  }, [loading, navigate, user]);

  const handleGoogleAuth = async () => {
    setError("");
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err?.message ?? "Unable to authenticate with Google.");
    }
  };
  return (
    <div className="bg h-screen flex justify-center items-center">
      <div className="py-10 px-12 bg-[#1B1B1B] flex rounded-lg flex-col items-center gap-6 shadow-lg montserrat gradient-border">
        <Link to="/">
            <button className="border border-white/40 py-3 px-8 bg-white/10 hover:bg-white/40 transition duration-300 cursor-pointer text-white flex flex-row 
            items-center justify-center gap-2">
                Return Home 
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                </svg>
            </button>
        </Link>
        <div className="flex flex-col gap-4 text-center">
            <h1 className="text-white text-5xl montserrat font-bold text-nowrap">Welcome back!</h1>  
            <p className="text-white text-sm montserrat text-nowrap">Sign in to continue to your dashboard</p>
        </div>
        <div className="w-full h-px bg-gray-700 mx-auto"></div>
        <div className="flex flex-col gap-4 items-center w-[90%]">
          <button
            className="text-white py-3 px-6 cursor-pointer border border-white/40 rounded-md flex flex-row justify-center items-center 
            font-normal w-full gap-2 hover:bg-white/10 transition duration-300"
            onClick={handleGoogleAuth}
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 48 48">   
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8
                   c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12
                   c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                   C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                   c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20
                   C44,22.659,43.862,21.35,43.611,20.083z"></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12
                   c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                   C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238
                   C29.211,35.091,26.715,36,24,36
                   c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025
                   C9.505,39.556,16.227,44,24,44z"></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303
                   c-0.792,2.237-2.231,4.166-4.087,5.571
                   l6.19,5.238C36.971,39.205,44,34,44,24
                   C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            Login with Google
          </button>

          <span className="text-white">or</span>

          <button
            className="text-white py-3 px-6 cursor-pointer border border-white/40 rounded-md flex flex-row justify-center items-center 
            font-normal w-full gap-2 hover:bg-white/10 transition duration-300"
            onClick={handleGoogleAuth}
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303
                   c-1.649,4.657-6.08,8-11.303,8
                   c-6.627,0-12-5.373-12-12
                   c0-6.627,5.373-12,12-12
                   c3.059,0,5.842,1.154,7.961,3.039
                   l5.657-5.657C34.046,6.053,29.268,4,24,4
                   C12.955,4,4,12.955,4,24
                   c0,11.045,8.955,20,20,20
                   c11.045,0,20-8.955,20-20
                   C44,22.659,43.862,21.35,43.611,20.083z"></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819
                   C14.655,15.108,18.961,12,24,12
                   c3.059,0,5.842,1.154,7.961,3.039
                   l5.657-5.657C34.046,6.053,29.268,4,24,4
                   C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192
                   l-6.19-5.238C29.211,35.091,26.715,36,24,36
                   c-5.202,0-9.619-3.317-11.283-7.946
                   l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303
                   c-0.792,2.237-2.231,4.166-4.087,5.571
                   l6.19,5.238C36.971,39.205,44,34,44,24
                   C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            Signup with Google
          </button>
  </div>
  {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
