import axios from "@/lib/axios";
import customToast from "@atoms/customToast";
const { toastLoading } = customToast();
export const addAktivitas = async formData => {
	toastLoading({ message: "Data sedang ditambahkan", type: "loading" });
	try {
		const res = await axios.post(`/api/kegiatan`, formData);
		if (res?.data?.success) {
			toastLoading({
				message: "Data Berhasil di simpan",
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
				error?.response?.data?.message || error.response?.data?.message || error.message;
			toastLoading({
				message: "Data gagal ditambahkan " + message,
				type: "error",
			});
			return { errors: error, message: message };
		}
	}
};
export const followingAktivitas = async (formData, id) => {
	toastLoading({ message: "Sedang prosess", type: "loading" });
	try {
		const res = await axios.put(`/api/follow-kegiatan/${id}`, formData);
		if (res?.data?.success) {
			toastLoading({
				message: "Anda Berhasil menjadi peserta kegiatan",
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
				error?.response?.data?.message || error.response?.data?.message || error.message;
			toastLoading({
				message: "Kegiatan gagal diikuti " + message,
				type: "error",
			});
			return { errors: error, message: message };
		}
	}
};
export const deleteAktivitas = async id => {
	toastLoading({ message: "Sedang prosess", type: "loading" });
	try {
		const res = await axios.delete(`/api/kegiatan/${id}`);
		if (res?.data?.success) {
			toastLoading({
				message: "Berhenti Mengikuti Sukses",
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
				error?.response?.data?.message || error.response?.data?.message || error.message;
			toastLoading({
				message: "Kegiatan gagal diikuti " + message,
				type: "error",
			});
			return { errors: error, message: message };
		}
	}
};
export const updateAktivitas = async (formData, id) => {
	toastLoading({ message: "Perubahan sedang disimpan", type: "loading" });
	try {
		const res = await axios.put(`/api/kegiatan/${id}`, formData);
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
				error?.response?.data?.message || error.response?.data?.message || error.message;
			toastLoading({
				message: "Data gagal diubah " + message,
				type: "error",
			});
			return { errors: error, message: message };
		}
	}
};
export const getAktivitas = async ({ query = null, url = null }) => {
	try {
		let newUrl = "/api/kegiatan";
		if (query) {
			newUrl = `/api/kegiatan${query}`;
		}
		if (url) {
			newUrl = url;
		}
		const res = await axios.get(newUrl);

		if (res?.data?.success) {
			return res.data;
		} else {
			console.log(res?.data?.errors);
		}
	} catch (error) {
		console.clear();
		if (error?.response?.status == 422) {
			return error.response.data;
		} else {
			return { errors: error, message: error };
		}
	}
};
