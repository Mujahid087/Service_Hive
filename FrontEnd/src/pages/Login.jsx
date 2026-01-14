import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlices";
import Loading from "../components/Loading";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result.user));
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);
// bg-gray-50 dark:bg-gray-900
  return (
    <section className=" min-h-screen">  
      <ToastContainer />

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {/* Logo */}
        {/* <div className="flex items-center mb-6 text-2xl font-semibold textbg-gray-50 dark:bg-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Service Hive
        </div> */}

        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-50 bg-gray-700 dark:bg-gray-900 dark:text-white p-2 rounded">
  <img
    className="w-8 h-8 mr-2"
    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
    alt="logo"
  />
  Service Hive
</div>


        {/* Card */}
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            <form
              onSubmit={handleSubmit(submitHandler)}
              className="space-y-4 md:space-y-6"
            >
              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <span className="text-sm font-medium text-primary-600 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>

              {/* Button */}
              {isLoading ? (
                <Loading />
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
              )}

              {/* Register link */}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="font-medium text-primary-600 hover:underline cursor-pointer"
                >
                  Sign up
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
