import React, { useMemo, useState, useEffect } from "react";
import Head from "next/head";
import AppLayout from "@components/Layouts/AppLayout";
import SemuaAktivitas from "@organisms/Aktivitas/SemuaAktivitasAktivitas";
import makeQueryParams from "@/lib/makeQueryParams";
import { getAktivitas } from "@hooks/api/Kegiatan/aktivitas";
import FormAktivitas from "@organisms/Aktivitas/FormAktivitas";
import DialogModal from "@atoms/Modal";
import FormFollowAktivitas from "@organisms/Aktivitas/FormFollowAktivitas";
function ProgramKegiatan() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});
	const [perPage, setPerPage] = useState(10);
	const [globalFilter, setGlobalFilter] = useState("");
	const [filters, setFilters] = useState([]);
	const [includes, setIncludes] = useState(
		"users,units,uraianTugas,createdBy.jabatan,programKegiatan.unit,programKegiatan.program,programKegiatan.kegiatan",
	);
	const [openModal, setOpenModal] = useState(false);
	const [openModalFollow, setOpenModalFollow] = useState(false);
	const [editAktivitas, setEditAktivitas] = useState({});
	const [dataFollow, setDataFollow] = useState({});
	const [openModalFilter, setOpenModalFilter] = useState(false);

	const param = makeQueryParams({ globalFilter, filters, perPage, includes });
	const [query, setQuery] = useState(param);
	const [queryNew, setQueryNew] = useState(param);

	const getData = async query => {
		setLoading(true);
		const res = await getAktivitas({ query });
		if (res.success) {
			setLoading(false);
			return res;
		}
		setLoading(false);
		return {};
	};
	const refresData = async () => {
		getData(query).then(res => {
			setData(res);
			setOpenModal(false);
		});
	};
	useEffect(async () => {
		if (query) {
			refresData();
		}
		return () => {
			setData({});
		};
	}, [query]);

	useEffect(() => {
		if (editAktivitas?.id) {
			setOpenModal(true);
		}
	}, [editAktivitas]);
	useEffect(() => {
		if (dataFollow?.id) {
			setOpenModalFollow(true);
		}
	}, [dataFollow]);
	useEffect(() => {
		if (filters.length) {
			const param = makeQueryParams({
				globalFilter,
				filters,
				perPage,
				includes,
			});
			if (param) {
				getData(param).then(res => {
					setData(res);
					setFilters([]);
				});
			}
		}
	}, [filters]);
	const closeModalFolowing = () => {
		setDataFollow({});
		setOpenModalFollow(false);
	};
	const closeModalFilter = () => {
		setDataFollow({});
		setOpenModalFilter(false);
	};

	const returnSuccess = newData => {
		refresData();
	};
	return (
		<AppLayout>
			<Head>
				<title>Aktivitas</title>
			</Head>

			<div className="w-full h-full sm:px-2 ">
				<div className="w-full h-full flex flex-col">
					<div className="py-2 h-fit flex-none bg-slate-800 bg-opacity-20 px-4">
						<div className="border border-slate-200 border-l-0 border-r-0 py-1">
							<div className="grid grid-flow-col gap-2 ">
								<button
									className="w-full flex space-x-2 justify-center items-center bg-stone-500 hover:bg-slate-500 text-xl py-2 rounded-lg text-slate-50"
									onClick={() => alert("to do list")}>
									<span className="text-sm font-semibold">Print</span>
								</button>
								<button
									className="w-full flex space-x-2 justify-center items-center hover:bg-slate-500 text-xl py-2 rounded-lg text-slate-50"
									onClick={refresData}>
									<span className="text-sm font-semibold">Refresh</span>
								</button>
								<button
									className="w-full flex space-x-2 justify-center items-center  hover:bg-slate-500 text-xl py-2 rounded-lg text-slate-50"
									onClick={() => setOpenModalFilter(true)}>
									<span className="text-sm font-semibold">Filter</span>
								</button>
								<button
									className="w-full flex space-x-2 justify-center items-center hover:bg-slate-500 text-xl py-2 rounded-lg text-slate-50"
									onClick={() => setOpenModal(!openModal)}>
									<span className="text-sm font-semibold">
										Tambah Aktivitas
									</span>
								</button>
							</div>
						</div>
					</div>
					<div className="grow sm:px-2 py-2  pb-4 overflow-auto">
						<SemuaAktivitas
							allDataAktivitas={data}
							setDataFollow={setDataFollow}
							pageLoad={loading}
							returnSuccess={returnSuccess}
						/>
					</div>
				</div>
				{
					<DialogModal
						size="xl"
						isOpen={openModal}
						setIsOpen={() => setOpenModal(true)}
						closeModal={() => setOpenModal(false)}>
						<div className="min-w-max">
							<FormAktivitas
								returnSuccess={returnSuccess}
								close={() => {
									setOpenModal(false);
								}}
								editData={editAktivitas}
							/>
						</div>
					</DialogModal>
				}
				<DialogModal
					size="xl"
					setIsOpen={() => setOpenModalFollow(true)}
					closeModal={closeModalFolowing}>
					<div className="min-w-max">
						<FormFollowAktivitas
							returnSuccess={returnSuccess}
							close={closeModalFolowing}
							dataFollow={dataFollow}
						/>
					</div>
				</DialogModal>
				<DialogModal
					size="xl"
					isOpen={openModalFilter}
					closeModal={closeModalFilter}>
					<div className="min-w-max">
						<FormFilterAktivitas
							setFilters={setFilters}
							close={closeModalFilter}
						/>
					</div>
				</DialogModal>
			</div>
		</AppLayout>
	);
}

