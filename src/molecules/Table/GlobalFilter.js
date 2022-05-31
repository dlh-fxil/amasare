import "regenerator-runtime/runtime";
import { useState } from "react";
import { useAsyncDebounce } from "react-table";

const GlobalFilter = ({ filter, setFilter }) => {
	const [value, setValue] = useState(filter);
	const onChange = useAsyncDebounce(value => {
		setFilter(value || undefined);
	}, 1000);
	return (
		<div className="flex w-1/2 gap-2 justify-center items-center">
			Cari:{" "}
			<input
				className="border w-full h-10"
				value={value || ""}
				onChange={e => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
			/>
		</div>
	);
};

export default GlobalFilter;
