import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

export const counterSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    load: (state, action) => {
        // console.log('action', action)
        console.log('state,', state)
      return action.payload;
    },
    remove: (state, action) => {
    //   state.value -= 1
    return state.filter((device) => device.id !== action.payload)
    },
    add: (state, action) => {
        state.push(action.payload);
        // return 
    },
    update: (state, action) => {
        state.forEach(device => {
            if (device.id === action.payload.id) {
                // device.name = 'asdf';
                device.type = action.payload.data.type;
                device.system_name = action.payload.data.system_name;

                device.hdd_capacity = action.payload.data.hdd_capacity;

                // return {
                //     ...device,
                //     ...action.payload.data
                // }
            }
            // return device
        })
    }
  },
})

// Action creators are generated for each case reducer function
export const { load, remove, add, update } = counterSlice.actions

export default counterSlice.reducer