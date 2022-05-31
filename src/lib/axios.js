import Axios from "axios";
import NProgress from "nprogress";
NProgress.configure({
	easing: "linear",
	speed: 350,
});

const axios = Axios.create({
	baseURL: "backend",
	headers: {
		"X-Requested-With": "XMLHttpRequest",
	},
	withCredentials: true,
});
axios.defaults.transformRequest.push(function (data, headers) {
	NProgress.start();
	return data;
});

axios.defaults.transformResponse.push(function (data, headers) {
	NProgress.done();
	return data;
});

export default axios;
