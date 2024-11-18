import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Feed = () => {
  const [feedData, setFeedData] = useState(null);
  const getFeedData = async () => {
    try {
      const data = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      setFeedData(data.data.feedUsers);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFeedData();
  }, []);

  return (
    <div className="flex">
      {feedData?.map((feed) => {
        return (
          <div className="max-w-lg mx-auto mt-10" key={feed._id}>
            <div className="card card-side bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden">
              {/* Profile Picture */}
              <figure className="w-1/3">
                <img
                  src={feed.profilePicture || "/default-avatar.png"}
                  alt={`${feed.firstName} ${feed.lastName}`}
                  className="object-cover w-full h-full"
                />
              </figure>

              {/* Profile Details */}
              <div className="card-body w-2/3 p-6 flex flex-col justify-center">
                <h2 className="card-title text-2xl font-bold text-gray-800">
                  {feed.firstName + " " + feed.lastName}
                </h2>
                <p className="text-gray-600 mt-2">
                  {feed.bio || "This user has not added a bio yet."}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
