import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import ActionAreaCard from "../components/HomeCard";
import { Outlet } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import MenuComponent from "../components/MenuComponent";
import LoggedOut from "../components/LoggedOut";
function LandingPage() {
  const userStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  if (userStatus) {
    // Retrieve the access token from cookies
    function getAccessTokenFromCookies() {
      console.log("cookie", document.cookie);
      const cookies = document.cookie.split("; ");
      console.log("cookie2", cookies);

      for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "accessToken") {
          return value;
        }
      }
      return null; // Return null if access token is not found in cookies
    }

    // Save the access token to local storage
    function saveAccessTokenToLocalStorage(accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    // Get the access token from cookies
    const accessTokenFromCookies = getAccessTokenFromCookies();

    // Save the access token to local storage if it exists
    if (accessTokenFromCookies) {
      saveAccessTokenToLocalStorage(accessTokenFromCookies);
    }
  }
  // console.log("search term", serachTerm);
  return (
    <div className="bg-gradient-to-r from-slate-900 to-black min-h-screen ">
      <div className="relative">
        <Header stauts={userStatus} />
      </div>
      <div className="flex relative">
        <div className="sticky top-32 h-full  p-4">
          <div className="flex  align-middle mt-10">
            <ListIcon style={{ fill: "violet", fontSize: 40 }} />
            <label htmlFor="" className="text-white  text-3xl ml-5 font-bold">
              Menu
            </label>
          </div>
          <MenuComponent status={userStatus} />
        </div>
        <div className="mx-10 w-[80vw] flex flex-col min-h-screen  pt-36">
          {userStatus ? <Outlet /> : <LoggedOut />}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
