import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function AddDevice() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_HOST}/devices`, data)
      .then((response) => {
        history.push("/");
        console.log(response);
      });
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="add-device max-w-xl mx-auto shadow-lg rounded-lg px-8 my-20 mb-50 pb-10">
      <h1 className="text-5xl pb-3">Add Device</h1>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label>Type *</label>
        <select
          className="block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          {...register("type", { required: true })}
        >
          <option value="WINDOWS_WORKSTATION">Windows Workstation</option>
          <option value="WINDOWS_SERVER">Windows Server</option>
          <option value="MAC">Mac</option>
        </select>

        <label>System Name *</label>
        {errors.system_name && (
          <div className="text-red-500">This field is required</div>
        )}

        {/* include validation with required or other standard HTML validation rules */}
        <input
          type="text"
          className="block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          {...register("system_name", { required: true })}
        />
        <label>HDD Capacity *</label>
        {errors.hdd_capacity && (
          <div className="text-red-500">This field is required</div>
        )}

        <input
          type="number"
          className="block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          {...register("hdd_capacity", { required: true })}
        />

        <button className="block w-full" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddDevice;
