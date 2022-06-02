import { useState } from "react";
import axios from "@/lib/axios";

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
		if (error?.response?.status == 422) {
			return console.log(Object.values(error.response.data.errors).flat());
		} else {
			console.error("message: ", error.response?.data?.message);
			return console.error("Error: ", error.message);
		}
	}
};
// export default useUnitHooks;
