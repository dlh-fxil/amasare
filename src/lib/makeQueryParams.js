import qs from "qs";

const makeQueryParams = ({
	globalFilter = null,
	perPage = null,
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
	const sort = generateSortBy(sortBy);

	const arrr = {
		perPage: perPage,
		filter: filtersWithValue,
		sort: sort,
		include: includes,
	};
	const queryString = qs.stringify(arrr, {
		skipNulls: true,
		strictNullHandling: false,
		addQueryPrefix: true,
	});
	return queryString;
};

export default makeQueryParams;

const generateSortBy = (data = []) => {
	let temp = ["id"];
	if (data.length > 0) {
		data.forEach(element => {
			if (element.desc) {
				temp.unshift("-" + element.id);
			} else {
				temp.unshift(element.id);
			}
		});
		return `${temp.join(",")}`;
	}
	return null;
};
