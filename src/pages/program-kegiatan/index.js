import React, { useMemo, useState, useEffect } from "react";

import AppLayout from "@components/Layouts/AppLayout";
import Head from "next/head";
import Container from "@components/Container";
import CunstomTable from "@molecules/Table/CunstomTable";
import {
	getProgramKegiatan,
	deleteProgramKegiatan,
} from "@hooks/api/Kegiatan/programKegiatan";
import { Button } from "@atoms/FormControl";
import makeQueryParams from "@/lib/makeQueryParams";
import {
	PlusCircleIcon,
	PrinterIcon,
	DownloadIcon,
} from "@heroicons/react/solid";
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
	const { Table, tableOption } = CunstomTable({ columns, data });

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

	const getData = async () => {
		const res = await getProgramKegiatan({ query });
		if (res.success) {
			return res;
		}
		return [];
	};
	const deleteData = async id => {
		const res = await deleteProgramKegiatan(id);
		if (res.success) {
			returnSuccess();
		}
		return setDeleteId(0);
	};
	useEffect(() => {
		if (query) {
			getData().then(res => setData(res.data));
		}
		return () => {};
	}, [query]);

	useEffect(() => {
		if (programKegiatanEdit?.id) {
			setFormModalOpen(true);
		}
		// console.log(programKegiatanEdit);
		return () => {
			// cleanup;
		};
	}, [programKegiatanEdit]);
	const returnSuccess = ({ obj = {} } = {}) => {
		getData().then(res => setData(res.data));
	};
	const closeModal = () => {
		setFormModalOpen(false);
		setProgramKegiatanEdit({});
	};
	return (
		<>
			<AppLayout>
				<Head>
					<title>Program Kagiatan</title>
				</Head>

				{/* buuton for table */}
				<div className="flex p-4 items-center gap-2 max-w-full justify-end">
					<Button rounded size="sm" onClick={() => setFormModalOpen(true)}>
						<PlusCircleIcon className="w-5 h-5 -ml-2" />
						<span>Tambah</span>
					</Button>
					<Button onClick={() => alert("to do list...")} rounded size="sm">
						<span>Download</span>
						<DownloadIcon className="w-5 h-5 -mr-1" />
					</Button>
					<Button onClick={() => alert("to do list...")} rounded size="sm">
						<span>Cetak</span>
						<PrinterIcon className="w-5 h-5 -mr-2" />
					</Button>
				</div>
				<div className="w-full bg-slate-200 text-slate-900 overflow-auto">
					{/* <div className="w-full bg-red-600"> */}
					<Table columns={columns} data={data} />
				</div>
			</AppLayout>
			<DialogModal size="xl" isOpen={formModalOpen} closeModal={closeModal}>
				<FormProgramKegiatan
					close={closeModal}
					returnSuccess={returnSuccess}
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
