import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Requests = () => {
  const [requests, setRequests] = useState(null);
  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/requests", {
        withCredentials: true,
      });
      setRequests(res.data.users);
    } catch (error) {
      console.log(error.message);
    }
  };

  const reviewRequests = async (status, id) => {
    try {
      const response = await axios.post(
        BASE_URL + "/reviewRequest" + "/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      if (response) {
        const newRequestData = requests.filter((req) => req._id !== id);
        setRequests(newRequestData);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) {
    return <h1>No Requests Found</h1>;
  }

  return (
    <>
      <h1 className="text-blue-500 font-bold text-2xl text-center">
        Requests Received
      </h1>
      <div className="flex mt-10 p-4">
        {requests &&
          requests.map((req) => {
            return (
              <div
                className="card text-neutral-reqtent w-96 flex justify-between"
                key={req._id}
              >
                <div className="max-w-sm mx-auto p-4 bg-white shadow-lg rounded-lg transform transition duration-500 hover:scale-105">
                  <div className="card-body flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-4">
                      <img
                        src={req.fromUserId.profilePicture}
                        alt={`${req.fromUserId.firstName}'s profile`}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {req.fromUserId.firstName} {req.fromUserId.lastName}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {req.fromUserId.gender}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {req.fromUserId.bio}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {req.fromUserId.age} years old
                    </p>
                    <div className="flex space-x-4 mt-4">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => reviewRequests("accepted", req._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => reviewRequests("rejected", req._id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Requests;
