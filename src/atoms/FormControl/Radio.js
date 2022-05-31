import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const colors = {
	slate: "mt-radio-slate-500",
	gray: "mt-radio-gray-500",
	rose: "mt-radio-rose-500",
	violet: "mt-radio-deep-orange-500",
	orange: "mt-radio-orange-500",
	amber: "mt-radio-amber-500",
	yellow: "mt-radio-yellow-600",
	lime: "mt-radio-lime-500",
	emerald: "mt-radio-emerald-500",
	green: "mt-radio-green-500",
	teal: "mt-radio-teal-500",
	cyan: "mt-radio-cyan-500",
	sky: "mt-radio-sky-500",
	blue: "mt-radio-blue-500",
	indigo: "mt-radio-indigo-500",
	stone: "mt-radio-stone-500",
	purple: "mt-radio-purple-500",
	pink: "mt-radio-pink-500",
	red: "mt-radio-red-500",
};

const Radio = forwardRef(({ color, labelFont, text, id, ...rest }, ref) => {
	return (
		<div className="flex items-center">
			<input
				ref={ref}
				{...rest}
				id={id}
				type="radio"
				className={`mt-radio ${colors[color]} hidden overflow-hidden`}
			/>
			<label
				htmlFor={id}
				className={`${labelFont} flex items-center cursor-pointer text-current select-none transition-all duration-300 `}>
				<span
					className={`relative w-4 h-4 inline-block mr-2 rounded border border-slate-500 transition-all duration-300 mt-radio`}></span>
				{text}
			</label>
		</div>
	);
});
export default Radio;
Radio.defaultProps = {
	color: "blue",
};

Radio.propTypes = {
	color: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};
