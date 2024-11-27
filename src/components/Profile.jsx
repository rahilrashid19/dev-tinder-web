import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const loggedInUser = useSelector((state) => state.user);
  const user = loggedInUser;

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-8 p-6">
      {/* Profile Card */}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
        {/* Profile Picture */}
        <div className="w-full h-64 lg:h-auto lg:w-1/3 overflow-hidden">
          <img
            src={user.profilePicture || "/default-avatar.png"}
            alt={`${user.firstName} ${user.lastName}`}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Profile Details */}
        <div className="p-6 flex flex-col justify-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {user.firstName} {user.lastName}, {user.age}
          </h2>
          <p className="text-gray-600">
            {user.bio || "This user has not added a bio yet."}
          </p>
          <p className="text-gray-600">{user.gender}</p>
        </div>
      </div>

      {/* Edit Profile Section */}
      {loggedInUser && (
        <div className="w-full max-w-lg">
          <EditProfile user={loggedInUser} />
        </div>
      )}
    </div>
  );
};

export default Profile;
