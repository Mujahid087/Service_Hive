import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlices";
import Loading from "../components/Loading";

const Signup = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [registerUser, { isLoading }] = useRegisterMutation();

  const submitHandler = async (data) => {
    try {
      const result = await registerUser(data).unwrap();
      dispatch(setCredentials(result));
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <section className=" min-h-screen">
      <ToastContainer />

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Service Hive
        </div>

        <div className="w-full bg-white rounded-lg shadow sm:max-w-md dark:bg-gray-800">
          <div className="p-6 space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Create your account
            </h1>

            <form
              onSubmit={handleSubmit(submitHandler)}
              className="space-y-4"
            >
              {/* Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {isLoading ? (
                <Loading />
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Sign up
                </button>
              )}

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-primary-600 hover:underline cursor-pointer"
                >
                  Login
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
