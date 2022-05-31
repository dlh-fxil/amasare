import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const colors = {
	slate: "mt-checkbox-slate-500",
	gray: "mt-checkbox-gray-500",
	rose: "mt-checkbox-rose-500",
	violet: "mt-checkbox-deep-orange-500",
	orange: "mt-checkbox-orange-500",
	amber: "mt-checkbox-amber-500",
	yellow: "mt-checkbox-yellow-600",
	lime: "mt-checkbox-lime-500",
	emerald: "mt-checkbox-emerald-500",
	green: "mt-checkbox-green-500",
	teal: "mt-checkbox-teal-500",
	cyan: "mt-checkbox-cyan-500",
	sky: "mt-checkbox-sky-500",
	blue: "mt-checkbox-blue-500",
	indigo: "mt-checkbox-indigo-500",
	stone: "mt-checkbox-stone-500",
	purple: "mt-checkbox-purple-500",
	pink: "mt-checkbox-pink-500",
	red: "mt-checkbox-red-500",
};

const Checkbox = forwardRef(({ color, text, id, ...rest }, ref) => {
	return (
		<div className="flex items-center">
			<input
				ref={ref}
				{...rest}
				id={id}
				type="checkbox"
				className={`mt-checkbox ${colors[color]} hidden overflow-hidden`}
			/>
			<label
				htmlFor={id}
				className="flex items-center cursor-pointer text-gray-400 select-none transition-all duration-300">
				<span className="relative w-5 h-5 inline-block mr-2 rounded border border-gray-500 transition-all duration-300"></span>
				{text}
			</label>
		</div>
	);
});
export default Checkbox;
Checkbox.defaultProps = {
	color: "blue",
};

Checkbox.propTypes = {
	color: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};
