import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useRef } from "react";
const DialogModal = ({
	children,
	isOpen = false,
	closeModal = () => {},
	size = "md",
} = {}) => {
	const completeButtonRef = useRef(null);
	let classes = "max-w-md";
	if (size === "sm") {
		classes = "max-w-sm";
	} else if (size === "lg") {
		classes = "max-w-lg";
	} else if (size === "xl") {
		classes = "max-w-xl";
	}
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				open={isOpen}
				onClose={() => {
					closeModal();
				}}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-black bg-opacity-75" />
				</Transition.Child>

				<div className="fixed inset-0 my-6 overflow-auto">
					{/* <div className="fixed inset-0 z-40 h-fit transform top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 "> */}
					<div className="flex items-center min-h-full justify-center text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<Dialog.Panel
								className={`text-left ${classes} w-full transform  transition-all`}>
								{children}
							</Dialog.Panel>
						</Transition.Child>
						{/* <div
								ref={completeButtonRef}
								className="hidden"></div> */}
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};
export default DialogModal;
