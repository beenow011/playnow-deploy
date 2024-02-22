import React, { useEffect, useState } from "react";
import ActionAreaCard from "../components/HomeCard";
import coverImage2 from "../assets/proxy (39).jpeg";
import { Avatar } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

function UserProfile() {
  const [subInfo, setSubInfo] = useState();
  const [videos, setVideos] = useState();
  const [render, setRender] = useState(false);
  const { username } = useParams();
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get(
          `/api/v1/users/get-user-channel/${username}`
        );
        if (res.status === 200) {
          console.log("sub", res);
          setSubInfo(res?.data?.data);
        }
      } catch (err) {
        console.log(err.response);
      }
    };

    getUserInfo();
  }, [render]);
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get("/api/v1/videos/getAllVideos", {
          params: { userId: subInfo?._id },
        });
        setVideos(res?.data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (subInfo) fetchVideo();
  }, [subInfo]);
  const handleSubscribe = async () => {
    try {
      const res = await axios.post(
        `/api/v1/subscription/toggleSubscribe/${subInfo?._id}`
      );
      if (res.status === 200 || res.status === 201) {
        setRender((prev) => !prev);
        console.log(res);
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  console.log(videos);
  return (
    <div className=" flex flex-col justify-center items-center pb-10">
      <div>
        <img
          src={subInfo?.coverImage || coverImage2}
          alt="coverImage"
          className="h-64 w-[80vw] object-cover"
        />
        <div className="flex justify-around">
          <div className="p-4 flex gap-16">
            <Avatar src={subInfo?.avatar} sx={{ width: 350, height: 350 }} />
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold text-white">
                {subInfo?.fullName}
              </h1>
              <p className="text-2xl font-semibold text-gray-600">
                {subInfo?.username}
              </p>
            </div>
          </div>
          <div className=" rounded-lg text-white flex flex-col justify-center items-center gap-5">
            <div>
              <button
                className={`${
                  subInfo?.isSubscribed ? "bg-red-600" : "bg-violet-700"
                } p-2 rounded-md`}
                onClick={handleSubscribe}
              >
                {subInfo?.isSubscribed ? "UnSubscribe" : "Subscribe"}
              </button>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col justify-center items-center bg-violet-700 p-2 rounded-md">
                <h1 className="text-2xl font-bold">
                  {subInfo?.subscribersCount}
                </h1>
                <p className="text-lg font-semibold">Subscribers Count</p>
              </div>
              <div className="flex flex-col justify-center items-center bg-violet-700 p-2 rounded-md">
                <h1 className="text-2xl font-bold">
                  {subInfo?.channelSubscribedToCount}
                </h1>
                <p className="text-lg font-semibold">Channel Subscribed to</p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="text-white font-bold text-3xl p-2">Your Videos</h1>
          <div>
            <ul className="flex gap-10 flex-wrap">
              {videos &&
                videos.map((vid) => (
                  <li>
                    <ActionAreaCard {...vid} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
