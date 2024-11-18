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
          <div className="card bg-base-100 w-96 shadow-xl" key={feed._id}>
            <figure>
              <img src={feed.profilePicture} alt="user" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{feed.firstName + feed.lasName}</h2>
              <p>{feed.bio}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Interested</button>
                <button className="btn btn-primary">Ignore</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
