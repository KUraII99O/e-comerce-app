import { Link } from "react-router-dom";
import { Popover } from "@headlessui/react";
import { useAuth } from "../UserContext";

const HomeNav = () => {
  const { user } = useAuth(); // Get the user from context
  const isLoggedIn = Boolean(user); // Check if user is logged in

  // Function to generate profile image based on username
  const generateProfileImage = (username: string): string => {
    if (!username || username.trim().length === 0) {
      return "default_profile_image_url";
    }
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.floor(
      Math.abs(Math.sin(hash) * 16777215) % 16777215
    ).toString(16);
    const initials = username.substring(0, 1).toUpperCase();
    return `https://ui-avatars.com/api/?background=${color}&color=fff&name=${encodeURIComponent(
      initials
    )}`;
  };

  // Handle user sign out
  const handleSignOut = () => {
    localStorage.removeItem("loggedInUser"); // Clear user data from localStorage
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="ml-auto flex items-center">
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
        {isLoggedIn ? (
          <>
            {/* Your Stores link outside of popover */}
            <Link
              to="/admin/ecommerce/stores"
              className="text-sm font-semibold text-blue-600 bg-blue-100 px-4 py-2 rounded-md hover:bg-blue-200 hover:text-blue-700 transition"
            >
              Become a seller
            </Link>
            <span aria-hidden="true" className="h-6 w-px bg-gray-300 mx-4" />

            {/* Profile Popover */}
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  {/* Show either the user's profile image or a generated avatar */}
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt="Profile"
                      className="rounded-full h-8 w-8 "
                    />
                  ) : (
                    <img
                      src={generateProfileImage(user?.username || "")}
                      alt="Generated Profile"
                      className="rounded-full h-8 w-8 "
                    />
                  )}
                </div>
              </Popover.Button>

              <Popover.Panel className="absolute right-0 z-10 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="p-4 space-y-2">
                  <Link
                    to="/profile"
                    className="block text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut} // Attach handleSignOut to Logout button
                    className="block w-full text-left text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Logout
                  </button>
                </div>
              </Popover.Panel>
            </Popover>
          </>
        ) : (
          <>
            {/* Sign in / Create account links */}
            <Link
              to="/login"
              className="text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              Sign in
            </Link>
            <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
            <Link
              to="/signup"
              className="text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              Create account
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeNav;
