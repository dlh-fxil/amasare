import React, { useMemo, useState, useEffect } from "react";

import AppLayout from "@components/Layouts/AppLayout";
import Table from "@molecules/Table";
import {
	getProgramKegiatan,
	deleteProgramKegiatan,
} from "@hooks/api/Kegiatan/programKegiatan";
import { Button } from "@atoms/FormControl";
import makeQueryParams from "@/lib/makeQueryParams";

import Icons from "@atoms/Icons";
import { columnsProgramKegiatan } from "@organisms/ProgramKegiatan/IntialProgramKegiatan";
import FormProgramKegiatan from "@organisms/ProgramKegiatan/FormProgramKegiatan";
import DialogModal from "@atoms/Modal";
import { ConfirmDelete } from "@molecules/ConfirmDialog";
function App() {
	const [deleteId, setDeleteId] = useState(0);
	const deleteItem = any => {
		setDeleteId(any);
	};
	const {
		Columns,
		programKegiatanEdit,
		setProgramKegiatanEdit,
	} = columnsProgramKegiatan({
		deleteItem: deleteItem,
	});
	const [data, setData] = useState([]);
	const [query, setQuery] = useState("");
	const [perPage, setPerPage] = useState(10);
	const columns = useMemo(() => Columns, []);
	const [formModalOpen, setFormModalOpen] = useState(false);
	const [tableOption, setTableOption] = useState({});
	const [loading, setLoading] = useState(false);
	const [nextPage, setNextPage] = useState("");
	const makeQuery = useMemo(() => {
		const { globalFilter, filters, sortBy } = tableOption;
		const includes = "unit";
		const param = makeQueryParams({
			globalFilter,
			filters,
			sortBy,
			perPage,
			includes,
		});
		setQuery(param);
	}, [tableOption]);

	const freshData = ({ obj = {} } = {}) => {
		getProgramKegiatan({ query }).then(res => {
			let tempData = [];
			if (res.success) {
				res.data.map(item => {
					tempData[item.id] = item;
				});
				setNextPage(res?.links?.next);
			}
			setData(tempData);
		});
	};

	const apenddData = newData => {
		let tempData = [...data];
		newData.data.map(item => {
			tempData[item.id] = item;
		});
		for (var i = tempData.length - 1; i >= 0; i--) {
			if (!tempData[i]) {
				delete tempData[i];
			}
		}
		setData(tempData);
		setNextPage(newData?.links?.next);
		return setLoading(false);
	};

	const goToNextPage = () => {
		if (nextPage) {
			setLoading(true);
			getProgramKegiatan({ url: nextPage }).then(res => {
				if (res.success) {
					apenddData(res);
				} else [setLoading(false)];
			});
		}
	};

	const deleteData = async id => {
		const res = await deleteProgramKegiatan(id);
		if (res.success) {
			freshData();
		}
		return setDeleteId(0);
	};

	useEffect(() => {
		if (query) {
			freshData();
		}
		return () => {};
	}, [query]);

	useEffect(() => {
		if (programKegiatanEdit?.id) {
			setFormModalOpen(true);
		}
		return () => {};
	}, [programKegiatanEdit]);

	const closeModal = () => {
		setFormModalOpen(false);
		setProgramKegiatanEdit({});
	};
	return (
		<>
			<AppLayout title="Program Kagiatan">
				<div className="py-2 h-full">
					<div className="card-content  h-full flex flex-col ">
						<div className="w-full h-fit pb-4 flex space-x-2 items-center justify-end">
							<Button
								data-tip="Tambah Program/Kegiatan/Sub Kegiatan Baru"
								rounded
								size="sm"
								onClick={() => setFormModalOpen(true)}>
								<Icons icon="PlusCircleIcon" className="w-5 h-5 -ml-2" />
								<span className="pointer-events-none">Tambah</span>
							</Button>
							<Button
								data-tip="Belum dibuat"
								onClick={() => alert("to do list...")}
								rounded
								size="sm">
								<span className="pointer-events-none">Download</span>
								<Icons icon="DownloadIcon" className="w-5 h-5 -mr-1" />
							</Button>
							<Button
								data-tip="Belum dibuat"
								onClick={() => alert("to do list...")}
								rounded
								size="sm">
								<span className="pointer-events-none">Cetak</span>
								<Icons icon="PrinterIcon" className="w-5 h-5 -mr-2" />
							</Button>
						</div>
						<div className="max-w-full -m-2 p-2 grow overflow-auto scrollbar-thin">
							<Table
								columns={columns}
								data={data}
								loading={loading}
								setTableOption={setTableOption}
							/>
						</div>
						<div className="pt-6 flex items-center justify-center">
							{nextPage && !loading && (
								<button
									className="w-fit flex space-x-3 items-center justify-around bg-slate-900 active:bg-slate-700 shadow shadow-stone-500 rounded-full px-4 sm:px-8 py-1 text-white"
									onClick={goToNextPage}>
									<Icons
										icon="ChevronDoubleDownIcon"
										className="w-5 h-5 sm:-ml-4"
										outline
									/>
									<span className="pointer-events-none"> Lihat lainnya</span>
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
										{/* <div className="h-6 bg-slate-800 blur to-stone-600 w-full text-sm text-stone-100 text-opacity-50 rounded"> */}
										Sedang Memuat...
										{/* </div> */}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</AppLayout>
			<DialogModal size="xl" isOpen={formModalOpen} closeModal={closeModal}>
				<FormProgramKegiatan
					close={closeModal}
					returnSuccess={freshData}
					editData={programKegiatanEdit}
				/>
			</DialogModal>
			<ConfirmDelete
				open={!!deleteId}
				deleteAction={deleteData}
				itemId={deleteId}
				close={() => setDeleteId(0)}
			/>
		</>
	);
}

export default App;
