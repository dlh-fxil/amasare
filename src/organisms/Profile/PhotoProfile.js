import { useState, useEffect } from "react";
import ModalImgCropper from "./ModalImgCropper";

export default function PhotoProfile({ user }) {
	const [urlImage, setUrlImage] = useState("images/blank-profile.png");
	const [openAvatar, setOpenAvatar] = useState(false);
	const [avatarSrc, setAvatarSrc] = useState(urlImage);
	const closeModal = () => {
		setOpenAvatar(false);
	};
	const openModalImage = () => {
		setOpenAvatar(true);
	};
	useEffect(() => {
		if (user?.profile_images?.thumb) {
			setUrlImage(user?.profile_images?.thumb);
		}
		return () => {
			setUrlImage("images/blank-profile.png");
		};
	}, [user]);
	const ProfileFoto = (
		<div className="relative w-full  md:block flex justify-center mx-auto">
			<img
				onClick={openModalImage}
				src={openAvatar && avatarSrc ? avatarSrc : urlImage}
				className="rounded-full border-4 object-contain border-white w-28 h-28"
			/>
			{user && (
				<div className="px-4 py-1 bg-blue-400 absolute md:bottom-0 md:top-auto md:left-auto inset-0 md:right-0 rounded-full w-fit h-fit -mb-2 font-bold uppercase -mr-4">
					{user?.jenis_pegawai}
				</div>
			)}
		</div>
	);
	return (
		<div className="flex-none w-full md:w-fit m-auto py-4 px-8">
			<ModalImgCropper
				openModal={openAvatar}
				closeModal={closeModal}
				tempSrc={avatarSrc}
				originalSrc={urlImage}
				setTempSrc={setAvatarSrc}
				setNewSrc={setUrlImage}
			/>
			{ProfileFoto}
		</div>
	);
}
