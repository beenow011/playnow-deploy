import { Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { login } from "../store/authSlice";

function UpdateProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [emailAndUsername, setEmailAndUsername] = useState({
    email: null,
    username: null,
  });
  const [password, setPassword] = useState({
    oldPassword: null,
    newPassword: null,
  });
  const [file, setFile] = useState({ avatar: null, coverImage: null });
  // console.log(file);
  const handleAvatar = async () => {
    try {
      if (file.avatar) {
        setIsLoading(true);
        const res = await axios.patch(
          "/api/v1/users/update-avatar",
          { avatar: file.avatar },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res?.data?.success) {
          console.log("res", res.data);
          dispatch(login(res?.data?.data));
          setIsLoading(false);
          navigate("/profile");
        }
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  const handleCoverImage = async () => {
    try {
      if (file.coverImage) {
        setIsLoading(true);
        const res = await axios.patch(
          "/api/v1/users/update-cover-image",
          { coverImage: file.coverImage },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res?.data?.success) {
          console.log("Successfull");
          dispatch(login(res?.data?.data));
          setIsLoading(false);
          navigate("/profile");
        }
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <div className="text-white">
      {page === 1 && (
        <div>
          <h1 className="font-bold text-center p-3">Username and Email</h1>
          <div className="m-3">
            <div className="p-2">
              <TextField
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="family-name"
                className="bg-gray-200"
              />
            </div>
            <div className="p-2">
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                className="bg-gray-200"
              />
            </div>
          </div>
          <div className=" flex justify-center items-center mt-auto">
            <button
              className="bg-white font-semibold p-2 rounded-md text-violet-700"
              onClick={() => navigate("/profile")}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {page === 2 && (
        <div>
          <h1 className="font-bold text-center p-3">Password</h1>
          <div className="m-3">
            <div className="p-2">
              <TextField
                required
                fullWidth
                id="password"
                label="old password"
                name="old password"
                className="bg-gray-200"
                type="password"
              />
            </div>
            <div className="p-2">
              <TextField
                required
                fullWidth
                id="password"
                label="new password"
                name="new password"
                className="bg-gray-200"
                type="password"
              />
            </div>
          </div>
          <div className=" flex justify-center items-center mt-auto">
            <button
              className="bg-white font-semibold p-2 rounded-md text-violet-700"
              onClick={() => navigate("/profile")}
            >
              Save
            </button>
          </div>
        </div>
      )}
      {page === 3 && (
        <div className="mt-10">
          <h1 className="font-bold text-center p-3">Avatar</h1>
          <div className="m-3">
            <div className="p-2 flex">
              <label htmlFor="" className="pr-2">
                Avatar
              </label>
              <TextField
                id="avatar"
                name="Avatar"
                className="bg-gray-200"
                type="file"
                onChange={(e) =>
                  setFile({ ...file, avatar: e.target.files[0] })
                }
              />
            </div>
          </div>
          <div className=" flex justify-center items-center mt-auto">
            <button
              className="bg-white font-semibold p-2 rounded-md text-violet-700"
              onClick={handleAvatar}
            >
              {isLoading ? <BeatLoader color="rgba(54, 99, 214, 1)" /> : "Save"}
            </button>
          </div>
        </div>
      )}
      {page === 4 && (
        <div className="mt-10">
          <h1 className="font-bold text-center p-3">Cover Image</h1>
          <div className="m-3">
            <div className="p-2 flex">
              <label htmlFor="" className="pr-2">
                Cover Image
              </label>
              <TextField
                id="coverImage"
                className="bg-gray-200"
                type="file"
                onChange={(e) =>
                  setFile({ ...file, coverImage: e.target.files[0] })
                }
              />
            </div>
          </div>
          <div className=" flex justify-center items-center mt-auto">
            <button
              className="bg-white font-semibold p-2 rounded-md text-violet-700"
              onClick={handleCoverImage}
            >
              {isLoading ? <BeatLoader color="rgba(54, 99, 214, 1)" /> : "Save"}
            </button>
          </div>
        </div>
      )}
      <div
        className={`flex ${
          page === 1 ? "justify-end" : "justify-between"
        } mt-auto`}
      >
        {page > 1 && (
          <div
            className="p-3 cursor-pointer"
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </div>
        )}
        {page < 4 && (
          <div
            className="p-3 cursor-pointer"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </div>
        )}
      </div>
      <div className="flex justify-center items-center">
        <button
          className="text-white font-semibold p-2 rounded-md bg-violet-700"
          onClick={() => navigate("/profile")}
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
}

export default UpdateProfile;
