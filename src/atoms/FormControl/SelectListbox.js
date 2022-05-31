import { forwardRef } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useController, useForm } from "react-hook-form";
// React.forwardRef(({ placeholder, color, size, outline, error, success, ...rest }, ref)
const SelectListbox = forwardRef(({ control, optionLabel, name, ...rest }, ref) => {
	const { field } = useController({
		name,
		control,
	});
	const hasValue = field.value;
	const options = [
		{ id: 1, name: "Durward Reynolds", unavailable: false },
		{ id: 2, name: "Kenton Towne", unavailable: false },
		{ id: 3, name: "Therese Wunsch", unavailable: false },
		{ id: 4, name: "Benedict Kessler", unavailable: true },
		{ id: 5, name: "Katelyn Rohan", unavailable: false },
	];

	return (
		<Listbox {...rest} className="relative" as="div" onChange={field.onChange} value={field.value}>
			<Listbox.Label
				className={({ open }) => {
					return `${open || hasValue ? "font-bold leading-tight" : "absolute z-10"}`;
				}}>
				Assignee:
			</Listbox.Label>
			{/* <span className="inline-block w-full rounded-md shadow-sm"> */}
			<Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
				<span className="block truncate">{field.value.name}</span>
			</Listbox.Button>
			<Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
				<Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
					<Listbox.Option value="" className={({ active }) => `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? "text-amber-900 bg-amber-100" : "text-gray-900"}`}>
						--
					</Listbox.Option>
					{options.map(item => (
						<Listbox.Option
							key={item.id}
							value={item}
							disabled={item.unavailable}
							className={({ active }) => `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? "text-amber-900 bg-amber-100" : "text-gray-900"}`}>
							{item.name}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</Transition>
			{/* </span> */}
		</Listbox>
	);
});
export default SelectListbox;
