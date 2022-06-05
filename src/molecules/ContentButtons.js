import Icons from "@atoms/Icons";
import { Button } from "@atoms/FormControl";

export const NexPageCursor = ({
	nextPage = "",
	loading = true,
	goToNextPage = () => {},
} = {}) => {
	return (
		<>
			{nextPage && !loading && (
				<button
					className="w-fit flex pointer-events-auto space-x-3 items-center justify-around bg-slate-900 active:bg-slate-700 shadow shadow-stone-500 rounded-full px-4 sm:px-8 py-1 text-white"
					onClick={goToNextPage}>
					<Icons
						icon="ChevronDoubleDownIcon"
						className="w-5 h-5 sm:-ml-4"
						outline
					/>
					<span className="pointer-events-none">Lihat lainnya ...</span>
				</button>
			)}
			{loading && (
				<div className="flex items-center w-full justify-center gap-2">
					<svg
						className="animate-spin h-5 w-5 text-green-700"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24">
						<circle
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"></circle>
						<path
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
					<div className="animate-pulse text-center space-x-4">
						Sedang Memuat...
					</div>
				</div>
			)}
		</>
	);
};

export const AddButton = ({ onClick = () => {} } = {}) => {
	return (
		<Button
			data-tip="Tambah Program/Kegiatan/Sub Kegiatan Baru"
			rounded
			size="sm"
			onClick={onClick}>
			<Icons icon="PlusCircleIcon" className="w-5 h-5 -ml-2" />
			<span className="pointer-events-none">Tambah</span>
		</Button>
	);
};

export const DownloadButton = ({ onClick = () => {} } = {}) => {
	return (
		<Button data-tip="Belum dibuat" onClick={onClick} rounded size="sm">
			<span className="pointer-events-none">Download</span>
			<Icons icon="DownloadIcon" className="w-5 h-5 -mr-1" />
		</Button>
	);
};

export const PrintButton = ({ onClick = () => {} } = {}) => {
	return (
		<Button data-tip="Belum dibuat" onClick={onClick} rounded size="sm">
			<span className="pointer-events-none">Cetak</span>
			<Icons icon="PrinterIcon" className="w-5 h-5 -mr-2" />
		</Button>
	);
};
