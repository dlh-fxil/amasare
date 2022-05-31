import React, { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
const SelectPerPage = ({ options, value, setValue, ...props }) => {
	return (
		<Listbox as="div" className={`relative ${props.className}`} value={value} onChange={setValue}>
			<Listbox.Button className="relative flex w-fit gap-1 py-2 px-2 rounded-lg shadow-md cursor-default border border-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
				<span className="truncate"> {value.value ?? value}</span>
				<span className="flex items-center -mr-2 pointer-events-none">
					<SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
				</span>
			</Listbox.Button>
			<Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
				<Listbox.Options className="absolute z-20 w-full px-2 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
					{options.map((item, itemIdx) => (
						<Listbox.Option
							key={itemIdx}
							className={({ active }) => `cursor-default mx-auto w-fit flex gap-2 text-center select-none p-2 ${active ? "text-amber-900 bg-amber-100" : "text-gray-900"}`}
							value={item}>
							{({ selected }) => <span className={`block truncate ${selected ? "font-bold text-blue-900" : "font-normal"}`}>{item.value ?? item}</span>}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</Transition>
		</Listbox>
	);
};

export default SelectPerPage;
