import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import Face4Icon from "@mui/icons-material/Face4";
import { useLocation, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
function MenuComponent({ status }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/v1/users/logout");
      if (res.status === 200) {
        dispatch(logout());
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  const menuItems = [
    {
      name: "Home",
      icon: <HomeIcon style={{ fill: "white", fontSize: 20 }} />,
      path: "/",
    },
    {
      name: "History",
      icon: <HistoryIcon style={{ fill: "white", fontSize: 20 }} />,
      path: "/history",
    },
    {
      name: "Subscribed",
      icon: <SubscriptionsIcon style={{ fill: "white", fontSize: 20 }} />,
      path: "/subscribedChannels",
    },
    {
      name: "Profile",
      icon: <Face4Icon style={{ fill: "white", fontSize: 20 }} />,
      path: "/profile",
    },
    {
      name: "Publish",
      icon: <VideoCallIcon style={{ fill: "white", fontSize: 20 }} />,
      path: "/publish",
    },
  ];
  console.log(status);
  return (
    <div className="antialiased">
      {status ? (
        <ul className="flex flex-col justify-start gap-4 mt-10">
          {menuItems.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 align-middle hover:bg-slate-500/40 p-2"
              onClick={() => {
                navigate(item.path);
              }}
            >
              <div className="py-1">{item.icon} </div>
              <p
                className={`text-xl py-1 cursor-pointer font-semibold ${
                  location.pathname === item.path
                    ? "text-violet-700"
                    : "text-white"
                }`}
              >
                {item.name}
              </p>
            </li>
          ))}
          <li
            className="flex gap-3 align-middle hover:bg-slate-500/40 p-2"
            onClick={handleLogout}
          >
            <div className="py-1">
              <LogoutIcon style={{ fill: "white", fontSize: 20 }} />{" "}
            </div>
            <p
              className={`text-xl py-1 cursor-pointer text-white font-semibold `}
            >
              Logout
            </p>
          </li>
        </ul>
      ) : (
        <ul className="flex flex-col justify-start gap-4 mt-10">
          <li
            className="flex gap-3 align-middle hover:bg-slate-500/40 p-2"
            onClick={() => {
              navigate("/login");
            }}
          >
            <div className="py-1">
              <LoginIcon style={{ fill: "white", fontSize: 20 }} />{" "}
            </div>
            <p
              className={`text-xl py-1 cursor-pointer text-white font-semibold `}
            >
              Login
            </p>
          </li>
          <li
            className="flex gap-3 align-middle hover:bg-slate-500/40 p-2"
            onClick={() => {
              navigate("/signup");
            }}
          >
            <div className="py-1">
              <PersonAddAltIcon style={{ fill: "white", fontSize: 20 }} />{" "}
            </div>
            <p
              className={`text-xl py-1 cursor-pointer text-white font-semibold `}
            >
              SignUp
            </p>
          </li>
        </ul>
      )}
    </div>
  );
}

export default MenuComponent;