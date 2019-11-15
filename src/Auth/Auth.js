import axios from 'axios';
export const LOGIN_BASE_URL = "https://kawlzrot5j.execute-api.ca-central-1.amazonaws.com";

export async function isAuthenticated(){
	return localStorage.getItem('x-access-token-expiration') && localStorage.getItem('x-access-token-expiration') > Date.now()
}

export const LoginApi = async(data) => {
     let response = await axios.get(`${LOGIN_BASE_URL}/logincheckapi?username=${data.userName}&password=${data.password}`);
     if(response && response.data && response.data.body && response.data.body === "Successful"){
	    localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000);
	    localStorage.setItem('x-user-name', data.userName)
     }
			return response.data
} 