import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="bg h-screen flex justify-center items-center">
      <div className="py-10 px-12 bg-[#1B1B1B] flex rounded-lg flex-col items-center gap-6 shadow-lg font-[Montserrat] gradient-border">
        <Link to="/">
            <button className="border rounded-full border-white/40 p-3 hover:bg-white/10 transition duration-300 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="1.5rem" height="1.5rem" viewBox="0 0 48 48" className="invert">
                    <path d="M 23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656 L 8.859375 15.519531 C 7.0554772 16.941163 6 19.113506 6 21.410156 L 6 40.5 C 6 41.863594 7.1364058 43 8.5 43 L 18.5 43 C 19.863594 43 21 41.863594 21 40.5 L 21 30.5 C 21 30.204955 21.204955 30 21.5 30 L 26.5 30 C 26.795045 30 27 30.204955 27 30.5 L 27 40.5 C 27 41.863594 28.136406 43 29.5 43 L 39.5 43 C 40.863594 43 42 41.863594 42 40.5 L 42 21.410156 C 42 19.113506 40.944523 16.941163 39.140625 15.519531 L 24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.285156 17.876953 C 38.369258 18.731322 39 20.030807 39 21.410156 L 39 40 L 30 40 L 30 30.5 C 30 28.585045 28.414955 27 26.5 27 L 21.5 27 C 19.585045 27 18 28.585045 18 30.5 L 18 40 L 9 40 L 9 21.410156 C 9 20.030807 9.6307412 18.731322 10.714844 17.876953 L 24 7.4101562 z"></path>
                </svg>
            </button>
        </Link>
        <div className="flex flex-col gap-4 text-center">
            <h1 className="text-white text-5xl font-[Montserrat] font-bold text-nowrap">Welcome back!</h1>  
            <p className="text-white text-sm font-[Montserrat] text-nowrap">Sign in to continue to your dashboard</p>
        </div>
        <div className="w-full h-px bg-gray-700 mx-auto"></div>
        <div className="flex flex-col gap-4 items-center w-[90%]">
          <button className="text-white py-3 px-6 cursor-pointer border border-white/40 rounded-md flex flex-row justify-center items-center 
                       font-semibold w-full gap-2 hover:bg-white/10 transition duration-300">
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

          <button className="text-white py-3 px-6 cursor-pointer border border-white/40 rounded-md flex flex-row justify-center items-center 
                       font-semibold w-full gap-2 hover:bg-white/10 transition duration-300">
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
      </div>
    </div>
  );
};

export default Login;
