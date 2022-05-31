import React, { useState, forwardRef, useEffect } from "react";
import PropTypes from "prop-types";

const mtTextareaColors = {
	slate: "mt-input-slate-500",
	gray: "mt-input-gray-500",
	rose: "mt-input-rose-500",
	violet: "mt-input-violet-500",
	orange: "mt-input-orange-500",
	amber: "mt-input-amber-500",
	yellow: "mt-input-yellow-600",
	lime: "mt-input-lime-500",
	emerald: "mt-input-emerald-500",
	green: "mt-input-green-500",
	teal: "mt-input-teal-500",
	cyan: "mt-input-cyan-500",
	sky: "mt-input-sky-500",
	blue: "mt-input-blue-500",
	indigo: "mt-input-indigo-500",
	stone: "mt-input-stone-500",
	purple: "mt-input-purple-500",
	pink: "mt-input-pink-500",
	red: "mt-input-red-500",
};

const mtTextareaOutlineColors = {
	slate: "mt-input-outline-slate-500",
	gray: "mt-input-outline-gray-500",
	rose: "mt-input-outline-rose-500",
	violet: "mt-input-outline-violet-500",
	orange: "mt-input-outline-orange-500",
	amber: "mt-input-outline-amber-500",
	yellow: "mt-input-outline-yellow-600",
	lime: "mt-input-outline-lime-500",
	emerald: "mt-input-outline-emerald-500",
	green: "mt-input-outline-green-500",
	teal: "mt-input-outline-teal-500",
	cyan: "mt-input-outline-cyan-500",
	sky: "mt-input-outline-sky-500",
	blue: "mt-input-outline-blue-500",
	indigo: "mt-input-outline-indigo-500",
	stone: "mt-input-outline-stone-500",
	purple: "mt-input-outline-purple-500",
	pink: "mt-input-outline-pink-500",
	red: "mt-input-outline-red-500",
};

const borderColors = {
	slate: "border-slate-500",
	gray: "border-gray-500",
	rose: "border-rose-500",
	violet: "border-violet-500",
	orange: "border-orange-500",
	amber: "border-amber-500",
	yellow: "border-yellow-600",
	lime: "border-lime-500",
	emerald: "border-emerald-500",
	green: "border-green-500",
	teal: "border-teal-500",
	cyan: "border-cyan-500",
	sky: "border-sky-500",
	blue: "border-blue-500",
	indigo: "border-indigo-500",
	stone: "border-stone-500",
	purple: "border-purple-500",
	pink: "border-pink-500",
	red: "border-red-500",
};

