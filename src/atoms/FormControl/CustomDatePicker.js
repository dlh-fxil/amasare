import DatePicker from "react-datepicker";
import { useState, forwardRef } from "react";
import Input from "./Input";
export const YearPiccker = ({ value, onChange, placeholder, error }) => {
	const [startDate, setStartDate] = useState(new Date());
	 useEffect(() => {
		 if (value){
			 setStartDate(new Date(value, 11, 17, 0, 0, 0, 0)
		 }
  },[value]);
	const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
		<Input
			placeholder={placeholder}
			value={value}
			onFocus={onClick}
			onClick={onClick}
			error={error}
		/>
	));
	return (
		// <div className="w-full">
		<DatePicker
			selected={startDate}
			onChange={date => {
				onChange(date ? date.getFullYear() : undefined);
				setNewDate(date ? date : undefined);
			}}
			withPortal
			dateFormat="yyyy"
			showYearPicker
			customInput={<ExampleCustomInput />}
			portalId="root-portal"
		/>
	);
};
