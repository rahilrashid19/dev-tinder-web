import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUsers } from "../utils/slices/userSlice";
/* eslint-disable react/prop-types */
const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, reset } = useForm();

  const { errors } = formState;

  const submitForm = async (values) => {
    try {
      const res = await axios.patch(
        BASE_URL + "/editProfile",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      if (res) {
        dispatch(addUsers(res.data.loggedInUser));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Reset form when user data changes
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        gender: user.gender || "",
        age: user.age || "",
        bio: user.bio || "",
        profilePicture: user.profilePicture || "",
      });
    }
  }, [user, reset]);

  return (
    <div>
      <form noValidate onSubmit={handleSubmit(submitForm)}>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="card w-96 shadow-xl rounded-lg bg-base-300">
            <div className="card-body p-6">
              <h2 className="text-2xl font-semibold text-center mb-4 text-white">
                Edit Profile
              </h2>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  id="firstName"
                  placeholder="Please enter your first name"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "Invalid first name",
                    },
                  })}
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors?.firstName?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "Invalid last name",
                    },
                  })}
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors?.lastName?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-white"
                >
                  Gender
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  id="gender"
                  placeholder="Please enter your gender"
                  {...register("gender", {
                    required: {
                      value: true,
                      message: "Invalid gender",
                    },
                  })}
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors?.gender?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-white"
                >
                  Age
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  id="age"
                  placeholder="Please enter your age"
                  {...register("age", {
                    required: {
                      value: true,
                      message: "Invalid age",
                    },
                  })}
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors?.age?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="profilePicture"
                  className="block text-sm font-medium text-white"
                >
                  Profile Picture
                </label>
                <input
                  type="text"
                  id="profilePicture"
                  placeholder="Enter your profile picture"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("profilePicture", {
                    required: {
                      value: true,
                      message: "Invalid profile picture",
                    },
                  })}
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors?.profilePicture?.message}
                </p>
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-white"
                >
                  Bio
                </label>
                <input
                  type="text"
                  id="bio"
                  placeholder="Enter your bio"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("bio", {
                    required: {
                      value: true,
                      message: "Invalid bio",
                    },
                  })}
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors?.bio?.message}
                </p>
              </div>
              <button
                type="submit"
                className={`w-full px-4 py-2 text-white rounded-md bg-amber-500`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
