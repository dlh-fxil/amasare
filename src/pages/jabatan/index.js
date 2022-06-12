import AppLayout from "@components/Layouts/AppLayout";
import Head from "next/head";
const App = () => {
	return (
		<AppLayout>
			<Head>
				<title>Jabatan</title>
			</Head>
			<Jabatan />
		</AppLayout>
	);
};

export default App;

import React, { useMemo, useState, useEffect } from "react";

import { Button } from "@atoms/FormControl";
import Icons from "@atoms/Icons";
import Table from "@molecules/Table";
import { deleteJabatan, getJabatan } from "@hooks/api/Kepegawaian/jabatan";
import makeQueryParams from "@/lib/makeQueryParams";

import {
	AddButton,
	DeleteButton,
	EditButton,
	NexPageCursor,
	RefreshButton,
} from "@molecules/ContentButtons";
import ModalJabatan from "@organisms/Jabatan/ModalJabatan";
import { ConfirmDelete } from "@molecules/ConfirmDialog";
import { mergerArray } from "@/lib/myLib";
const Jabatan = () => {
	const [openModalForm, setOpenModalForm] = useState(false);
	const [data, setData] = useState([]);
	const [editData, setEditData] = useState({});
	const [deleteId, setDeleteId] = useState(0);

	const [perPage, setPerPage] = useState(10);

	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState("");

	const [tableOption, setTableOption] = useState({});
	const [nextPage, setNextPage] = useState("");

	const { resetTable } = tableOption;

	useEffect(() => {
		if (query) {
			setLoading(true);
			getJabatan({ query }).then(res => {
				if (res.success) {
					setData(res.data);
					setNextPage(res?.links?.next);
				}
				setLoading(false);
			});
		}
	}, [query]);

	useEffect(() => {
		const { globalFilter, filters, sortBy } = tableOption;
		const param = makeQueryParams({
			globalFilter,
			filters,
			sortBy,
			perPage,
		});
		setQuery(param);
	}, [tableOption]);
	useEffect(() => {
		if (editData.id) {
			setOpenModalForm(true);
		}
	}, [editData]);
	const reloadData = () => {
		if (query) {
			setLoading(true);
			getJabatan({ query }).then(res => {
				if (res.success) {
					setData(res.data);
					setNextPage(res?.links?.next);
				}
				setLoading(false);
			});
		}
	};

	const deleteData = id => {
		deleteJabatan(id).then(res => {
			reloadData();
			setDeleteId(0);
		});
	};
	const columns = useMemo(
		() => [
			{
				Header: "No",
				width: 40,
				disableSortBy: true,
				disableFilters: true,
				accessor: (d, i) => i + 1,
			},
			{
				Header: "Nama",
				width: 200,
				id: "name",
				disableSortBy: false,
				accessor: "nama",
			},
			{
				Header: "Jenis",
				width: 200,
				accessor: "jenis",
			},
			{
				Header: "Kelas Jabatan",
				width: 200,
				accessor: "kelas",
			},
			{
				Header: "Jenis",
				width: 200,
				accessor: "Singkatan",
			},

			{
				Header: "Aksi",
				width: 40,
				Cell: cell => (
					<div className="w-fit">
						<div className="w-fit h-fit items-center justify-around flex gap-0.5">
							<EditButton onClick={() => setEditData(cell.row.original)} />
							<DeleteButton onClick={() => setDeleteId(cell.row.original.id)} />
						</div>
					</div>
				),
			},
		],
		[],
	);

	const goToNextPage = () => {
		if (nextPage) {
			setLoading(true);
			getJabatan({ url: nextPage }).then(res => {
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

	const closeModal = () => {
		setOpenModalForm(false);
		setEditData({});
	};

	return (
		<>
			<div className="py-2 h-full">
				<div className="h-full flex flex-col card-content">
					<div className="flex shrink-0 p-4 items-center gap-2 max-w-full justify-end">
						<RefreshButton onClick={reloadData} />
						<AddButton
							title="Jabatan Baru"
							onClick={() => setOpenModalForm(true)}
						/>
					</div>
					<div className="max-w-full -m-2 p-2 grow overflow-auto scrollbar-thin">
						<Table
							columns={columns}
							data={data}
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
			<ModalJabatan
				open={openModalForm}
				returnSuccess={reloadData}
				dataEdit={editData}
				close={closeModal}
			/>
			<ConfirmDelete
				open={!!deleteId}
				deleteAction={deleteData}
				itemId={deleteId}
				close={() => setDeleteId(0)}
			/>
		</>
	);
};
