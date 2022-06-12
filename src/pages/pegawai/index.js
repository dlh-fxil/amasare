import React, { useMemo, useState, useEffect } from "react";
import AppLayout from "@components/Layouts/AppLayout";
import Icons from "@atoms/Icons";
import Table from "@molecules/Table";
import { getUsers } from "@hooks/api/ManajemenUser/users";
import makeQueryParams from "@/lib/makeQueryParams";
import { makeOptionsUnit } from "@hooks/api/Kepegawaian/unit";
import { mergerArray } from "@/lib/myLib";
import {
	AddButton,
	DeleteButton,
	DownloadButton,
	EditButton,
	NexPageCursor,
	PrintButton,
	RefreshButton,
} from "@molecules/ContentButtons";
import { SelectColumnFilter } from "@molecules/Table/ColumnFilter";
import FormPegawai from "@organisms/Pegawai/FormPegawai";
import ModalPegawai from "@organisms/Pegawai/ModalPegawai";
const App = () => {
	const [formModalOpen, setFormModalOpen] = useState(false);
	const [data, setData] = useState([]);
	const [editData, setEditData] = useState({});
	const [deleteData, setDeleteData] = useState({});

	const [perPage, setPerPage] = useState(10);

	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState("");

	const [tableOption, setTableOption] = useState({});
	const [optionsUnit, setOptionsUnit] = useState([]);
	const [nextPage, setNextPage] = useState("");

	const { resetTable } = tableOption;

	useEffect(() => {
		console.log(query);
		if (query) {
			setLoading(true);
			getUsers({ query }).then(res => {
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
		const includes = "unit,pangkat,jabatan";
		const param = makeQueryParams({
			globalFilter,
			filters,
			sortBy,
			perPage,
			includes,
		});
		setQuery(param);
	}, [tableOption]);

	useEffect(() => {
		makeOptionsUnit().then(d => setOptionsUnit(d));
	}, []);

	const reloadData = () => {
		resetTable();
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
				accessor: d => (
					<div>
						<div className="font font-semibold">{d.nama}</div>
						{d.jenis_pegawai !== "PPNPNS" && (
							<>
								<div>{d.nip}</div>
								<div>{d.pangkat?.nama}</div>
							</>
						)}
					</div>
				),
			},
			{
				Header: "No Hp/Wa",
				width: 200,
				accessor: d => (
					<div>
						{d.no_hp && (
							<div className="font font-semibold">{d.no_hp} (Hp)</div>
						)}
						{d.no_wa && (
							<div className="font font-semibold">{d.no_wa} (Wa)</div>
						)}
					</div>
				),
			},
			{
				Header: "Sekretariat/Bidang",
				accessor: d => d.unit?.nama,
				id: "unit_id",
				Filter: ({ column }) => (
					<SelectColumnFilter column={column} options={optionsUnit} />
				),
			},
			{
				Header: "Jabatan",
				id: "jabatan",
				accessor: "jabatan.nama",
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
		[optionsUnit],
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

	return (
		<AppLayout title="Data Pegawai (User)">
			{/* <ModalPegawai
				editData={editData}
				open={!!editData.id}
				close={() => setEditData({})}
			/> */}
			<div className="py-2 h-full">
				<div className="h-full flex flex-col card-content">
					<div className="flex shrink-0 p-4 items-center gap-2 max-w-full justify-end">
						<RefreshButton onClick={reloadData} />
						{/* <AddButton onClick={() => setFormModalOpen(true)} /> */}
						<DownloadButton onClick={() => alert("to do list...")} />
						<PrintButton onClick={() => alert("to do list...")} />
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
		</AppLayout>
	);
};

export default App;
