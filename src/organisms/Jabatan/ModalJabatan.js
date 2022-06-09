import DialogModal from "@atoms/Modal";
import FormJabatan from "./FormJabatan";
import { useEffect } from "react";
export default function ModalJabatan({
	open = false,
	close = () => {},
	returnSuccess = () => {},
	dataEdit = {},
}) {
	// useEffect(() => {
	// 	if (editData.id) {
	// 		setOpenModalForm(true);
	// 		console.log(editData);
	// 	}
	// }, [editData]);
	return (
		<DialogModal isOpen={open} closeModal={close}>
			<FormJabatan
				close={close}
				dataEdit={dataEdit}
				returnSuccess={returnSuccess}
			/>
		</DialogModal>
	);
}
