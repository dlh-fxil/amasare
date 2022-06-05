import React, { useMemo, useState, useEffect } from "react";

import AppLayout from "@components/Layouts/AppLayout";
import { Button } from "@atoms/FormControl";
import Icons from "@atoms/Icons";
import Table from "@molecules/Table";
import { getUsers } from "@hooks/api/ManajemenUser/users";
import makeQueryParams from "@/lib/makeQueryParams";
import { makeOptionsUnit } from "@hooks/api/Kepegawaian/unit";

import { generateKeyById, mergerArray } from "@/lib/myLib";
import { NexPageCursor } from "@molecules/ContentButtons";
import { SelectColumnFilter } from "@molecules/Table/ColumnFilter";
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
								onClick={() => setDeleteData(cell.row.original.id)}>
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

	// useEffect(() => {
	// 	if (data.length && optionsUnit.length) {
	// 		setLoading(false);
	// 	}
	// }, [data, optionsUnit]);

	return (
		<AppLayout title="Data Pegawai (User)">
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
							onClick={() => setFormModalOpen(true)}>
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
		</AppLayout>
	);
};

export default App;
