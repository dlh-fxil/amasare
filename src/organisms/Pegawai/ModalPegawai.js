import DialogModal from "@atoms/Modal";
import FormPegawai from "./FormPegawai";
export default function ModalPegawai({
	open = false,
	close = () => {},
	returnSuccess = () => {},
	editData = {},
}) {
	return (
		<DialogModal isOpen={open} closeModal={close}>
			<FormPegawai
				close={close}
				editData={editData}
				returnSuccess={returnSuccess}
			/>
		</DialogModal>
	);
}
