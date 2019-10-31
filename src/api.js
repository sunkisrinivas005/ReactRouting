import axios from 'axios';

const API = async reqObj => {
  return await new Promise(async resolve => {
    try {
      //console.log("checking in middleware");
      const response = await axios.get(reqObj)
      let data = response && response.data ? response.data : {}
      //console.log(response, "in api calling");
      resolve(data);
    } catch (error) {
      let errorObj = error.response;
      //console.log("errorObj",errorObj);
      resolve(errorObj);
    }
  });
};

export default API;
