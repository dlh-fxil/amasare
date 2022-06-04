import DialogModal from "@atoms/Modal";
import FormProfilePegawai from "./FormProfilePegawai";
import { showUser } from "@hooks/api/ManajemenUser/users";
import { useEffect, useState } from "react";
const ModalEditProfile = ({
	open = false,
	close = () => {},
	user = {},
	returnSuccess = () => {},
}) => {
	const [dataUser, setDataUser] = useState({});

	return (
		<DialogModal size="xl" isOpen={open} closeModal={close}>
			<FormProfilePegawai
				dataUser={user}
				close={close}
				returnSuccess={returnSuccess}
			/>
		</DialogModal>
	);
};
export default ModalEditProfile;
