import { forwardRef, useEffect, useState } from "react";
import Select from "react-select";
const MySelect = ({ options, key, defaultValue, onChange, ...rest }, ref) => {
	const noOptionsMessage = input => input?.inputValue + " tidak ditemukan";

	return (
		<Select
			{...rest}
			ref={ref}
			className="font-normal text-sm w-full text-left z-10 border-0  text-slate-800"
			classNamePrefix="select"
			options={options}
			defaultValue={defaultValue}
			onChange={e => onChange(e?.value)}
			noOptionsMessage={noOptionsMessage}
		/>
	);
};
const App = (
	{ options = [], value = "", onChange = () => {}, ...rest },
	ref,
) => {
	const [key, setKey] = useState(-2);

	useEffect(() => {
		if (options.length) {
			const defaultValue = options?.filter(option => option.value == value);
			if (defaultValue?.length) {
				setKey(defaultValue[0].key);
			} else {
				setKey(-1);
			}
		}
	}, [options, value]);
	const select = MySelect({
		options: options,
		defaultValue: options[key],
		onChange,
	});
	if (options.length && key > -2) {
		return select;
	}
	return <></>;
};

export default forwardRef(App);
