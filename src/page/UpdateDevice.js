import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { update } from '../reducer/device.reducer';
import { useDispatch } from 'react-redux';

function UpdateDevice() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    axios
      .put(`${process.env.REACT_APP_API_HOST}/devices/${deviceId}`, data)
      .then((response) => {
        dispatch(update({id: deviceId, data}))
        console.log('submit', {id: deviceId, data})

        history.push("/");
        console.log(response);
      });
  };

  const [device, setDevice] = useState({});

  const { deviceId } = useParams();
  console.log(deviceId);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/devices/${deviceId}`)
      .then((response) => {
        setDevice(response.data);
      });
  }, [deviceId]);

  console.log("device", device);
  console.log("errors", errors);
  if (device === undefined) {
    return null;
  }
  // return null

  return (
    <div className="update-device max-w-xl mx-auto shadow-lg rounded-lg px-8 my-20 mb-50 pb-10">
      <h1 className="text-5xl pb-3">Updating: {deviceId}</h1>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}

        {/* include validation with required or other standard HTML validation rules */}
        <label>Type *</label>

        <select
          className="block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          defaultValue={device.type}
          {...register("type", { required: true, value: device.type })}
        >
          <option value="WINDOWS_WORKSTATION">Windows Workstation</option>
          <option value="WINDOWS_SERVER">Windows Server</option>
          <option value="MAC">Mac</option>
        </select>
        <label>System Name *</label>
        {errors.system_name && (
          <div className="text-red-500">This field is required</div>
        )}

        <input
          type="text"
          className="block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          defaultValue={device.system_name}
          {...register("system_name", {
            required: true,
            value: device.system_name,
          })}
        />
        <label>HDD Capacity *</label>
        {errors.hdd_capacity && (
          <div className="text-red-500">This field is required</div>
        )}
        <input
          type="number"
          className="block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          defaultValue={device.hdd_capacity}
          {...register("hdd_capacity", {
            required: true,
            value: device.hdd_capacity,
            valueAsNumber: true
          })}
        />

        <button className="block w-full" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default UpdateDevice;
