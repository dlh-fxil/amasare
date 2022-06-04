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
			<FormUraianTugas
				close={close}
				jabatanId={jabatanId}
				withJabatan={withJabatan}
				dataEdit={dataEdit}
				returnSuccess={returnSuccess}
			/>
		</DialogModal>
	);
}
