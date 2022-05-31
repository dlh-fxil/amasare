import { useState } from "react";
import axios from "@/lib/axios";
import customToast from "@atoms/customToast";
const { toastLoading } = customToast();

export const makeOptionsUraianTugas = () => {
	const [optionsUraianTugas, setOptionsUraianTugas] = useState([]);

	const getOptionsUraianTugas = async jabatanId => {
		try {
			const { data, success } = await getUraianTugas({
				query: `?perPage=999&filter[jabatan_id]=${jabatanId}`,
			});
			if (success) {
				let temp = [];
				data.map(i => {
					temp.push({
						key: i.id,
						value: i.id,
						label: i.uraian_tugas,
					});
				});
				return setOptionsUraianTugas(temp);
			}
		} catch (error) {
			if (error?.response?.status == 422) {
				return console.log(Object.values(error.response.data.errors).flat());
			} else {
				console.error("message: ", error.response?.data?.message);
				return console.error("Error: ", error.message);
			}
		}
		// }
	};
	return {
		optionsUraianTugas,
		getOptionsUraianTugas,
	};
};

export const addUraianTugas = async formData => {
	toastLoading({ message: "Data sedang ditambahkan", type: "loading" });
	try {
		const res = await axios.post(`/api/uraianTugas`, formData);
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
		// console.clear();
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
				message: "Data gagal ditambahkan " + message,
				type: "error",
			});
			return { errors: error, message: message };
		}
	}
};
export const updateUraianTugas = async (formData, id) => {
	toastLoading({ message: "Perubahan sedang disimpan", type: "loading" });
	try {
		const res = await axios.put(`/api/uraianTugas/${id}`, formData);
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

export const getUraianTugas = async ({ query = null, url = null }) => {
	try {
		let newUrl = "/api/uraianTugas";
		if (query) {
			newUrl = `/api/uraianTugas${query}`;
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