const focusBorderColors = {
	slate: "focus:border-slate-500",
	gray: "focus:border-gray-500",
	rose: "focus:border-rose-500",
	violet: "focus:border-violet-500",
	orange: "focus:border-orange-500",
	amber: "focus:border-amber-500",
	yellow: "focus:border-yellow-600",
	lime: "focus:border-lime-500",
	emerald: "focus:border-emerald-500",
	green: "focus:border-green-500",
	teal: "focus:border-teal-500",
	cyan: "focus:border-cyan-500",
	sky: "focus:border-sky-500",
	blue: "focus:border-blue-500",
	indigo: "focus:border-indigo-500",
	stone: "focus:border-stone-500",
	purple: "focus:border-purple-500",
	pink: "focus:border-pink-500",
	red: "focus:border-red-500",
};
const Textarea = forwardRef(
	({ placeholder, color, size, outline, error, success, ...rest }, ref) => {
		const [rows, setRows] = useState(1);
		const [focus, setFocus] = useState(false);
		const [value, setValue] = useState(rest.value ?? "");
		const thisFocus = () => setFocus(true);
		const thisBlur = () => setFocus(false);

		useEffect(() => {
			const el = document.getElementById(`text_area_${rest.name}`);
			const textareaLineHeight = 24;
			const previousRows = el.rows;
			el.rows = 1;
			const currentRows = ~~(el.scrollHeight / textareaLineHeight);
			if (currentRows === previousRows) {
				el.rows = currentRows;
			}
			if (currentRows >= 7) {
				el.rows = 7;
				el.scrollTop = el.scrollHeight;
			}
			setRows(currentRows < 7 ? currentRows : 7);
		}, [value]);
		let labelBorderColor,
			mtTextareaBorderColor,
			mtTextareaOutlineColor,
			mtTextareaOutlineFocusColor,
			textareaClasses = [];
		let container = [
			"w-full",
			"transition-all",
			"duration-300",
			"h-full",
			"relative",
			error ? "mb-1" : "",
			value || focus ? "mt-6" : "",
		];

		if (error) {
			labelBorderColor = borderColors["red"];
			mtTextareaBorderColor = mtTextareaColors["red"];
			mtTextareaOutlineColor = mtTextareaOutlineColors["red"];
			mtTextareaOutlineFocusColor = borderColors["red"];
		} else if (success) {
			labelBorderColor = borderColors["green"];
			mtTextareaBorderColor = mtTextareaColors["green"];
			mtTextareaOutlineColor = mtTextareaOutlineColors["green"];
			mtTextareaOutlineFocusColor = borderColors["green"];
		} else {
			labelBorderColor = "border-slate-500";
			mtTextareaBorderColor = mtTextareaColors[color];
			mtTextareaOutlineColor = mtTextareaOutlineColors[color];
			mtTextareaOutlineFocusColor = borderColors[color];
		}

		let label = [
			"text-current",
			"absolute",
			"font-bold",
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
			"resize-none",
			"focus:outline-none",
			"focus:ring-0",
			"focus:text-current",
		];
		const textareaSM = [
			...sharedClasses,
			`${outline ? "px-3" : "px-0"}`,
			`${outline && "pt-1.5 pb-0.5"}`,
			"text-sm",
		];
		const textareaRegular = [
			...sharedClasses,
			`${outline ? "px-3" : "px-0"}`,
			`${outline && "pt-2.5 pb-1.5"}`,
		];

		const textareaFilled = [
			mtTextareaBorderColor,
			"mt-input",
			"textarea ",
			"bg-transparent",
			"border-none",
		];

		const textareaOutline = [
			mtTextareaOutlineColor,
			labelBorderColor,
			"mt-input-outline",
			"bg-transparent",
			"border",
			"border-1",
			"border-gray-300",
			"rounded-lg",
			"focus:border-2",
		];

		if (size === "sm") {
			textareaClasses.push(...textareaSM);
		} else {
			textareaClasses.push(...textareaRegular);
		}

		outline ? textareaClasses.push(...textareaOutline) : textareaClasses.push(...textareaFilled);

		container = container.join(" ");
		label = label.join(" ");
		textareaClasses = textareaClasses.join(" ");

		return (
			<div className={container}>
				<textarea
					id={`text_area_${rest.name}`}
					onBlurCapture={thisBlur}
					onFocusCapture={thisFocus}
					onInput={e => setValue(e.target.value)}
					ref={ref}
					{...rest}
					placeholder=" "
					className={`
                    ${textareaClasses}
                    ${error && outline && "mt-input-outline-error"}
                    ${success && outline && "mt-input-outline-success"}`}
					rows={rows}
				/>
				<label className={label}>
					{outline ? (
						placeholder
					) : (
						<span
							className={`${
								size === "sm" && "text-sm"
							} absolute top-1 transition-all duration-300`}>
							{placeholder}
						</span>
					)}
				</label>
				{error && (
					<span
						className={`block absolute ${
							outline ? "-bottom-4" : "-bottom-5"
						} text-xs text-red-500`}>
						{error}
					</span>
				)}
				{success && (
					<span
						className={`block absolute ${
							outline ? "-bottom-4" : "-bottom-5"
						} text-xs text-green-500`}>
						{success}
					</span>
				)}
			</div>
		);
	},
);
export default Textarea;
Textarea.defaultProps = {
	color: "blue",
	size: "regular",
	outline: false,
};

Textarea.propTypes = {
	placeholder: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	size: PropTypes.string.isRequired,
	outline: PropTypes.bool.isRequired,
	error: PropTypes.any,
	success: PropTypes.any,
};
