import { Fragment, useState, forwardRef, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
const ComboBox = forwardRef(
	(
		{
			placeholder,
			error,
			success,
			options,
			value,
			autoComplete = "",
			onChange = () => {},
			...rest
		},
		ref,
	) => {
		const [selected, setSelected] = useState();
		const [focus, setFocus] = useState(false);
		const thisFocus = () => setFocus(true);
		const thisBlur = () => setFocus(false);
		useEffect(() => {
			setSelected();
			if (options && value) {
				const defaultValue = options?.filter(option => option.value == value);
				if (defaultValue) {
					setSelected(defaultValue[0]);
				}
			}
		}, [options, value]);
		const [query, setQuery] = useState("");
		const filteredOption =
			query === ""
				? options
				: options?.filter(option =>
						option.label
							.toLowerCase()
							.replace(/\s+/g, "")
							.includes(query.toLowerCase().replace(/\s+/g, "")),
				  );

		return (
			<>
				<div
					ref={ref}
					className={`relative transition-all duration-300 ${
						focus || selected ? "mt-6" : "my-1"
					}`}>
					<Combobox
						{...rest}
						nullable
						value={selected}
						onChange={e => {
							setSelected(e);
							onChange(e.value);
						}}>
						{({ open }) => (
							<div className="relative">
								<div
									className={`focus:outline-none relative w-full cursor-default overflow-hidden bg-transparent  focus:border-0 text-left  ${
										open || focus
											? "border-0 outline-none "
											: "border-b border-slate-500 "
									}`}
									onFocus={thisFocus}
									onBlur={thisBlur}>
									<Combobox.Input
										autoComplete={autoComplete}
										className={`w-full bg-transparent pt-2.5 pb-1.5 pl-3 pr-10 text-base leading-5 text-current border-t-0 ring-0 focus:outline-none transform transition-all duration-300 ${
											open || focus
												? "border-b-2 border-t-0  border-x-0  border-blue-500"
												: "border-none outline-0 outline-none ring-0"
										}`}
										displayValue={option => option?.label}
										onChange={event => setQuery(event.target.value)}
									/>
									<Combobox.Button className="absolute bg-transparent inset-y-0 right-0 flex items-center pr-2">
										<SelectorIcon
											className="h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
									</Combobox.Button>
								</div>

								<Transition
									as={Fragment}
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
									afterLeave={() => setQuery("")}>
									<Combobox.Options className="focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 z-10">
										{(filteredOption?.length === 0 && query !== "") ||
										!options.length ? (
											<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
												Tidak ada pilihan.
											</div>
										) : (
											filteredOption?.map(option => (
												<Combobox.Option
													key={option.key}
													className={({ active }) =>
														`relative cursor-default select-none py-2 pl-10 pr-4 ${
															active
																? "bg-teal-600 text-white"
																: "text-gray-900"
														}`
													}
													value={option}>
													{({ selected, active }) => (
														<>
															<span
																className={`block whitespace-normal truncate ${
																	selected ? "font-medium" : "font-normal"
																}`}>
																{option.label}
															</span>
															{selected ? (
																<span
																	className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																		active ? "text-white" : "text-teal-600"
																	}`}>
																	<CheckIcon
																		className="h-5 w-5"
																		aria-hidden="true"
																	/>
																</span>
															) : null}
														</>
													)}
												</Combobox.Option>
											))
										)}
									</Combobox.Options>
								</Transition>
							</div>
						)}
					</Combobox>
					<label
						className={`absolute pointer-events-none transition-all duration-300 text-base font-bold h-full   ${
							focus || selected ? "-top-5 text-blue-500" : "text-current top-2"
						}`}>
						{placeholder}
					</label>
					{error && (
						<span className="block mt-0.5 text-xs text-red-500">{error}</span>
					)}
					{success && (
						<span className="block mt-0.5 text-xs text-green-500">
							{success}
						</span>
					)}
				</div>
			</>
		);
	},
);
export default ComboBox;
