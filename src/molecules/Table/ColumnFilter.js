import "regenerator-runtime/runtime";
import { useState, forwardRef, useEffect } from "react";
import { useAsyncDebounce } from "react-table";
import DatePicker from "react-datepicker";

import Select from "@atoms/FormControl/Select";

const ColumnFilter = ({ column }) => {
	const { filterValue, setFilter } = column;
	const [value, setValue] = useState("");

	useEffect(() => {
		setValue(filterValue ?? "");
	}, [filterValue]);
	const onChange = useAsyncDebounce(value => {
		setFilter(value || undefined);
	}, 2000);
	return (
		<>
			<input
				className="border shadow rounded-lg border-dotted placeholder:text-stone-500 -mx-2 border-slate-700 focus:outline-none  tex px-2 py-0.5 bg-transparent w-full"
				placeholder="Cari"
				value={value}
				onChange={e => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
			/>
		</>
	);
};
export function SelectColumnFilter({ column = {}, options = [] }) {
	const { filterValue, setFilter } = column;
	const [indexValue, setIndexValue] = useState(-1);
	useEffect(() => {
		setIndexValue(filterValue ?? -1);
	}, [filterValue]);
	return (
		<Select
			instanceId="unit_id"
			indexDefaultValue={indexValue}
			isClearable={true}
			onChange={val => {
				setFilter(val);
				setIndexValue(val);
			}}
			options={options}
			placeholder="Pilih Bidang"
			isSearchable
		/>
	);
}
export const YearColumnFilter = ({ column: { filterValue, setFilter } }) => {
	const [year, setYear] = useState(null);
	const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
		<button
			className="bg-slate-100 text-sm font-medium w-[4.5rem] text-left focus:border-b-2  rounded border-b border-slate-900  px-1.5 py-0.5 example-custom-input"
			onClick={onClick}
			ref={ref}>
			{value.length == 0 ? "Semua" : value}
		</button>
	));
	return (
		<DatePicker
			selected={year}
			onChange={date => {
				setFilter(date ? date.getFullYear() : undefined);
				setYear(date);
			}}
			withPortal
			dateFormat="yyyy"
			showYearPicker
			isClearable
			customInput={<ExampleCustomInput />}
		/>
	);
};
export default ColumnFilter;
