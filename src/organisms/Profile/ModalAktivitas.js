import DialogModal from "@atoms/Modal";
import FormAktivitas from "@organisms/Aktivitas/FormAktivitas";
import React from "react";
import { useAuth } from "@hooks/api/auth";
const ModalAktivitas = ({
	open = false,
	close = () => {},
	editAktivitas = {},
	responseFromChild = () => {},
} = {}) => {
	const { user } = useAuth({ middleware: "auth" });
	return (
		<DialogModal size="xl" isOpen={open} closeModal={close}>
			<div className="min-w-max">
				<FormAktivitas
					responseFromChild={responseFromChild}
					close={close}
					editData={editAktivitas}
					user={user}
				/>
			</div>
		</DialogModal>
	);
};
export default ModalAktivitas;
