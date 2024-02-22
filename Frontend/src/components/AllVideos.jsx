import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ActionAreaCard from "../components/HomeCard";
import { useNavigate } from "react-router-dom";
function AllVideos() {
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.auth.status);
  const [videos, setVideos] = useState();
  const [filteredVideos, setFilteredVideos] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const searchTerm = useSelector((state) => state.search.searchTerm);
  // console.log("search", searchTerm);
  // if (videos) {
  //   setFilteredVideos(videos);
  // }
  console.log(searchTerm);
  useEffect(() => {
    const fetchVideo = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/v1/videos/getAllVideos");
        setVideos(res?.data?.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideo();
  }, []);

  useEffect(() => {
    setFilteredVideos(
      videos?.filter((vid) =>
        vid.title.trim().toLowerCase().includes(searchTerm)
      )
    );
  }, [searchTerm]);

  // console.log(filteredVideos);
  return (
    <div>
      {userStatus ? (
        <div>
          <h1 className="text-3xl font-bold text-white mb-10 p-3 ">
            {searchTerm && searchTerm.length > 0
              ? `Videos related to \"${searchTerm}\"`
              : "All Videos"}
          </h1>
          <ul className="flex gap-16 justify-center flex-wrap">
            {(filteredVideos || videos)
              ?.slice()
              .reverse()
              .map((vid) => (
                <li
                  key={vid?._id}
                  className="hover:shadow-violet-700 hover:shadow-xl shadow-lg transition shadow-white border-violet-700 p-2 rounded-md"
                >
                  <ActionAreaCard {...vid} />
                </li>
              ))}
          </ul>
        </div>
      ) : (
        navigate("/login")
      )}
    </div>
  );
}

export default AllVideos;
