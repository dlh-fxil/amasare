import React from "react";
import DialogModal from "@atoms/Modal";
import { Button } from "@atoms/FormControl";
import { XIcon, PhotographIcon, UploadIcon } from "@heroicons/react/solid";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import useAvatarCropper from "@hooks/avatarCropper";
const ModalImgCropper = ({
	openModal = false,
	closeModal,
	tempSrc,
	originalSrc,
	setTempSrc,
	setNewSrc,
}) => {
	// const cropperRef = useRef(null);
	const {
		reset,
		imageInput,
		onSelectFile,
		imgSrc,
		onCrop,
		cropperRef,
		tempSize,
		maxSize,
		loading,
		clikImageInput,
		handleSubmit,
	} = useAvatarCropper({
		closeModal: closeModal,
		tempSrc: tempSrc,
		originalSrc: originalSrc,
		setTempSrc: setTempSrc,
		setNewSrc: setNewSrc,
	});
	const Footer = (
		<div className={tempSize > 0 ? "mt-4" : "mt-0"}>
			<div className="flex items-around flex-wrap bg-slate-500 md:rounded-full bg-opacity-25 justify-around px-4 py-2 w-full">
				<Button
					type="button"
					loading={loading}
					className="flex whitespace-nowrap gap-1 w-fit items-center bg-transparent focus:text-opacity-90 text-current focus:bg-transparent hover:bg-opacity-40"
					color="slate"
					onClick={clikImageInput}>
					<PhotographIcon className="-ml-4 w-5 h-5 text-lime-700" />
					{imgSrc ? "Ganti" : "Pilih"} Foto
				</Button>
				<Button
					onClick={reset}
					loading={loading}
					type="button"
					className="flex gap-1 items-center bg-transparent focus:text-opacity-90 text-current focus:bg-transparent hover:bg-opacity-40"
					color="red">
					<XIcon className="-ml-4 w-5 h-5" />
					Tutup
				</Button>
				<Button
					type="button"
					onClick={handleSubmit}
					loading={loading} // disable={!tempSize || tempSize > maxSize || loading}
					className="flex group gap-1 items-center bg-transparent focus:text-opacity-90 text-current focus:bg-transparent  hover:bg-opacity-40"
					color="green">
					<UploadIcon className="-ml-4 w-5 h-5 text-sky-600" />
					Simpan
				</Button>
			</div>
		</div>
	);
	// const imgPreview = (

	// );
	return (
		<DialogModal isOpen={openModal} closeModal={reset}>
			<input
				ref={imageInput}
				className="hidden"
				type="file"
				accept="image/*"
				onChange={onSelectFile}
			/>

			<div className="bg-white p-6 w-full rounded-2xl">
				<div className="flex flex-1 relative justify-center items-start">
					{/* {imgSrc && imgPreview} */}
					<Cropper
						src={imgSrc}
						style={{
							height: "100%",
							width: "100%",
						}}
						aspectRatio={1 / 1}
						guides={false}
						crop={onCrop}
						autoCropArea={1}
						ref={cropperRef}
						checkCrossOrigin={true}
						crossOrigin="anonymous"
					/>
					{tempSize > 0 && (
						<span
							className={`absolute px-4 py-1 inset-0  font-bold pointer-events-none w-fit h-fit bg-opacity-75 z-10 ${
								tempSize < maxSize ? "bg-lime-500" : "bg-red-400"
							}`}>
							Ukuran foto {tempSize} Kb
						</span>
					)}
				</div>
				{Footer}
			</div>
		</DialogModal>
	);
};
export default ModalImgCropper;
