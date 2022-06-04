import "regenerator-runtime/runtime";
import { useState, forwardRef } from "react";
import { useAsyncDebounce } from "react-table";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import id from "date-fns/locale/id";
registerLocale("id", id);
const ColumnFilter = ({ column }) => {
	const { filterValue, setFilter } = column;
	const [value, setValue] = useState(filterValue);
	const onChange = useAsyncDebounce(value => {
		setFilter(value || undefined);
	}, 2000);
	return (
		<>
			<input
				className="border placeholder:text-stone-200 -mb-1.5 -mx-2 border-white focus:outline-none rounded px-2 bg-slate-800 bg-opacity-100 w-full text-white"
				placeholder="Cari"
				value={value || ""}
				onChange={e => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
			/>
		</>
	);
};
export function SelectColumnFilter({
	column: { filterValue, setFilter, options = [] },
}) {
	// Calculate the options for filtering
	// using the preFilteredRows
	// const options = React.useMemo(() => {
	// 	const options = new Set();
	// 	preFilteredRows.forEach(row => {
	// 		options.add(row.values[id]);
	// 	});
	// 	return [...options.values()];
	// }, [id, preFilteredRows]);

	// Render a multi-select box
	return (
		<select
			value={filterValue}
			onChange={e => {
				setFilter(e.target.value || undefined);
			}}>
			<option value="">All</option>
			{options.map((option, i) => (
				<option key={i} value={option}>
					{option}
				</option>
			))}
		</select>
	);
}
export function YearColumnFilter({ column: { filterValue, setFilter } }) {
	const [year, setYear] = useState(
		filterValue ? new Date(`July 21, ${filterValue} 01:15:00`) : null,
	);
	// if (condition) {
	// }
	// Calculate the options for filtering
	// using the preFilteredRows
	// const options = React.useMemo(() => {
	// 	const options = new Set();
	// 	preFilteredRows.forEach(row => {
	// 		options.add(row.values[id]);
	// 	});
	// 	return [...options.values()];
	// }, [id, preFilteredRows]);

	// Render a multi-select box
	const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
		<button
			className="bg-slate-100 text-sm font-medium w-[4.5rem] text-left  rounded border border-stone-500  px-1.5 py-0.5 example-custom-input"
			onClick={onClick}
			ref={ref}>
			{/* console.log(value); */}
			{value.length == 0 ? "Semua" : value}
		</button>
	));
	return (
		// <DatePicker
		// 	customInput={ExampleCustomInput}
		// 	selected={value}
		// 	// className="bg-transparent text-center font-medium  w-full outline-none -my-2 border-0 border-b focus:border-b-2 outline-transparent focus:ring-0 ring-transparent"
		// 	onChange={date => {
		// 		setFilter(date.getFullYear() || undefined);
		// 	}}
		// 	locale="id"
		// 	showYearPicker
		// 	dateFormat="yyyy"
		// 	// yearItemNumber={5}
		// 	// showTimeInput
		// 	withPortal
		// 	placeholderText="Pilih"
		// />
		<DatePicker
			selected={year}
			onChange={date => {
				setFilter(date ? date.getFullYear() : undefined);
			}}
			withPortal
			dateFormat="yyyy"
			showYearPicker
			isClearable
			customInput={<ExampleCustomInput />}
		/>
	);
}
export default ColumnFilter;
