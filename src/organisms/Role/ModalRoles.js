import DialogModal from "@atoms/Modal";
import FormRole from "./FormRole";
export default function ModalRoles({
	open = false,
	close = () => {},
	returnSuccess = () => {},
	editData = {},
}) {
	return (
		<DialogModal isOpen={open} closeModal={close}>
			<FormRole
				close={close}
				editData={editData}
				returnSuccess={returnSuccess}
			/>
		</DialogModal>
	);
}
