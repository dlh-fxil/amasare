import qs from "qs";

const makeQueryParams = ({
	globalFilter = null,
	perPage = 10,
	filters = [],
	sortBy = [],
	includes = null,
}) => {
	const search = {};
	if (globalFilter) {
		search = { id: "search", value: globalFilter };
	}
	const filtersAndSearch = [...filters, search];
	let filtersWithValue = {};
	filtersAndSearch.forEach(element => {
		if (element.value) {
			filtersWithValue[element.id] = element.value;
		}
	});
	let sort = null;
	sortBy.forEach(element => {
		if (element.desc) {
			return (sort = "-" + element.id);
		}
		return (sort = element.id);
	});
	const arrr = {
		perPage: perPage,
		filter: filtersWithValue,
		sort: sort,
		include: includes,
	};
	const test = qs.stringify(arrr, {
		skipNulls: true,
		strictNullHandling: false,
		addQueryPrefix: true,
	});
	return test;
};
export default makeQueryParams;
