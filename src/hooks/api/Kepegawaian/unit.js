import { useState } from "react";
import axios from "@/lib/axios";
import { responseErrors } from "../responseErrors";

export const makeOptionsUnits = () => {
	const [optionsUnit, setUnitForOptions] = useState([]);
	const getOptionsUnit = async () => {
		try {
			const { data, success } = await getUnit({
				query: "?perPage=999",
			});
			if (success) {
				let temp = [];
				data.map((i, key) => {
					temp.push({
						key: key,
						value: i.id,
						label: `${i.nama}`,
					});
				});
				return setUnitForOptions(temp);
			}
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				error.response?.data?.message ||
				error.message;
			return { errors: error, message: message };
		}
	};

	return {
		getOptionsUnit,
		optionsUnit,
	};
};
export const makeOptionsUnit = async () => {
	try {
		const { data, success } = await getUnit({
			query: "?perPage=999",
		});
		if (success) {
			let temp = [];
			data.map((i, key) => {
				temp.push({
					key: key,
					value: i.id,
					label: `${i.nama}`,
				});
			});
			return temp;
		}
	} catch (error) {
		return [];
	}
};
export const getUnit = async ({ query = null, url = null }) => {
	try {
		let newUrl = "/api/unit";
		if (query) {
			newUrl = `/api/unit${query}`;
		}
		if (url) {
			newUrl = url;
		}
		const res = await axios.get(newUrl);
		if (res.data.success) {
			return res.data;
		}
	} catch (error) {
		return responseErrors(error);
	}
};
// export default useUnitHooks;
