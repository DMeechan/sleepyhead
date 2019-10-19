import React from 'react';
import axios from 'axios';

export const getData = async () => {
  await axios
    .get(
      `https://sleepyhead-server.onrender.com/api/user/${localStorage.getItem(
        'uuid'
      )}`
    )

    .then(res => {
      localStorage.setItem('data', JSON.stringify(res.data));
    });
};
