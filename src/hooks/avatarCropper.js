import { useState, useEffect, useRef } from "react";
import useDebounce from "@/lib/useDebounce";
import { updateFotoProfile } from "./api/ManajemenUser/users";
import { useAuth } from "@hooks/api/auth";
export default function useAvatarCropper({
	closeModal,
	originalSrc,
	tempSrc,
	setNewSrc,
	setTempSrc,
	// cropperRef,
}) {
	const cropperRef = useRef(null);
	const [croped, setCroped] = useState("");
	const [imgSrc, setImgSrc] = useState("");
	const [loading, setLoading] = useState(false);
	const [tempSize, setTempSize] = useState(0);
	const maxSize = 2048;
	const debounceCroped = useDebounce(croped, 500);
	const imageInput = useRef(null);
	const { mutate } = useAuth();
	const onCrop = () => {
		setCroped(Math.floor(Date.now() / 1000));
	};
	const clikImageInput = () => imageInput.current.click();
	const cropingImage = () => {
		const imageElement = cropperRef?.current;
		const cropper = imageElement?.cropper;
		const imgCroppped = cropper.getCroppedCanvas({
			minHeight: 400,
			maxHeight: 400,
			fillColor: "#fff",
			imageSmoothingQuality: "high",
		});
		return imgCroppped;
	};

	useEffect(() => {
		if (debounceCroped && croped) {
			const imgCroppped = cropingImage();
			if (imgCroppped) {
				if (imgCroppped) {
					imgCroppped.toBlob(blob => {
						const size = (blob.size / 1024).toFixed(0);
						setTempSize(size);
						if (size < maxSize) {
							setTempSrc(imgCroppped.toDataURL());
						}
					});
				}
			}
		}
	}, [debounceCroped]);
	const onSelectFile = e => {
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.addEventListener("load", () =>
				setImgSrc(reader.result.toString() || ""),
			);
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const reset = () => {
		setTempSrc("");
		setCroped("");
		setTempSize(0);
		closeModal();
	};
	const handleSubmit = () => {
		if (tempSize < maxSize && tempSize > 0) {
			setLoading(true);
			const imgCropped = cropingImage();

			imgCropped.toBlob(
				blob => {
					const formData = new FormData();
					formData.append("foto_profile", blob, `avatar.png`);
					updateFotoProfile(formData)
						.then(response => {
							if (response.success) {
								setNewSrc(response?.data?.thumb);
								reset();
							}
						})
						.finally(() => {
							mutate();
							setLoading(false);
						});
				} /*, 'image/png' */,
			);
		} else {
			return alert("File Tidak sesuai");
		}
	};
	return {
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
	};
}
