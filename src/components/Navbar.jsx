import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile", { state: user });
  };

  return (
    <div className="navbar bg-base-300 fixed t-0">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">👨‍💻 Dev Tinder</a>
      </div>
      {user?.firstName && user?.lastName && (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end mx-8">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost flex items-center gap-x-2"
            >
              {/* User name */}
              <p className="text-white text-sm font-extralight mr-4">
                Welcome , {user.firstName + " " + user.lastName}
              </p>

              {/* Profile picture */}
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                <img
                  alt="User Profile"
                  className="object-cover w-full h-full"
                  src={user.profilePicture || "/default-avatar.png"} // Fallback for profile picture
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between" onClick={goToProfile}>
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
