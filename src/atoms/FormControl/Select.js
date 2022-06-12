import { forwardRef, useEffect, useState } from "react";
import Select, { components } from "react-select";

export const MySelect = (
	{ options = [], indexDefaultValue, onChange = () => {}, ...rest },
	ref,
) => {
	const noOptionsMessage = input => input?.inputValue + " tidak ditemukan";
	const [index, setIndex] = useState(-1);
	useEffect(() => {
		setIndex(indexDefaultValue ?? -1);
		return () => setIndex(-1);
	}, [indexDefaultValue]);
	useEffect(() => {}, [index]);
	const customStyles = {
		control: (provided, state) => ({
			...provided,
			borderBottom: "1px dotted pink",
			backgroundColor: "transparent",
			border: "0px solid",
			borderRadius: "0px solid",
			outline: "none",
			boxShadow: "0",
			minHeight: "fit-content",
			color: "currentColor",
		}),
		// placeholder: (provided, state) => ({
		// 	...provided,
		// 	color: "currentColor",
		// }),
		menu: (provided, state) => ({
			...provided,
			backgroundColor: "rgb(226 232 240)",
			color: "black",
		}),
		menuList: (provided, state) => ({
			...provided,
			color: "currentColor",
			lineHeight: "24px",
			fontSize: "14px",
		}),
		noOptionsMessage: (provided, state) => ({
			...provided,
			color: "currentColor",
			lineHeight: "24px",
			fontSize: "14px",
		}),
		input: (provided, state) => ({
			...provided,
			fontSize: "14px",
			color: "currentColor",
		}),
		singleValue: (provided, state) => ({
			...provided,
			fontSize: "14px",
			color: "currentColor",
		}),
		valueContainer: (provided, state) => ({
			...provided,
			fontSize: "14px",
			color: "currentColor",
		}),
		dropdownIndicator: (provided, state) => ({
			...provided,
			height: "fit-content",
			padding: "4px",
			color: "currentColor",
		}),
		clearIndicator: (provided, state) => ({
			...provided,
			height: "fit-content",
			padding: "4px",
			color: "currentColor",
		}),
		valueContainer: (provided, state) => ({
			...provided,
			height: "fit-content",
			color: "currentColor",
		}),
	};

	return (
		<Select
			{...rest}
			ref={ref}
			className="w-full text-left text-base  font-normal h-fit leading-tight border-b border-slate-500"
			classNamePrefix="react_select"
			options={options}
			defaultValue={options[index]}
			onChange={e => {
				onChange(e?.value);
				setIndex(e?.value);
			}}
			// isMulti
			styles={customStyles}
			noOptionsMessage={noOptionsMessage}
		/>
	);
};
export const App = (
	{ options = [], value = "", onChange = () => {}, ...rest },
	ref,
) => {
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

export default forwardRef(MySelect);
