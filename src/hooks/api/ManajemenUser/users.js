import axios from "@/lib/axios";
import customToast from "@atoms/customToast";
const { toastLoading } = customToast();

export const updateUser = async (formData, id) => {
	toastLoading({ message: "Perubahan sedang disimpan", type: "loading" });
	try {
		const res = await axios.put(`/api/users/${id}`, formData);
		if (res?.data?.success) {
			toastLoading({
				message: "Data Berhasil di diubah",
				type: "success",
			});
			return res.data;
		} else {
			console.log(res?.data?.errors);
		}
	} catch (error) {
		console.clear();
		if (error?.response?.status == 422) {
			toastLoading({
				messages: Object.values(error.response.data.errors).flat(),
				type: "error",
			});
			return error.response.data;
		} else {
			const message =
				error?.response?.data?.message ||
				error.response?.data?.message ||
				error.message;
			toastLoading({
				message: "Data gagal diubah " + message,
				type: "error",
			});
			return { errors: error, message: message };
		}
	}
};
export const getUser = async ({ query = null, url = null } = {}) => {
	try {
		let newUrl = "/api/users";
		if (query) {
			newUrl = `/api/users${query}`;
		}
		if (url) {
			newUrl = url;
		}
		const res = await axios.get(newUrl);
		if (res.data.success) {
			return res.data;
		}
	} catch (error) {
		const message =
			error?.response?.data?.message ||
			error.response?.data?.message ||
			error.message;
		return { errors: error, message: message };
	}
};
export const showUser = async id => {
	try {
		const res = await axios.get(`/api/users/${id}`);
		if (res?.data?.success) {
			return res.data;
		} else {
			console.log(res?.data?.errors);
		}
	} catch (error) {
		const message =
			error?.response?.data?.message ||
			error.response?.data?.message ||
			error.message;
		return { errors: error, message: message };
	}
};

export const updateFotoProfile = async formData => {
	toastLoading({ message: "Perubahan sedang disimpan", type: "loading" });
	try {
		const res = await axios.post("/api/profile-foto", formData, {
			headers: {
				"Content-Type": `multipart/form-data;`,
			},
		});
		if (res?.data?.success) {
			toastLoading({
				message: "Foto Berhasil di diubah",
				type: "success",
			});
			return res.data;
		} else {
			console.log(res?.data?.errors);
		}
	} catch (error) {
		console.clear();
		if (error?.response?.status == 422) {
			toastLoading({
				messages: Object.values(error.response.data.errors).flat(),
				type: "error",
			});
			return error.response.data;
		} else {
			const message =
				error?.response?.data?.message ||
				error.response?.data?.message ||
				error.message;
			toastLoading({
				message: "Foto gagal diubah " + message,
				type: "error",
			});
			return { errors: error, message: error };
		}
	}
};
