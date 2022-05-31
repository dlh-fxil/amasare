import DialogModal from "@atoms/Modal";
import FormProfilePegawai from "./FormProfilePegawai";
import { showUser } from "@hooks/api/ManajemenUser/users";
import { useEffect, useState } from "react";
const ModalEditProfile = ({
	open = false,
	close = () => {},
	userId = 0,
	returnSuccess = () => {},
}) => {
	const [dataUser, setDataUser] = useState({});
	useEffect(() => {
		if (userId && !dataUser.id) {
			showUser(userId).then(res => {
				if (res.success) {
					setDataUser(res.data);
				}
				// console.log(res.data);
			});
		}
	}, [userId]);
	return (
		<DialogModal size="xl" isOpen={open} closeModal={close}>
			<FormProfilePegawai
				dataUser={dataUser}
				cancel={close}
				returnSuccess={() => {}}
			/>
		</DialogModal>
	);
};
export default ModalEditProfile;
