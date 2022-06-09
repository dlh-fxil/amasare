import { Button } from "@atoms/FormControl";
import Icons from "@atoms/Icons";
import DialogModal from "@atoms/Modal";
export const ConfirmDelete = ({
	open = false,
	close = () => {},
	itemId = 0,
	deleteAction = () => {},
}) => {
	return (
		<DialogModal size="sm" isOpen={open} closeModal={close}>
			<div className="w-full">
				<div className="h-fit flex-shrink-0 tracking-widest flex items-center justify-center gap-2 text-center text-rose-800  text-lg font-bold uppercase rounded-t-lg bg-yellow-50">
					<Icons icon="ExclamationIcon" className="w-6 h-6 text-red-500" />
					<span className="py-2">Pringatan</span>
				</div>
				<div className="form">
					<div className="text-slate-800 py-2 px-6   bg-yellow-100">
						{" "}
						Apa Anda Yakin Mengahapus data ini?
					</div>
				</div>
				<div className="bg-slate-200  rounded-b-lg p-3 flex justify-around">
					<Button type="button" onClick={close} color="slate">
						<Icons icon="XIcon" className="-ml-2 w-4 h-4 text-sky-200" />
						Batal
					</Button>
					<Button
						type="button"
						onClick={() => deleteAction(itemId)}
						color="red">
						<Icons icon="TrashIcon" className="-ml-2 w-4 h-4 text-sky-200" />
						Hapus
					</Button>
				</div>
			</div>
		</DialogModal>
	);
};
