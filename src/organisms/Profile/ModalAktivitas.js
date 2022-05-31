import DialogModal from "@atoms/Modal";
import FormAktivitas from "@organisms/Aktivitas/FormAktivitas";
import React from "react";

const ModalAktivitas = ({
	open = false,
	close = () => {},
	editAktivitas = {},
	returnSuccess = () => {},
} = {}) => {
	return (
		<DialogModal size="xl" isOpen={open} closeModal={close}>
			<div className="min-w-max">
				<FormAktivitas
					returnSuccess={returnSuccess}
					close={close}
					editData={editAktivitas}
				/>
			</div>
		</DialogModal>
	);
};
export default ModalAktivitas;
