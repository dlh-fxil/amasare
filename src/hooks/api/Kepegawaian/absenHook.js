import axios from "@/lib/axios";

const generateQueryParam = param => {
	const { cursor, page, filters, sortBy, pageSize, globalFilter } = param;
	let dataFilters = [];
	for (let i = 0; i < filters?.length; i++) {
		let temp = "&filter[" + filters[i].id + "]=" + filters[i].value;
		dataFilters.push(temp);
	}
	const queryFilter = dataFilters ? dataFilters.join("&") : "";
	let dataSortBy = [];
	for (let i = 0; i < sortBy?.length; i++) {
		sortBy[i].desc ? dataSortBy.push("&sort=" + sortBy[i].id) : dataSortBy.push("&sort=-" + sortBy[i].id);
	}
	let querySortBy = dataSortBy ? dataSortBy.join() : "";
	let pageCursor = cursor ? "&cursor=" + cursor : "";
	let pageNo = page ? "&page=" + page : "";
	let perPage = pageSize ? "&perPage=" + pageSize : "";
	let search = globalFilter ? "&filter[search]=" + globalFilter : "";
	const query = `?include=roles${pageCursor ?? pageNo ?? ""}${search ?? ""}${perPage ?? ""}${queryFilter ?? ""}${querySortBy ?? ""}`;
	return query;
};

export async function fetchAbsen(param, setLinks, setMetaData, setTableData, setTotalData, setPageSize, setTotalPages) {
	try {
		const query = generateQueryParam(param);
		// const res = await axios.get(`/api/absen`);
		const res = await axios.get(`/api/absen${query ?? ""}`);
		const { data, links, meta } = res.data;
		console.log(data);
		if (meta) {
			console.log(meta);
			const { total, per_page } = meta;
			setMetaData(meta || {});
			setTotalData(total || 0);
			setPageSize(per_page || 10);
			setPageSize(per_page || 10);
			total && per_page ? setTotalPages(Math.ceil(total / per_page)) : setTotalPages(1);
		}
		if (links) {
			setLinks(links || {});
		}
		if (data) {
			setTableData(data || []);
		}
	} catch (error) {
		if (error.response?.status == 422) {
			console.log(Object.values(error.response?.data?.errors).flat());
		} else {
			console.error("message: ", error.response?.data?.message);
			console.error("Error: ", error.message);
		}
	} finally {
		// setNewCursor(null)
	}
}
