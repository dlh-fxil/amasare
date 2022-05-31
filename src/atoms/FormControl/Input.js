import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";
const mtInputColors = {
	slate: "mt-input-slate-500",
	rose: "mt-input-rose-500",
	violet: "mt-input-violet-500",
	emerald: "mt-input-emerald-500",
	sky: "mt-input-sky-500",
	stone: "mt-input-stone-500",
	gray: "mt-input-gray-500",
	orange: "mt-input-orange-500",
	amber: "mt-input-amber-500",
	yellow: "mt-input-yellow-600",
	lime: "mt-input-lime-500",
	green: "mt-input-green-500",
	teal: "mt-input-teal-500",
	cyan: "mt-input-cyan-500",
	blue: "mt-input-blue-500",
	indigo: "mt-input-indigo-500",
	purple: "mt-input-purple-500",
	pink: "mt-input-pink-500",
	red: "mt-input-red-500",
};

const mtInputOutlineColors = {
	slate: "mt-input-outline-slate-500",
	rose: "mt-input-outline-rose-500",
	violet: "mt-input-outline-violet-500",
	emerald: "mt-input-outline-emerald-500",
	sky: "mt-input-outline-sky-500",
	stone: "mt-input-outline-stone-500",
	gray: "mt-input-outline-gray-500",
	orange: "mt-input-outline-orange-500",
	amber: "mt-input-outline-amber-500",
	yellow: "mt-input-outline-yellow-600",
	lime: "mt-input-outline-lime-500",
	green: "mt-input-outline-green-500",
	teal: "mt-input-outline-teal-500",
	cyan: "mt-input-outline-cyan-500",
	blue: "mt-input-outline-blue-500",
	indigo: "mt-input-outline-indigo-500",
	purple: "mt-input-outline-purple-500",
	pink: "mt-input-outline-pink-500",
	red: "mt-input-outline-red-500",
};

const borderColors = {
	slate: "border-slate-500",
	rose: "border-rose-500",
	violet: "border-violet-500",
	emerald: "border-emerald-500",
	sky: "border-sky-500",
	stone: "border-stone-500",
	gray: "border-gray-500",
	orange: "border-orange-500",
	amber: "border-amber-500",
	yellow: "border-yellow-600",
	lime: "border-lime-500",
	green: "border-green-500",
	teal: "border-teal-500",
	cyan: "border-cyan-500",
	blue: "border-blue-500",
	indigo: "border-indigo-500",
	purple: "border-purple-500",
	pink: "border-pink-500",
	red: "border-red-500",
};

const Input = forwardRef(({ placeholder, color, size, outline, error, success, ...rest }, ref) => {
	const [focus, setFocus] = useState(false);
	const [value, setValue] = useState(rest.value ?? "");
	const thisFocus = () => setFocus(true);
	const thisBlur = () => setFocus(false);
	let labelBorderColor,
		mtInputBorderColor,
		mtInputOutlineColor,
		mtInputOutlineFocusColor,
		inputClasses = [];

	let container = [
		"w-full",
		"transition-all",
		"duration-300",
		"relative",
		error ? "mb-4" : "",
		value || focus ? "mt-6" : "",
	];

	if (error) {
		labelBorderColor = borderColors["red"];
		mtInputBorderColor = mtInputColors["red"];
		mtInputOutlineColor = mtInputOutlineColors["red"];
		mtInputOutlineFocusColor = borderColors["red"];
	} else if (success) {
		labelBorderColor = borderColors["green"];
		mtInputBorderColor = mtInputColors["green"];
		mtInputOutlineColor = mtInputOutlineColors["green"];
		mtInputOutlineFocusColor = borderColors["green"];
	} else {
		labelBorderColor = "border-slate-500";
		mtInputBorderColor = mtInputColors[color];
		mtInputOutlineColor = mtInputOutlineColors[color];
		// mtInputOutlineFocusColor = borderColors[color];
	}

	let label = [
		"text-current",
		"absolute",
		"",
		"left-0",
		`${outline ? "-top-1.5" : "-top-0.5"}`,
		"w-full",
		"h-full",
		`${!outline && "border border-t-0 border-l-0 border-r-0 border-b-1"}`,
		labelBorderColor,
		"pointer-events-none",
		`${outline && "flex"}`,
		`${outline && size === "sm" && "text-sm"}`,
		`${outline && "leading-10"}`,
		`${outline && "transition-all"}`,
		`${outline && "duration-300"}`,
	];

	const sharedClasses = [
		"w-full",
		"h-full",
		"text-current",
		"leading-normal",
		"shadow-none",
		"outline-none",
		"focus:outline-none",
		"focus:ring-0",
		"focus:text-current",
	];

	const inputSM = [
		...sharedClasses,
		`${outline ? "px-3" : "px-2"}`,
		`${outline && "pt-1.5 pb-0.5"}`,
		"text-sm",
	];
	const inputRegular = [
		...sharedClasses,
		`${outline ? "px-3" : "px-2"}`,
		`${outline && "pt-2.5 pb-1.5"}`,
	];
	const inputLG = [
		...sharedClasses,
		`${outline ? "px-3" : "px-0"}`,
		`${outline && "pt-3.5 pb-2.5"}`,
	];

	const inputFilled = [mtInputBorderColor, "mt-input", "mt-input", "bg-transparent", "border-none"];

	const inputOutline = [
		mtInputOutlineColor,
		labelBorderColor,
		"mt-input-outline",
		"bg-transparent",
		"border",
		"border-slate-500",
		"rounded-lg",
		"focus:border-2",
		`focus:${mtInputOutlineFocusColor}`,
	];

	if (size === "sm") {
		container.push("h-9");
		inputClasses.push(...inputSM);
	} else if (size === "lg") {
		container.push("h-12");
		inputClasses.push(...inputLG);
	} else {
		container.push("h-11");
		inputClasses.push(...inputRegular);
	}

	outline ? inputClasses.push(...inputOutline) : inputClasses.push(...inputFilled);

	container = container.join(" ");
	label = label.join(" ");
	inputClasses = inputClasses.join(" ");

	return (
		<div className={container}>
			<input
				onBlurCapture={thisBlur}
				onFocusCapture={thisFocus}
				onInput={event => setValue(event.target.value)}
				placeholder=" "
				className={`${inputClasses} ${error && "mt-input-outline-error"} ${
					success && "mt-input-outline-success"
				}`}
				ref={ref}
				{...rest}
			/>
			<label className={label}>
				{outline ? (
					placeholder
				) : (
					<span
						className={`${
							size === "sm" && "text-sm"
						} absolute top-4 font-bold transition-all duration-300`}>
						{placeholder}
					</span>
				)}
			</label>
			{!!error && <span className="block mt-0.5 text-xs text-red-500">{error}</span>}
			{!!success && <span className="block mt-0.5 text-xs text-green-500">{success}</span>}
		</div>
	);
});
export default Input;
Input.defaultProps = {
	placeholder: "placeholder",
	color: "blue",
	size: "regular",
	outline: false,
};

Input.propTypes = {
	placeholder: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	size: PropTypes.string.isRequired,
	outline: PropTypes.bool.isRequired,
	error: PropTypes.any,
	success: PropTypes.any,
};
