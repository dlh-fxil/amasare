import axios from "@/lib/axios";
import customToast from "@atoms/customToast";
import { responseErrors } from "../responseErrors";
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

export const getProgramKegiatan = async ({ query = "", url = "" } = {}) => {
	try {
		let newUrl = "/api/programKegiatan";
		if (query) {
			newUrl = `/api/programKegiatan${query}`;
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

export const makeOptionsPorgramKegiatan = async param => {
	try {
		let query = `?perPage=100`;
		if (param) {
			query = query + "&" + param;
		}
		const { data, success } = await getProgramKegiatan({ query });

		if (success) {
			let temp = [];
			data.map(i => {
				temp[i.id] = {
					key: i.id,
					value: i.id,
					label: `${i.nomenklatur} (${i.type})`,
					object: i,
				};
			});
			return temp;
		}
	} catch (error) {
		return [];
	}
};
export const makeOptionsProgram = async () => {
	try {
		let query = `?perPage=100&filter[type]=program`;

		const { data, success } = await getProgramKegiatan({ query });

		if (success) {
			let temp = [];
			data.map(i => {
				temp[i.id] = {
					key: i.id,
					value: i.id,
					label: `${i.nomenklatur} (${i.type})`,
					object: i,
				};
			});
			return temp;
		}
	} catch (error) {
		return [];
	}
};
export const makeOptionsKegiatan = async (kodeProgram = null) => {
	try {
		let query = `?perPage=100&filter[type]=kegiatan`;
		if (kodeProgram) {
			query = query + `&filter[id_program]=${kodeProgram}`;
		}
		const { data, success } = await getProgramKegiatan({ query });

		if (success) {
			let temp = [];
			data.map(i => {
				temp[i.id] = {
					key: i.id,
					value: i.id,
					label: `${i.nomenklatur} (${i.type})`,
					object: i,
				};
			});
			return temp;
		}
	} catch (error) {
		return [];
	}
};

export const makeOptionsSubKegiatan = async ({
	idProgram = null,
	idKegiatan = null,
	unitId = null,
} = {}) => {
	try {
		let query = `?perPage=100&filter[type]=subKegiatan`;
		if (unitId) {
			query = query + `&filter[unit_id]=${unitId}`;
		}
		const { data, success } = await getProgramKegiatan({ query });

		if (success) {
			let temp = [];
			data.map(i => {
				temp[i.id] = {
					key: i.id,
					value: i.id,
					label: `${i.nomenklatur} (${i.type})`,
					object: i,
				};
			});
			return temp;
		}
	} catch (error) {
		return [];
	}
};
