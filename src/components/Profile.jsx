import { useSelector } from "react-redux";

const Profile = () => {
  const loggedInUser = useSelector((state) => state.user);

  const user = loggedInUser;

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="card card-side bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden">
        {/* Profile Picture */}
        <figure className="w-1/3">
          <img
            src={user.profilePicture || "/default-avatar.png"}
            alt={`${user.firstName} ${user.lastName}`}
            className="object-cover w-full h-full"
          />
        </figure>

        {/* Profile Details */}
        <div className="card-body w-2/3 p-6 flex flex-col justify-center">
          <h2 className="card-title text-2xl font-bold text-gray-800">
            {user.firstName + " " + user.lastName}
          </h2>
          <p className="text-gray-600 mt-2">
            {user.bio || "This user has not added a bio yet."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
