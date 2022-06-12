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

export const AddButton = ({ onClick = () => {}, title = "Tambah" } = {}) => {
	return (
		<Button
			data-tip={title}
			color="slate"
			rounded
			size="responsive"
			onClick={onClick}>
			<Icons
				icon="PlusCircleIcon"
				className="w-8 h-8  p-1 sm:p-0 sm:w-5 sm:h-5 sm:-ml-2"
			/>
			<span className="pointer-events-none hidden sm:block">{title}</span>
		</Button>
	);
};

export const DownloadButton = ({
	onClick = () => {},
	title = "Download",
} = {}) => {
	return (
		<Button
			data-tip={title}
			color="lime"
			onClick={onClick}
			rounded
			size="responsive">
			<Icons
				icon="DownloadIcon"
				className="w-8 h-8  p-1 sm:p-0 sm:w-5 sm:h-5 sm:-ml-2"
			/>
			<span className="pointer-events-none hidden sm:block">{title}</span>
		</Button>
	);
};

export const PrintButton = ({ onClick = () => {}, title = "Cetak" } = {}) => {
	return (
		<Button data-tip={title} onClick={onClick} rounded size="responsive">
			<Icons
				icon="PrinterIcon"
				className="w-8 h-8 p-1 sm:p-0 sm:w-5 sm:h-5 sm:-ml-2"
			/>
			<span className="pointer-events-none hidden sm:block">{title}</span>
		</Button>
	);
};

export const RefreshButton = ({
	onClick = () => {},
	title = "Refresh",
} = {}) => {
	return (
		<Button
			data-tip={title}
			color="blue"
			rounded
			size="responsive"
			onClick={onClick}>
			<Icons
				icon="RefreshIcon"
				className="w-8 h-8 p-1 sm:p-0 sm:w-5 sm:h-5 sm:-ml-2"
			/>
			<span className="pointer-events-none hidden sm:block">{title}</span>
		</Button>
	);
};
export const EditButton = ({ onClick = () => {}, title = "Ubah" } = {}) => {
	return (
		<Button
			data-tip={title}
			size="xs"
			rounded
			color="transparent"
			iconOnly
			onClick={onClick}>
			<Icons
				icon="PencilAltIcon"
				className="w-5 h-5 text-lime-900 pointer-events-none"
			/>
		</Button>
	);
};
export const DeleteButton = ({ onClick = () => {}, title = "Hapus" } = {}) => {
	return (
		<Button
			rounded
			block
			data-tip={title}
			color="transparent"
			iconOnly
			onClick={onClick}>
			<Icons
				icon="TrashIcon"
				className="w-5 h-5 pointer-events-none text-rose-900"
			/>
		</Button>
	);
};
export const FilterButton = ({ onClick = () => {}, title = "Filter" } = {}) => {
	return (
		<Button data-tip={title} size="responsive" color="purple" onClick={onClick}>
			<Icons
				icon="AdjustmentsIcon"
				className="w-8 h-8 p-1 sm:p-0 sm:w-5 sm:h-5 sm:-ml-2"
			/>
			<span className="pointer-events-none hidden sm:block">{title}</span>
		</Button>
	);
};
