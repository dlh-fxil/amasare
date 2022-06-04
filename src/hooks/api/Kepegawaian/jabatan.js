import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import Axios from "axios";

import customToast from "@atoms/customToast";
import { responseErrors, responseErrorValidations } from "../responseErrors";
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
		}
	} catch (error) {
		// console.clear();
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
			return responseErrors(error);
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
		}
	} catch (error) {
		console.clear();
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

export const getJabatan = async ({ query = null, url = null } = {}) => {
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
		}
	} catch (error) {
		console.clear();
		const message =
			error?.response?.data?.message ||
			error.response?.data?.message ||
			error.message;
		return responseErrors(error);
	}
};

export const makeOptionsJabatan = async () => {
	try {
		const { data, success } = await getJabatan({
			query: `?perPage=999`,
		});
		if (success) {
			let temp = [];
			data.map(i => {
				temp[i.id] = {
					key: i.id,
					value: i.id,
					label: `${i.nama} (${i.jenis})`,
				};
			});
			return temp;
		}
	} catch (error) {
		return [];
	}
	// }
};
