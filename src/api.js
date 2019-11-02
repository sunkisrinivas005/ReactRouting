import axios from 'axios';

const API = async reqObj => {

  return await new Promise(async resolve => {
    try {
      let response = await axios(reqObj)
      //console.log("checking in middleware");
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
