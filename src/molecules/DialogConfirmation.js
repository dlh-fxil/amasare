import { Button } from "@atoms/FormControl";
import Icons from "@atoms/Icons";
import DialogModal from "@atoms/Modal";
import { forwardRef } from "react";
const DialogConfirmation = (
	{ open = false, close = () => {}, action = () => {}, children } = {},
	ref,
) => {
	return (
		<DialogModal ref={ref} size="sm" isOpen={open} closeModal={close}>
			<div className="w-full">
				<div className="h-fit flex-shrink-0 tracking-widest flex items-center justify-center gap-2 text-center text-rose-800  text-lg font-bold uppercase rounded-t-lg bg-yellow-50">
					<Icons icon="ExclamationIcon" className="w-6 h-6 text-red-500" />
					<span className="py-2">Pringatan</span>
				</div>
				<div className="form">
					<div className="text-slate-800 py-2 px-6 text-center  bg-yellow-100">
						{children}
					</div>
				</div>
				<div className="bg-slate-200  rounded-b-lg p-3 flex justify-around">
					<Button type="button" onClick={e => close()} color="red">
						<Icons className="-ml-4 -my-4 w-6 h-6 text-rose-300 group-hover:text-white" />
						Tidak
					</Button>
					<Button type="button" onClick={action} color="lime">
						Yakin
						<Icons
							icon="CheckCircleIcon"
							className="-mr-4 -my-4 w-6 h-6 text-lime-300 group-hover:text-white"
						/>
					</Button>
				</div>
			</div>
		</DialogModal>
	);
};
export default forwardRef(DialogConfirmation);
