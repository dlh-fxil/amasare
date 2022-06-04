import { useState } from "react";
import axios from "@/lib/axios";
import customToast from "@atoms/customToast";
const { toastLoading } = customToast();

export const addSubUnit = async formData => {
	toastLoading({ message: "Data sedang ditambahkan", type: "loading" });
	try {
		const res = await axios.post(`/api/SubUnit`, formData);
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
export const updateSubUnit = async (formData, id) => {
	toastLoading({ message: "Perubahan sedang disimpan", type: "loading" });
	try {
		const res = await axios.put(`/api/SubUnit/${id}`, formData);
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

export const getSubUnit = async ({ query = null, url = null }) => {
	try {
		let newUrl = "/api/subUnit";
		if (query) {
			newUrl = `/api/subUnit${query}`;
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

export const makeOptionsSubUnit = async unit_id => {
	// if (unit_id) {
	try {
		const { data, success } = await getSubUnit({
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
			return temp;
		}
	} catch (error) {
		return [];
	}
	// }
};
