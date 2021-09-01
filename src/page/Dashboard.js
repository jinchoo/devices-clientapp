import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [deviceList, setDeviceList] = useState([]);
  const [deviceListSort, setDeviceListSort] = useState(['All']);
  const [deviceSortBy, setDevicesSortBy] = useState("HDD Capacity");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_HOST}/devices`).then((response) => {
      setDeviceList(response.data);
    });
  }, []);
  console.log("device list", deviceList);
  const handleDeleteDevice = (deviceId) => {
    console.log(deviceId);
    axios
      .delete(`${process.env.REACT_APP_API_HOST}/devices/${deviceId}`)
      .then((response) => {
        console.log(response);
        console.log(deviceList);
        setDeviceList((devices) =>
          devices.filter((device) => device.id !== deviceId)
        );
      });
  };
  const handleDeviceChange = (event) => {
    console.log(event);
    const value = Array.from(event.target.selectedOptions, option => option.value);
    console.log(value);
    // setDeviceListSort(event.target.value);
    setDeviceListSort(value);
  };

  const handleDeviceSortBy = (event) => {
    setDevicesSortBy(event.target.value);
  };
  console.log(deviceSortBy);
  console.log(deviceListSort);
  return (
    <>
      <div className="dashboard max-w-xl mx-auto shadow-lg rounded-lg px-8 my-20 mb-50 pb-10">
        <h1 className="text-5xl pb-3">Dashboard</h1>
        <div className="flex space-x-10">
          <div className="flex-1">
            Device Type:
            <select
            multiple
            className="block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              onChange={handleDeviceChange}
              name="device type"
              value={deviceListSort}
            >
              <option value="All">All</option>
              <option value="WINDOWS_WORKSTATION">Windows Workstation</option>
              <option value="WINDOWS_SERVER">Windows Server</option>
              <option value="MAC">Mac</option>
            </select>
          </div>
          <div className="flex-1">
            Sort by:
            <select 
            className="block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            
            onChange={handleDeviceSortBy} value={deviceSortBy}>
              <option value="HDD Capacity">HDD Capacity</option>
              <option value="System Name">System Name</option>
            </select>
          </div>
        </div>

        <div class="space-y-4 divide-y divide-fuchsia-300">
          {deviceList
            .filter((device) => {
                if (deviceListSort.includes('All')) return true;
                return deviceListSort.includes(device.type);
            })
            .sort((deviceA, deviceB) => {
              if (deviceSortBy === "HDD Capacity") {
                return (
                  parseInt(deviceA.hdd_capacity, 10) -
                  parseInt(deviceB.hdd_capacity, 10)
                );
              }
              console.log(deviceA);
              console.log(deviceB);
              return deviceA.system_name
                .toLocaleLowerCase()
                .localeCompare(deviceB.system_name.toLocaleLowerCase(), "en", {
                  sensitivity: "base",
                });
            })
            .map((device) => {
              return (
                <div class="pt-6 flex items-center" key={device.id}>
                  <div className="flex-initial pr-10">
                    <img
                      src={"/asset/img/" + device.type + ".png"}
                      alt={device.type}
                    />
                  </div>
                  <div className="flex-auto">
                    {device.system_name} <br />
                    {device.hdd_capacity} GB
                  </div>
                  <div className="flex-initial">
                    <Link
                      className="rounded-full py-3 px-3 text-white bg-green-400 mr-2"
                      to={"/" + device.id}
                    >
                      Update
                    </Link>
                    <Link
                      to=""
                      className="rounded-full py-3 px-3 text-white bg-red-600"
                      onClick={() => handleDeleteDevice(device.id)}
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
        {/* <Link >Add Device</Link> */}
      </div>
      <div class="dashboard__add-button">
        <Link
          to="/add-device"
          class="p-5 w-16 h-16 bg-green-600 rounded-full hover:bg-green-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
        >
          <svg
            viewBox="0 0 20 20"
            enable-background="new 0 0 20 20"
            class="w-6 h-6 inline-block"
          >
            <path
              fill="#FFFFFF"
              d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                C15.952,9,16,9.447,16,10z"
            />
          </svg>
        </Link>
      </div>
    </>
  );
}

export default Dashboard;
