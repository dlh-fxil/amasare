import { YearColumnFilter } from "@molecules/Table/ColumnFilter";
import * as yup from "yup";
import { useState } from "react";
import { Button } from "@atoms/FormControl";
import Icons from "@atoms/Icons";

export const columnsProgramKegiatan = ({ deleteItem = () => {} }) => {
	const [programKegiatanEdit, setProgramKegiatanEdit] = useState({});

	const Columns = [
		{
			Header: "No",
			columns: [
				{
					Header: "#",
					width: 40,
					disableSortBy: true,
					disableFilters: true,
					canRisize: false,
					accessor: (d, i) => i + 1,
				},
			],
		},
		{
			Header: "Aksi",
			columns: [
				{
					Header: "Ubah/ Hapus",
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
									onClick={() => setProgramKegiatanEdit(cell.row.original)}>
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
									onClick={() => deleteItem(cell.row.original.id)}>
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
		},
		{
			Header: "Kode",
			columns: [
				{
					Header: "#",
					accessor: "kode_urusan",
					disableSortBy: true,
					disableFilters: true,
					width: 30,
				},
				{
					Header: "#",
					accessor: "kode_bidang_urusan",
					disableSortBy: true,
					disableFilters: true,
					width: 40,
				},
				{
					Header: "#",
					accessor: "kode_program",
					disableSortBy: true,
					disableFilters: true,
					width: 40,
				},
				{
					Header: "#",
					accessor: "kode_kegiatan",
					disableSortBy: true,
					disableFilters: true,
					width: 40,
				},
				{
					Header: "#",
					accessor: "kode_sub_kegiatan",
					disableSortBy: true,
					disableFilters: true,
					width: 40,
				},
			],
		},
		{
			Header: "Program,Kegiatan dan Sub kegiatan",
			columns: [
				{
					Header: "Nomenklatur",
					accessor: "nomenklatur",
					width: 200,
				},
				{
					Header: "Kinerja",
					accessor: "kinerja",
					width: 200,
				},
				{
					Header: "Indikator",
					accessor: "indikator",
					width: 200,
				},
				{
					Header: "Pelaksana",
					accessor: "unit.nama",
					filter: "unit_id",
					id: "unit_id",
					width: 200,
				},
				{
					Header: "Tahun",
					accessor: "tahun_anggaran",
					width: 90,
					Filter: YearColumnFilter,
				},
			],
		},

		{
			Header: "Capaian",
			columns: [
				{
					Header: "Status",
					accessor: "selesai",
					width: 100,
				},
				{
					Header: "%",
					accessor: "progress",
					disableSortBy: true,
					width: 100,
					disableFilters: true,
				},
			],
		},
		{
			Header: "Target",
			columns: [
				{
					Header: "Jml",
					accessor: "target_jumlah_hasil",
					disableSortBy: true,
					width: 50,
					disableFilters: true,
				},
				{
					Header: "Satuan",
					accessor: "satuan",
					disableSortBy: true,
					disableFilters: true,
					width: 100,
				},
				{
					Header: "biaya",
					accessor: "biaya",
					// disableSortBy: true,
					disableFilters: true,
					width: 100,
				},
				{
					Header: "waktu",
					accessor: "target_waktu_pelaksanaan",
					// disableSortBy: true,
					width: 75,
					disableFilters: true,
				},
			],
		},
	];
	return { Columns, programKegiatanEdit, setProgramKegiatanEdit };
};
export const schemaProgramKegiatan = yup
	.object({
		biaya: yup
			.number()
			.nullable()
			.transform(value => (isNaN(value) ? undefined : value)),
		indikator: yup.string().when("type", {
			is: val => val === "subKegiatan",
			then: schema => schema.required("Indikator Harus diisi"),
			otherwise: schema => schema.nullable(),
		}),
		type: yup.string().required("Jenis harus diisi"),
		kinerja: yup.string().when("type", {
			is: val => val === "subKegiatan",
			then: schema => schema.required("Kinerja Harus diisi"),
			otherwise: schema => schema.nullable(),
		}),
		kode_bidang_urusan: yup.string().required("Kode bidang urusan harus diisi"),
		kode_kegiatan: yup.string().when("type", {
			is: val => val !== "program",
			then: schema => schema.required("Kode Kegiatan Harus diisi"),
			otherwise: schema => schema.nullable(),
		}),
		kode_program: yup.string().required("Kode program harus diisi"),
		kode_sub_kegiatan: yup.string().when("type", {
			is: val => val === "subKegiatan",
			then: schema => schema.required("Kode sub kegiatan Harus diisi"),
			otherwise: schema => schema.nullable(),
		}),
		kode_urusan: yup.string().required("Kode urusan harus diisi"),
		nomenklatur: yup.string().required("Nomenklatur harus diisi"),
		progress: yup.string().nullable(),
		satuan: yup.string().nullable(),
		tahun_anggaran: yup.string().required(" harus diisi"),
		target_jumlah_hasil: yup
			.number()
			.nullable()
			.transform(value => (isNaN(value) ? undefined : value)),
		target_waktu_pelaksanaan: yup
			.number()
			.nullable()
			.transform(value => (isNaN(value) ? undefined : value)),
		unit_id: yup
			.number()
			.required("Unit Pelaksana (Bidang/Sekreatriat harus diisi)")
			.transform(value => (isNaN(value) ? undefined : value)),
	})
	.required();

export const defaultValuesProgramKegiatan = {
	biaya: "",
	id_kegiatan: null,
	id_program: null,
	indikator: "",
	type: "",
	kinerja: "",
	kode_bidang_urusan: "",
	kode_kegiatan: "",
	kode_program: "",
	kode_sub_kegiatan: "",
	kode_urusan: "",
	nomenklatur: "",
	progress: "",
	satuan: "",
	tahun_anggaran: new Date().getFullYear(),
	target_jumlah_hasil: "",
	target_waktu_pelaksanaan: "",
	unit_id: null,
};
export const formDefault = (data = {}) => {
	let form = {
		biaya: "",
		id_kegiatan: null,
		id_program: null,
		indikator: "",
		type: "program",
		kinerja: "",
		kode_bidang_urusan: "",
		kode_kegiatan: "",
		kode_program: "",
		kode_sub_kegiatan: "",
		kode_urusan: "",
		nomenklatur: "",
		progress: "",
		satuan: "",
		tahun_anggaran: new Date().getFullYear(),
		target_jumlah_hasil: "",
		target_waktu_pelaksanaan: "",
		unit_id: null, // selesai: "",
	};
	if (data.id) {
		form = {
			biaya: data.biaya || "",
			id_kegiatan: data.id_kegiatan || null,
			id_program: data.id_program || null,
			indikator: data.indikator || "",
			type: data.kode_sub_kegiatan
				? "subKegiatan"
				: data.kode_kegiatan
				? "kegiatan"
				: "program",
			kinerja: data.kinerja || "",
			kode_bidang_urusan: data.kode_bidang_urusan || "",
			kode_kegiatan: data.kode_kegiatan || "",
			kode_program: data.kode_program || "",
			kode_sub_kegiatan: data.kode_sub_kegiatan || "",
			kode_urusan: data.kode_urusan || "",
			nomenklatur: data.nomenklatur || "",
			progress: data.progress || "",
			satuan: data.satuan || "",
			tahun_anggaran: data.tahun_anggaran || new Date().getFullYear(),
			target_jumlah_hasil: data.target_jumlah_hasil || "",
			target_waktu_pelaksanaan: data.target_waktu_pelaksanaan || "",
			unit_id: data.unit_id || null,
		};
	}
	return form;
};
