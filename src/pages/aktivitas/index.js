import React, { useState, useEffect } from "react";
import { Input, Button, ComboBox } from "@atoms/FormControl";
import AppLayout from "@components/Layouts/AppLayout";
import SemuaAktivitas from "@organisms/Aktivitas/SemuaAktivitasAktivitas";
import makeQueryParams from "@/lib/makeQueryParams";
import { getAktivitas } from "@hooks/api/Kegiatan/aktivitas";
import DialogModal from "@atoms/Modal";
import ModalAktivitas from "@organisms/Profile/ModalAktivitas";
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
	const [editAktivitas, setEditAktivitas] = useState({});
	const [openModalFilter, setOpenModalFilter] = useState(false);
	const param = makeQueryParams({ globalFilter, filters, perPage, includes });
	const [query, setQuery] = useState(param);

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

	const closeModalFilter = () => {
		setOpenModalFilter(false);
	};

	const closeModal = () => {
		setOpenModal(false);
	};
	const responseFromChild = ({ success = false }) => {
		if (success) {
			refresData();
		}
	};
	return (
		<AppLayout title="Aktivitas">
			<div className="h-full py-2">
				<div className="card-content h-full flex flex-col">
					<div className="pb-4 h-fit  flex-none">
						<div className="flex items-center justify-end space-x-2">
							{/* <Button color="slate" onClick={() => alert("to do list")}>
								Print
							</Button> */}
							<Button
								data-tip="Refresh Data"
								iconOnly
								rounded
								color="red"
								className="p-1"
								buttonType="outline"
								onClick={refresData}>
								<Icons icon="RefreshIcon" className="w-6 h-6 text-rose-800" />
							</Button>
							<Button
								data-tip="Filter Data"
								iconOnly
								rounded
								color="lime"
								buttonType="outline"
								className=" p-1"
								onClick={() => setOpenModalFilter(true)}>
								<Icons
									icon="AdjustmentsIcon"
									className="w-6 h-6 text-lime-800"
									// outline
								/>
							</Button>
							<Button
								data-tip="Tambah Aktivitas Baru"
								color="lime"
								onClick={() => setOpenModal(true)}>
								<Icons
									icon="PlusCircleIcon"
									className="w-6 h-6 -my-2 -ml-4"
									// outline
								/>
								Aktivitas baru
							</Button>
						</div>
					</div>
					<div className="grow overflow-auto">
						<SemuaAktivitas
							allDataAktivitas={data}
							pageLoad={loading}
							responseFromChild={responseFromChild}
						/>
					</div>
				</div>
			</div>

			<ModalAktivitas
				open={openModal}
				editData={editAktivitas}
				close={closeModal}
				responseFromChild={responseFromChild}
			/>
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
		</AppLayout>
	);
}

export default ProgramKegiatan;

import { makeOptionsUnits } from "@hooks/api/Kepegawaian/unit";
import { useForm, Controller, useWatch } from "react-hook-form";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Select } from "@atoms/FormControl";
import Icons from "@atoms/Icons";

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