export default ProgramKegiatan;
import { Input, Button, ComboBox } from "@atoms/FormControl";
import { makeOptionsUnits } from "@hooks/api/Kepegawaian/unit";
import { useForm, Controller, useWatch } from "react-hook-form";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Select } from "@atoms/FormControl";
const FormFilterAktivitas = ({
	setFilters = () => {},
	close = () => {},
} = {}) => {
	const [tempTanggal, setTempTanggal] = useState("");
	const { getOptionsUnit, optionsUnit } = makeOptionsUnits();

	const {
		control,
		handleSubmit,
		setValue,
		reset,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			tanggal: "",
			unit_id: "",
		},
	});
	useEffect(() => {
		getOptionsUnit();
	}, []);

	useEffect(() => {
		if (tempTanggal) {
			const d = moment(tempTanggal).format("Y-MM-DD");
			setValue("tanggal", d);
		}
		return () => {
			setValue("tanggal", "");
		};
	}, [tempTanggal]);

	const submitForm = (form, event) => {
		event.preventDefault();
		const output = Object.entries(form).map(([id, value]) => ({ id, value }));
		setFilters(output);
	};

	return (
		<div className="w-full text-lg text-red-400">
			<p className="form-header">Pilih Jenis Filter</p>

			<form className="form" onSubmit={handleSubmit(submitForm)}>
				<input
					// onChange={e => console.log(e.target.value)}
					className="opacity-0 z-10 -my-4 pointer-events-none py-0 h-0"
					type="text"
				/>

				<input {...register("tanggal")} className="w-full hidden" type="date" />
				<div className="px-4 flex-col flex gap-2 pb-4">
					{optionsUnit.length > 0 && (
						<div>
							<label className="font-bold text-opacity-50 -mb-3 md:mb-0 whitespace-nowrap">
								Bagian / Sekreariat
							</label>
							<Controller
								render={({ field: { onChange, value } }) => (
									<Select
										isClearable={true}
										onChange={e => {
											onChange(e?.value);
										}}
										options={optionsUnit}
									/>
								)}
								name="unit_id"
								control={control}
							/>
						</div>
					)}

					<div className="items-center md:flex gap-2 py-1">
						<label className="font-bold text-opacity-50 -mb-3 md:mb-0 whitespace-nowrap">
							Tanggal
						</label>
						<DatePicker
							selected={tempTanggal}
							className="bg-transparent font-medium text-base  w-full outline-none border-slate-500 border-b focus:border-b-2 outline-transparent focus:ring-0 py-1 ring-transparent"
							onChange={date => {
								setTempTanggal(date);
							}}
							locale="id"
							todayButton="Hari Ini"
							dateFormat="dd MMMM yyyy"
							strictParsing
							isClearable
							placeholderText="Pilih Tanggal"
							peekNextMonth
							showMonthDropdown
							showYearDropdown
							dropdownMode="select"
							yearDropdownItemNumber={10}
							withPortal
							portalId="root-portal"
						/>
					</div>
				</div>

				<div className="form-footer">
					<Button onClick={close} type="button">
						Tutup
					</Button>
					<Button type="submit" color="red">
						Filter
					</Button>
				</div>
			</form>
		</div>
	);
};
