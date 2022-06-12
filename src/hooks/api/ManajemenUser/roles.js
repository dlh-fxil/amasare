import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import Axios from "axios";

import customToast from "@atoms/customToast";
import { responseErrors, responseErrorValidations } from "../responseErrors";
const { toastLoading } = customToast();

export const addRoles = async formData => {
	toastLoading({ message: "Data sedang ditambahkan", type: "loading" });
	try {
		const res = await axios.post(`/api/roles`, formData);
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
			return responseErrors(error);
		}
	}
};
export const updateRoles = async (formData, id) => {
	toastLoading({ message: "Perubahan sedang disimpan", type: "loading" });
	try {
		const res = await axios.put(`/api/roles/${id}`, formData);
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
export const deleteRoles = async id => {
	toastLoading({ message: "Perubahan sedang dihapus", type: "loading" });
	try {
		const res = await axios.delete(`/api/roles/${id}`);
		if (res?.data?.success) {
			toastLoading({
				message: "Data Berhasil dihapus",
				type: "success",
			});
			return res.data;
		}
	} catch (error) {
		return responseErrors(error);
	}
};

export const getRoles = async ({ query = null, url = null } = {}) => {
	try {
		let newUrl = "/api/roles";
		if (query) {
			newUrl = `/api/roles${query}`;
		}
		if (url) {
			newUrl = url;
		}
		const res = await axios.get(newUrl);

		if (res?.data?.success) {
			return res.data;
		}
	} catch (error) {
		return responseErrors(error);
	}
};

export const makeOptionsRoles = async () => {
	try {
		const { data, success } = await getRoles();
		if (success) {
			let temp = [];
			data.map(i => {
				temp.push(i.name);
			});
			return temp;
		}
	} catch (error) {
		return [];
	}
	// }
};
