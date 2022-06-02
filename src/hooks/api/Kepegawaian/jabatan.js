import { useState } from "react";
import axios from "@/lib/axios";
import customToast from "@atoms/customToast";
const { toastLoading } = customToast();

export const addJabatan = async formData => {
	toastLoading({ message: "Data sedang ditambahkan", type: "loading" });
	try {
		const res = await axios.post(`/api/Jabatan`, formData);
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
export const updateJabatan = async (formData, id) => {
	toastLoading({ message: "Perubahan sedang disimpan", type: "loading" });
	try {
		const res = await axios.put(`/api/Jabatan/${id}`, formData);
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

export const getJabatan = async ({ query = null, url = null }) => {
	try {
		let newUrl = "/api/jabatan";
		if (query) {
			newUrl = `/api/jabatan${query}`;
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
		const message =
			error?.response?.data?.message ||
			error.response?.data?.message ||
			error.message;
		return { errors: error, message: message };
	}
};

export const makeOptionsJabatan = () => {
	const [optionsJabatan, setOptionsJabatan] = useState([]);

	const getOptionsJabatan = async () => {
		try {
			const { data, success } = await getJabatan({
				query: `?perPage=999`,
			});
			if (success) {
				let temp = [];
				data.map(i => {
					temp.push({
						key: i.id,
						value: i.id,
						label: `${i.nama} (${i.jenis})`,
					});
				});
				return setOptionsJabatan(temp);
			}
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				error.response?.data?.message ||
				error.message;

			return { errors: error, message: message };
		}
		// }
	};
	return {
		optionsJabatan,
		getOptionsJabatan,
	};
};
