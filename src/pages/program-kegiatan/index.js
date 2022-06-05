import React, { useMemo, useState, useEffect } from "react";

import AppLayout from "@components/Layouts/AppLayout";
import Table from "@molecules/Table";
import {
	getProgramKegiatan,
	deleteProgramKegiatan,
} from "@hooks/api/Kegiatan/programKegiatan";

import makeQueryParams from "@/lib/makeQueryParams";

import { columnsProgramKegiatan } from "@organisms/ProgramKegiatan/IntialProgramKegiatan";
import FormProgramKegiatan from "@organisms/ProgramKegiatan/FormProgramKegiatan";
import DialogModal from "@atoms/Modal";
import { ConfirmDelete } from "@molecules/ConfirmDialog";
import {
	AddButton,
	DownloadButton,
	NexPageCursor,
	PrintButton,
} from "@molecules/ContentButtons";
import { mergerArray } from "@/lib/myLib";

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
		const includes = "unit,program,kegiatan";
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
			if (res.success) {
				setNextPage(res?.links?.next);
				setData(res.data);
			}
		});
	};

	const goToNextPage = () => {
		if (nextPage) {
			setLoading(true);
			getProgramKegiatan({ url: nextPage }).then(res => {
				if (res.success) {
					const newData = mergerArray(data, res.data);
					setData(newData);
					setNextPage(res?.links?.next);
					return setLoading(false);
				}
				return setLoading(false);
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
	const defaultClick = () => alert("to do list...");
	return (
		<>
			<AppLayout title="Program Kagiatan">
				<div className="py-2 h-full">
					<div className="card-content h-full flex flex-col">
						<div className="w-full h-fit pb-4 flex space-x-2 items-center justify-end">
							<AddButton onClick={() => setFormModalOpen(true)} />
							<DownloadButton onClick={defaultClick} />
							<PrintButton onClick={defaultClick} />
						</div>
						<div className="max-w-full -m-2 p-2 grow overflow-auto scrollbar-thin">
							<Table
								columns={columns}
								data={data}
								loading={loading}
								setTableOption={setTableOption}
							/>
						</div>
						<div className="pt-6 flex items-center justify-center pointer-events-none">
							<NexPageCursor
								nextPage={nextPage}
								loading={loading}
								goToNextPage={goToNextPage}
							/>
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
