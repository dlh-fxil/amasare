import { forwardRef, useEffect, useState } from "react";
import Select from "react-select";
const CustomSelect = ({ options = [], ...rest }, ref) => {
	const noOptionsMessage = input => input?.inputValue + " tidak ditemukan";

	return (
		<Select
			{...rest}
			ref={ref}
			className="text-base border-0 bg-transparent text-current"
			classNamePrefix="select"
			options={options}
			noOptionsMessage={noOptionsMessage}
		/>
	);
};

export default forwardRef(CustomSelect);
