import { forwardRef, useEffect, useState } from "react";
import Select from "react-select";
const CustomSelect = ({ options = [], ...rest }, ref) => {
	const noOptionsMessage = input => input?.inputValue + " tidak ditemukan";

	return (
		<Select
			{...rest}
			ref={ref}
			className="font-normal text-sm w-full text-left z-10 border-0  text-slate-800"
			classNamePrefix="select"
			options={options}
			noOptionsMessage={noOptionsMessage}
		/>
	);
};

export default forwardRef(CustomSelect);
