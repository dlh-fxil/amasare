import React, { useMemo, useState, useEffect } from "react";
import AppLayout from "@components/Layouts/AppLayout";
import Table from "@molecules/Table";
import makeQueryParams from "@/lib/makeQueryParams";
import {
	AddButton,
	DeleteButton,
	EditButton,
	DownloadButton,
	NexPageCursor,
	PrintButton,
	RefreshButton,
} from "@molecules/ContentButtons";
import { deleteRoles, getRoles } from "@hooks/api/ManajemenUser/roles";
import ModalRoles from "@organisms/Role/ModalRoles";
import DialogConfirmation from "@molecules/DialogConfirmation";
const App = () => {
	const [formModalOpen, setFormModalOpen] = useState(false);
	const [data, setData] = useState([]);
	const [editData, setEditData] = useState({});
	const [deleteData, setDeleteData] = useState();
	const [query, setQuery] = useState("");
	const [tableOption, setTableOption] = useState({});
	const { resetTable } = tableOption;
	const getData = async ({ query = null, url = null } = {}) => {
		getRoles({ query: query, url: url }).then(res => {
			if (res.success) {
				setData(res.data);
			}
		});
	};
	useEffect(() => {
		if (query) {
			getData({ query });
		}
	}, [query]);
	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		const { globalFilter, filters, sortBy } = tableOption;
		const param = makeQueryParams({
			globalFilter,
			filters,
			sortBy,
		});
		setQuery(param);
	}, [tableOption]);

	const closeModal = () => {
		setFormModalOpen(false);
		setEditData({});
	};
	const reloadData = () => {
		resetTable();
		getData();
	};
	const deleteDataRoles = () => {
		if (deleteData) {
			deleteRoles(deleteData).then(res => {
				if (res.success) {
					setDeleteData(0);
					reloadData();
				}
			});
		}
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
				accessor: "name",
			},
			{
				Header: "Level",
				accessor: "level",
			},
			{
				Header: "Deskripsi",
				accessor: "description",
			},
			{
				Header: "Aksi",
				width: 40,
				Cell: cell => (
					<div className="w-fit">
						<div className="w-fit h-fit items-center justify-around flex gap-0.5">
							<EditButton onClick={() => setEditData(cell.row.original)} />
							<DeleteButton
								onClick={() => setDeleteData(cell.row.original.id)}
							/>
						</div>
					</div>
				),
			},
		],
		[data],
	);

	return (
		<AppLayout title="Data Pegawai (User)">
			<ModalRoles
				open={formModalOpen || !!editData.id}
				close={closeModal}
				editData={editData}
				returnSuccess={reloadData}
			/>
			<DialogConfirmation
				open={!!deleteData}
				action={deleteDataRoles}
				close={() => setDeleteData(0)}>
				Apakah Anda Yakin ingin menghapus role in?
			</DialogConfirmation>

			<div className="py-2 h-full">
				<div className="h-full flex flex-col card-content">
					<div className="flex shrink-0 p-4 items-center gap-2 max-w-full justify-end">
						<RefreshButton onClick={reloadData} />
						<AddButton onClick={() => setFormModalOpen(true)} />
						{/* <DownloadButton onClick={() => alert("to do list...")} /> */}
						{/* <PrintButton onClick={() => alert("to do list...")} /> */}
					</div>
					<div className="max-w-full -m-2 p-2 grow overflow-auto scrollbar-thin">
						<Table
							columns={columns}
							data={data}
							setTableOption={setTableOption}
						/>
					</div>
				</div>
			</div>
		</AppLayout>
	);
};

export default App;
