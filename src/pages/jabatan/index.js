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

import { NexPageCursor } from "@molecules/ContentButtons";
import ModalJabatan from "@organisms/Jabatan/ModalJabatan";
import { ConfirmDelete } from "@molecules/ConfirmDialog";
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
							<Button
								data-tip="Ubah"
								size="xs"
								rounded
								color="transparent"
								iconOnly
								onClick={() => setEditData(cell.row.original)}>
								<Icons
									icon="PencilAltIcon"
									className="w-5 h-5 text-lime-900 pointer-events-none"
								/>
							</Button>
							<Button
								rounded
								block
								data-tip="Hapus"
								color="transparent"
								iconOnly
								onClick={() => setDeleteId(cell.row.original.id)}>
								<Icons
									icon="TrashIcon"
									className="w-5 h-5 pointer-events-none text-rose-900"
								/>
							</Button>
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
			getUsers({ url: nextPage }).then(res => {
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
						<Button data-tip="Refresh" rounded size="sm" onClick={reloadData}>
							<Icons icon="PlusCircleIcon" className="w-5 h-5 -ml-2" />
							<span className="pointer-events-none">Refresh</span>
						</Button>
						<Button
							data-tip="Tambah pegawai / user baru"
							rounded
							size="sm"
							onClick={() => setOpenModalForm(true)}>
							<Icons icon="PlusCircleIcon" className="w-5 h-5 -ml-2" />
							<span className="pointer-events-none">Pegawai Baru</span>
						</Button>
						<Button
							data-tip="Belum Buat"
							onClick={() => alert("to do list...")}
							rounded
							size="sm">
							<span className="pointer-events-none">Download</span>
							<Icons icon="DownloadIcon" className="w-5 h-5 -mr-1" />
						</Button>
						<Button
							data-tip="Belum Buat"
							onClick={() => alert("to do list...")}
							rounded
							size="sm">
							<span className="pointer-events-none">Cetak</span>
							<Icons icon="PrinterIcon" className="w-5 h-5 -mr-1" />
						</Button>
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
