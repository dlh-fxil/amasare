import DialogModal from "@atoms/Modal";
import FormUraianTugas from "./FormUraianTugas";

export default function ModalUraianTugas({
	open = false,
	close = () => {},
	returnSuccess = () => {},
	jabatanId = "",
	withJabatan = false,
	dataEdit = {},
}) {
	return (
		<DialogModal isOpen={open} closeModal={close}>
			<div className="bg-white p-6 w-full rounded-2xl">
				<div className="text-lg text-center md:tracking-widest tracking-wide md:uppercase font-bold  -mt-6 -mx-6 px-6 pt-6 pb-3 bg-slate-500 bg-opacity-25">
					Formulir Uraian Tugas
				</div>
				<div className="pt-3">
					<FormUraianTugas
						cancel={close}
						jabatanId={jabatanId}
						withJabatan={withJabatan}
						dataEdit={dataEdit}
						returnSuccess={returnSuccess}
					/>
				</div>
			</div>
		</DialogModal>
	);
}
