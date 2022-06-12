import DialogModal from "@atoms/Modal";
import DetailAktivitas from "@organisms/Aktivitas/DetailAkrtivitas";
export const ModalDetailAktivitas = ({
	open = () => {},
	close = () => {},
	aktivitas = {},
} = {}) => {
	return (
		<DialogModal size="xl" isOpen={open} closeModal={close}>
			<div className="bg-white w-full h-full z-[80] p-3 rounded-lg">
				<DetailAktivitas close={close} aktivitas={aktivitas} />
			</div>
		</DialogModal>
	);
};
