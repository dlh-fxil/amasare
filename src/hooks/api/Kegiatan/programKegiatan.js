import axios from "@/lib/axios";
import customToast from "@atoms/customToast";
import { useState } from "react";
const { toastLoading } = customToast();
export const addProgramKegiatan = async formData => {
	toastLoading({ message: "Data sedang ditambahkan", type: "loading" });
	try {
		const res = await axios.post(`/api/programKegiatan`, formData);
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
export const updateProgramKegiatan = async (formData, id) => {
	toastLoading({ message: "Perubahan sedang disimpan", type: "loading" });
	try {
		const res = await axios.put(`/api/programKegiatan/${id}`, formData);
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
export const deleteProgramKegiatan = async id => {
	toastLoading({ message: "Data sedang dihapus", type: "loading" });
	try {
		const res = await axios.delete(`/api/programKegiatan/${id}`);
		if (res?.data?.success) {
			toastLoading({
				message: "Data Berhasil di dihapus",
				type: "success",
			});
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
		toastLoading({
			message: (
				<>
					<p className="font-bold text-red-500">Data gagal dihapus </p>
					<p className=""> {message}</p>
				</>
			),
			type: "error",
		});
		return { errors: error, message: message };
	}
};
export const getProgramKegiatan = async ({ query } = {}) => {
	try {
		const res = await axios.get(`/api/programKegiatan${query}`);

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

export const makeOptionsPorgramKegiatan = () => {
	const [optionsProgram, setProgramForOptions] = useState([]);
	const getOptionsProgram = async () => {
		try {
			const { data, success } = await getProgramKegiatan({
				query: "?perPage=100&filter[type]=program",
			});

			if (success) {
				let temp = [];
				data.map(i => {
					temp.push({
						key: i.id,
						value: i.id,
						label: `${i.nomenklatur}`,
						object: i,
					});
				});
				return setProgramForOptions(temp);
			}
		} catch (error) {
			if (error?.response?.status == 422) {
				return console.log(Object.values(error.response.data.errors).flat());
			} else {
				console.error("message: ", error.response?.data?.message);
				return console.error("Error: ", error.message);
			}
		}
	};
	const [optionsKegiatanProgram, setKegiatanProgramForOptions] = useState([]);

	const getOptionsKegiatanProgram = async kodeProgram => {
		try {
			const { data, success } = await getProgramKegiatan({
				query: `?perPage=100&filter[id_program]=${kodeProgram}&filter[type]=kegiatan`,
			});

			if (success) {
				let temp = [];
				data.map(i => {
					temp.push({
						key: i.id,
						value: i.id,
						label: `${i.nomenklatur}`,
						object: i,
					});
				});
				return setKegiatanProgramForOptions(temp);
			}
		} catch (error) {
			if (error?.response?.status == 422) {
				return console.log(Object.values(error.response.data.errors).flat());
			} else {
				console.error("message: ", error.response?.data?.message);
				return console.error("Error: ", error.message);
			}
		}
	};
	const [optionsSubKegiatan, setOptionsSubKegiatan] = useState([]);

	const getOptionsSubKegiatan = async ({
		idProgram = null,
		idKegiatan = null,
		unitId = null,
	} = {}) => {
		try {
			const { data, success } = await getProgramKegiatan({
				query: `?perPage=100&filter[type]=subKegiatan&filter[unit_id]=${unitId}`,
			});

			if (success) {
				let temp = [];
				data.map(i => {
					temp.push({
						key: i.id,
						value: i.id,
						label: `${i.nomenklatur}`,
						object: i,
					});
				});
				return setOptionsSubKegiatan(temp);
			}
		} catch (error) {
			if (error?.response?.status == 422) {
				return console.log(Object.values(error.response.data.errors).flat());
			} else {
				console.error("message: ", error.response?.data?.message);
				return console.error("Error: ", error.message);
			}
		}
	};

	return {
		getOptionsProgram,
		optionsProgram,
		getOptionsKegiatanProgram,
		optionsKegiatanProgram,
		optionsSubKegiatan,
		getOptionsSubKegiatan,
	};
};
