import { Button, Input, Textarea, ComboBox } from "@atoms/FormControl";
import { useForm, Controller, useWatch } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Icons from "@atoms/Icons";
import * as yup from "yup";
import { Switch } from "@headlessui/react";
import DatePicker from "react-datepicker";
import { addAktivitas, updateAktivitas } from "@hooks/api/Kegiatan/aktivitas";
import { makeOptionsUnit } from "@hooks/api/Kepegawaian/unit";
import {
	makeOptionsSubKegiatan,
	makeOptionsPorgramKegiatan,
} from "@hooks/api/Kegiatan/programKegiatan";
function FormAktivitas({
	data = {},
	close = () => {},
	user = {},
	responseFromChild = () => {},
} = {}) {
	const [optionsUnit, setOptionsUnit] = useState([]);
	const [hasUraianTugas, setHasUraianTugas] = useState(false);
	const [optionsUraianTugas, setOptionsUraianTugas] = useState([]);
	const [optionsSubKegiatan, setOptionsSubKegiatan] = useState([]);

	const schema = yup
		.object({
			judul: yup.string().required("Judul aktivitas harus diisi"),
			mulai: yup.date().required("Waktu mulai aktivitas harus diisi"),
			uraian: yup.string().required("Uraian aktivitas harus diisi"),
			unit_id: yup
				.number()
				.transform(value => (isNaN(value) ? undefined : value))
				.nullable(),
			uraian_tugas_id: yup
				.number()
				.transform(value => (isNaN(value) ? undefined : value))
				.nullable(),
		})
		.required();

	const {
		control,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			judul: data?.judul || "",
			mulai: data?.mulai ? new Date(data?.mulai) : new Date(),
			uraian: data?.uraian || "",
			unit_id: user?.unit_id || "",
			uraian_tugas_id: "",
		},
		resolver: yupResolver(schema),
		reValidateMode: "onChange",
	});
	const unitId = useWatch({
		control,
		name: "unit_id",
	});
	useEffect(() => {
		makeOptionsSubKegiatan();
		return () => {
			setOptionsSubKegiatan([]);
		};
	}, []);
	useEffect(() => {
		makeOptionsUnit().then(d => setOptionsUnit(d));
		return () => {
			setOptionsUnit([]);
		};
	}, []);
	useEffect(() => {
		if (unitId) {
			makeOptionsPorgramKegiatan(
				`filter[type]=subKegiatan&filter[unit_id]=${unitId}`,
			).then(d => setOptionsSubKegiatan(d));
			// makeOptionsSubKegiatan({ unitId }).then(d => setOptionsSubKegiatan(d));
		}
	}, [unitId]);
	useEffect(() => {
		if (data && data?.uraian_tugas_id) {
			setHasUraianTugas(true);
		}
	}, [data]);
	useEffect(() => {
		if (user.jabatan?.uraianTugas) {
			const data = user.jabatan.uraianTugas;
			let temp = [];
			data.map(d => {
				temp[d.id] = { key: d.id, value: d.id, label: d.uraian_tugas };
			});
			setOptionsUraianTugas(temp);
		}
	}, [user]);

	const resetForm = () => {
		reset({}, { keepDefaultValues: true });
		close();
	};
	const submitForm = (form, event) => {
		event.preventDefault();
		if (data && data?.id) {
			updateAktivitas(form, data.id).then(res => {
				if (res.success) {
					responseFromChild(res);
					return resetForm();
				}
			});
		} else {
			addAktivitas(form).then(res => {
				if (res.success) {
					responseFromChild(res);
					return resetForm();
				}
			});
		}
	};
	return (
		<>
			<div className="form-header ">Formulir Tambah Aktivitas</div>
			<form className="form" onSubmit={handleSubmit(submitForm)}>
				<div className="flex px-4 flex-col gap-2">
					<Controller
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Judul Aktivitas"
								error={errors?.judul?.message}
							/>
						)}
						name="judul"
						control={control}
					/>
					<Controller
						render={({ field }) => (
							<Textarea
								{...field}
								placeholder="Uraian Aktivitas"
								error={errors?.uraian?.message}
							/>
						)}
						name="uraian"
						control={control}
					/>

					{optionsUnit && (
						<Controller
							render={({ field: { onChange, value } }) => (
								<ComboBox
									value={value}
									options={optionsUnit}
									placeholder="Pilih Bidang/Sekreariat"
									error={errors?.unit_id?.message}
									onChange={e => onChange(e)}
								/>
							)}
							name="unit_id"
							control={control}
						/>
					)}
					<Controller
						render={({ field: { onChange, value } }) => (
							<ComboBox
								placeholder="Pilih Kegiatan (Dalam DPA/DPPA)"
								options={optionsSubKegiatan}
								value={value}
								error={errors?.program_kegiatan_id?.message}
								onChange={e => onChange(e)}
							/>
						)}
						name="program_kegiatan_id"
						control={control}
					/>
					{user?.jabatan?.uraianTugas && (
						<label className="flex flex-wrap justify-between items-start">
							Aktivitas sesuai uraian tugas?
							<Switch
								checked={hasUraianTugas}
								onChange={() => {
									setHasUraianTugas(!hasUraianTugas);
								}}
								className={`${
									hasUraianTugas ? "bg-blue-300" : "bg-red-300"
								} relative inline-flex h-6 w-11 items-center rounded-full`}>
								<span className="sr-only">Ya</span>

								{hasUraianTugas ? (
									<Icons
										icon="CheckCircleIcon"
										className="w-5 h-5 translate-x-6 inline-block text-green-800 transform"
									/>
								) : (
									<Icons
										icon="XCircleIcon"
										className="w-5 h-5  text-rose-800 rounded-full translate-x-1 inline-block transform"
									/>
								)}
							</Switch>
						</label>
					)}

					{hasUraianTugas && (
						<Controller
							render={({ field: { onChange, value } }) => (
								<ComboBox
									placeholder="Uraian Tugas"
									options={optionsUraianTugas}
									value={value}
									error={errors?.uraian_tugas_id?.message}
									onChange={e => onChange(e)}
								/>
							)}
							name="uraian_tugas_id"
							control={control}
						/>
					)}
					<div className="items-center md:flex gap-2 mb-2">
						<label className="font-bold text-opacity-50 -mb-3 md:mb-0 whitespace-nowrap">
							Waktu Mulai Aktivitas :
						</label>
						<Controller
							render={({ field: { onChange, value } }) => (
								<DatePicker
									selected={value}
									className="bg-transparent font-medium  w-full outline-none border-0 border-b border-slate-500 focus:border-blue-600 focus:border-b-2 outline-transparent focus:ring-0 ring-transparent"
									onChange={date => onChange(date)}
									locale="id"
									timeInputLabel="Waktu:"
									dateFormat="dd MMMM yyyy (H:mm:ss)"
									showYearDropdown
									showTimeInput
									placeholderText="Pilih Waktu Mulai Aktivitas"
								/>
							)}
							name="mulai"
							control={control}
						/>
					</div>
				</div>

				<div className="form-footer">
					<Button onClick={resetForm} type="button" size="md" color="red">
						Tutup
						<Icons icon="XIcon" className="-mr-2 w-4 h-4" />
					</Button>
					<Button
						type="submit"
						// className="flex group gap-1 items-center bg-transparent focus:text-opacity-90 text-current focus:bg-transparent  hover:bg-opacity-40"
						size="md"
						color="lime">
						Simpan
						<Icons icon="UploadIcon" className="-mr-2 w-4 h-4 text-sky-200" />
					</Button>
				</div>
			</form>
		</>
	);
}
export default FormAktivitas;
