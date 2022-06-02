import React, { useMemo, useState, useEffect, useCallback } from "react";

import AppLayout from "@components/Layouts/AppLayout";
import { Button } from "@atoms/FormControl";
import Head from "next/head";
import Container from "@components/Container";
import Icons from "@atoms/Icons";
import Table from "@molecules/Table";
import { getUser } from "@hooks/api/ManajemenUser/users";
import { UserAddIcon } from "@heroicons/react/outline";
import makeQueryParams from "@/lib/makeQueryParams";
import { makeOptionsUnits } from "@hooks/api/Kepegawaian/unit";
import Select from "@atoms/FormControl/Select";
const App = () => {
	const [formModalOpen, setFormModalOpen] = useState(false);
	const [data, setData] = useState([]);
	const [editData, setEditData] = useState({});
	const [deleteData, setDeleteData] = useState({});
	const [defaultIncludes, setDefaultIncludes] = useState(
		"unit,pangkat,jabatan",
	);
	const [loading, setLoading] = useState(true);
	const [perPage, setPerPage] = useState(10);
	const [query, setQuery] = useState("");
	const [tableOption, setTableOption] = useState({});
	const { optionsUnit, getOptionsUnit } = makeOptionsUnits();
	const getDataUser = async () => {
		const res = await getUser({ query });
		if (res.success) {
			return setData(res.data);
		}
	};

	const columns = useMemo(
		() => [
			{
				Header: "Nama",
				width: 200,
				id: "name",
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
				Cell: cell => (
					<div>
						<div className="font font-semibold">{cell.row.original.no_hp}</div>
						<div className="font font-semibold">{cell.row.original.no_wa}</div>
					</div>
				),
			},
			{
				Header: "Sekretariat/Bidang",
				accessor: d => d.unit?.nama,
				id: "unit_id",
				Filter: ({ column: { filterValue, setFilter } }) => (
					<>
						<div>{filterValue}</div>
						<Select
							instanceId="unit_id"
							value={filterValue}
							onChange={val => setFilter(val)}
							options={optionsUnit}
						/>
					</>
				),
			},
			{
				Header: "Jabatan",
				accessor: "jabatan.nama",
			},
			{
				Header: "Aksi",
				width: 65,
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
	const makeQuery = useCallback(() => {
		const { globalFilter, filters, sortBy } = tableOption;
		const includes = defaultIncludes;
		const param = makeQueryParams({
			globalFilter,
			filters,
			sortBy,
			perPage,
			includes,
		});
		setQuery(param);
	}, []);
	useEffect(() => {
		if (!query) {
			makeQuery();
		}
		if (query) {
			getDataUser();
		}
	}, [query]);
	useEffect(() => {
		makeQuery();
	}, [tableOption]);
	useEffect(() => {
		getOptionsUnit();
	}, []);
	useEffect(() => {
		if (data.length && optionsUnit.length) {
			setLoading(false);
		}
	}, [data, optionsUnit]);
	return (
		<AppLayout>
			<Head>
				<title>Managemen Pegawai (User)</title>
			</Head>
			<div className="h-full flex flex-col">
				<div className="flex shrink-0 p-4 items-center gap-2 max-w-full justify-end">
					<Button rounded size="sm" onClick={getDataUser}>
						<Icons icon="PlusCircleIcon" className="w-5 h-5 -ml-2" />
						<span>Reload</span>
					</Button>
					<Button rounded size="sm" onClick={() => setFormModalOpen(true)}>
						<Icons icon="PlusCircleIcon" className="w-5 h-5 -ml-2" />
						<span>Tambah</span>
					</Button>
					<Button onClick={() => alert("to do list...")} rounded size="sm">
						<span>Download</span>
						<Icons icon="DownloadIcon" className="w-5 h-5 -mr-1" />
					</Button>
					<Button onClick={() => alert("to do list...")} rounded size="sm">
						<span>Cetak</span>
						<Icons icon="PrinterIcon" className="w-5 h-5 -mr-1" />
					</Button>
				</div>
				<div className="w-full grow pb-2 overflow-x-auto">
					{!loading && (
						<Table
							columns={columns}
							data={data}
							loading={loading}
							setTableOption={setTableOption}
						/>
					)}
				</div>
			</div>
		</AppLayout>
	);
};

export default App;
