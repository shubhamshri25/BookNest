import React, { useEffect, useState } from "react";
import SideBar from "../components/profile/SideBar";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/loader/Loader";

const Profile = () => {
  // const isLoggedIn = useSelector();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [profile, setProfile] = useState({});

  const api = import.meta.env.VITE_BACKEND_API;

  // getting the user
  const getUser = async () => {
    try {
      const response = await axios.get(`${api}/user/${headers.id}`, {
        headers,
      });

      // console.log(response.data);

      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row w-full  py-8 gap-4 text-white ">
      {!profile && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {profile && (
        <>
          <div className=" w-full md:w-1/6 h-screen" >
            <SideBar data={profile} />
          </div>
          <div className=" w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
