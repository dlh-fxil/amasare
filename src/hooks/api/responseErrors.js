export const responseErrors = (errors = null) => {
	return { success: false, errors, data: null };
};
export const responseErrorValidations = (validation = null) => {
	return { success: false, validation };
};
