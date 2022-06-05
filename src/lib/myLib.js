export const generateKeyById = (data = [], startNumber = 1) => {
	try {
		let tempData = [];
		if (data.length) {
			data.map(d => (tempData[d.id] = d));
		}
		return tempData;
	} catch (e) {
		console.error(e);
		return [];
	}
};
export const mergerArray = (oldData = [], newData = []) => {
	try {
		return [...new Set([...oldData, ...newData])];
	} catch (error) {
		console.log(error);
		return [];
	}
};
