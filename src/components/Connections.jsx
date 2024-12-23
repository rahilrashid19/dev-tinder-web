import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Connections = () => {
  const userId = useSelector((state) => state.user._id);
  console.log(userId);
  const [connections, setConnections] = useState(null);
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/connections", {
        withCredentials: true,
      });

      const conn = res.data.connections.flatMap((connection) => [
        connection.toUserId,
        connection.fromUserId,
      ]);

      const filteredConnections = conn.filter(
        (connection) => connection._id !== userId
      );

      setConnections(filteredConnections);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) {
    return <h1>No Connections</h1>;
  }

  return (
    <>
      <h1 className="text-blue-500 font-bold text-2xl text-center">
        Connections
      </h1>
      <div className="flex  mt-10 p-4">
        {connections &&
          connections.map((con) => {
            return (
              <div
                className="card text-neutral-content w-96 flex justify-between"
                key={con._id}
              >
                <div className="max-w-sm mx-auto p-4 bg-white shadow-lg rounded-lg transform transition duration-500 hover:scale-105">
                  <div className="card-body flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-4">
                      <img
                        src={con.profilePicture}
                        alt={`${con.firstName}'s profile`}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {con.firstName} {con.lastName}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">{con.gender}</p>
                    <p className="text-sm text-gray-600 mt-1">{con.bio}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {con.age} years old
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Connections;
