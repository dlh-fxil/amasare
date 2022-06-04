import axios from "@/lib/axios";
import customToast from "@atoms/customToast";
import { responseErrorValidations, responseErrors } from "../responseErrors";

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
		}
	} catch (error) {
		if (error?.response?.status == 422) {
			toastLoading({
				messages: Object.values(error.response.data.errors).flat(),
				type: "error",
			});
			return responseErrorValidations(error.response.data);
		} else {
			const message =
				error?.response?.data?.message ||
				error.response?.data?.message ||
				error.message;
			toastLoading({
				message: "Data gagal ditambahkan " + message,
				type: "error",
			});
			return responseErrors;
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
		}
	} catch (error) {
		if (error?.response?.status == 422) {
			toastLoading({
				messages: Object.values(error.response.data.errors).flat(),
				type: "error",
			});
			return responseErrorValidations(error.response.data);
		}
		const message =
			error?.response?.data?.message ||
			error.response?.data?.message ||
			error.message;
		toastLoading({
			message: "Kegiatan gagal diikuti " + message,
			type: "error",
		});
		return responseErrors(error);
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
		}
	} catch (error) {
		const message =
			error?.response?.data?.message ||
			error.response?.data?.message ||
			error.message;
		toastLoading({
			message: "Kegiatan gagal diikuti " + message,
			type: "error",
		});
		return responseErrors(error);
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
		}
	} catch (error) {
		if (error?.response?.status == 422) {
			toastLoading({
				messages: Object.values(error.response.data.errors).flat(),
				type: "error",
			});
			return responseErrorValidations(error.response.data);
		} else {
			const message =
				error?.response?.data?.message ||
				error.response?.data?.message ||
				error.message;
			toastLoading({
				message: "Data gagal diubah " + message,
				type: "error",
			});
			return responseErrors(error);
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
		}
	} catch (error) {
		responseErrors(error);
	}
};

export const endAktivitas = async id => {
	toastLoading({ message: "Sedang proses", type: "loading" });
	try {
		const res = await axios.put(`/api/end-kegiatan/${id}`);
		if (res?.data?.success) {
			toastLoading({
				message: "Aktivitas berhasil diselesaikan",
				type: "success",
			});
			return res.data;
		}
	} catch (error) {
		const message =
			error?.response?.data?.message ||
			error.response?.data?.message ||
			error.message;
		toastLoading({
			message: "Kegiatan gagal diselesaikan " + message,
			type: "error",
		});
		return responseErrors(message);
	}
};

export const cancelEndAktivitas = async (id = null) => {
	toastLoading({ message: "Sedang proses", type: "loading" });
	try {
		const res = await axios.put(`/api/cancelEnd-kegiatan/${id}`);
		if (res?.data?.success) {
			toastLoading({
				message: "Aktivitas berhasil batal diselesaikan",
				type: "success",
			});
			return res.data;
		}
	} catch (error) {
		const message =
			error?.response?.data?.message ||
			error.response?.data?.message ||
			error.message;
		toastLoading({
			message: "Kegiatan gagal batal diselesaikan " + message,
			type: "error",
		});
		return responseErrors(error);
	}
};
