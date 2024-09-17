import React, { useState, useEffect } from "react";
import Loader from "../loader/Loader";
import axios from "axios";
import { toast } from "react-toastify";

const Settings = () => {
  const [addressData, setAddressData] = useState({ address: "" });
  const [profileData, setProfileData] = useState();

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const api = import.meta.env.VITE_BACKEND_API;

  // get user
  const getUser = async () => {
    try {
      const response = await axios.get(`${api}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data);

      setProfileData(response.data);
      setAddressData({ address: response.data.address });
    } catch (error) {
      console.error(error);
    }
  };

  // update Address
  const updateAddress = async () => {
    try {
      const response = await axios.put(
        `${api}/user/update-address/${id}`,
        { address: addressData.address },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle textarea changes
  const handleAddressChange = (e) => {
    setAddressData({ address: e.target.value });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {!profileData && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {profileData && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className=" text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          <div className="flex gap-12">
            <div>
              <label htmlFor="">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.username}
              </p>
            </div>
            <div>
              <label htmlFor="">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.email}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold "
              rows="5"
              placeholder="Address"
              name="Address"
              value={addressData.address}
              onChange={handleAddressChange}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={updateAddress}
              className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
