import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFeed } from "../utils/slices/feedSlice";

const Feed = () => {
  const feedData = useSelector((state) => state.feed.feedUsers);
  const dispatch = useDispatch();
  // const [feedData, setFeedData] = useState(null);
  const getFeedData = async () => {
    try {
      const data = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      // setFeedData(data.data.feedUsers);
      dispatch(addToFeed(data.data.feedUsers));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFeedData();
  }, []);

  return (
    <div className="flex flex-wrap justify-around gap-6 p-6">
      {feedData?.map((feed) => {
        return (
          <div
            className="relative bg-white w-80 h-[400px] shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
            key={feed._id}
          >
            <figure className="w-full h-3/5">
              <img
                src={feed.profilePicture}
                alt="user"
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="absolute bottom-0 w-full bg-white bg-opacity-90 p-4">
              <h2 className="text-xl font-bold text-gray-800">
                {feed.firstName + " " + feed.lastName}
              </h2>
              <p className="text-sm text-gray-600 mt-2">{feed.bio}</p>
              <div className="flex justify-between mt-4">
                <button className="btn btn-primary w-1/2 mr-2">
                  Interested
                </button>
                <button className="btn btn-secondary w-1/2">Ignore</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
