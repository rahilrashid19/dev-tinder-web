import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUsers } from "../../utils/slices/userSlice";
import { BASE_URL } from "../../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = useForm();
  const { errors, isDirty } = formState;

  const submitForm = async (values) => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUsers(res.data.user));
      if (res && res.data) {
        setLoginSuccessful(true);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // Navigate to /feed when loginSuccessful becomes true
  useEffect(() => {
    if (loginSuccessful) {
      navigate("/feed");
    }
  }, [loginSuccessful, navigate]);

  return (
    <>
      {!loginSuccessful && (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="card w-96 shadow-xl rounded-lg bg-base-300">
            <div className="card-body p-6">
              <h2 className="text-2xl font-semibold text-center mb-4 text-white">
                Login
              </h2>
              <form
                className="space-y-4"
                onSubmit={handleSubmit(submitForm)}
                noValidate
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    id="email"
                    placeholder="Please enter your email"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid Email",
                      },
                    })}
                  />
                  <p className="text-red-500 text-xs mt-1">
                    {errors?.email?.message}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Invalid Password",
                      },
                    })}
                  />
                  <p className="text-red-500 text-xs mt-1">
                    {errors?.password?.message}
                  </p>
                </div>
                <div>
                  <button
                    type="submit"
                    className={`w-full px-4 py-2 text-white rounded-md 
    ${
      !isDirty
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
    }`}
                    disabled={!isDirty}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
