import React from 'react';
import axios from 'axios';

export const getDays = () => {
  axios
    .get(
      `https://sleepyhead-server.onrender.com/api/user/${localStorage.getItem(
        'uuid'
      )}`
    )
    .then(res => {
      console.log(res);
    });
};
