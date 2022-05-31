import { Button, Input, Textarea, ComboBox } from "@atoms/FormControl";
import { useForm, Controller, useWatch } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Icons from "@atoms/Icons";
import * as yup from "yup";
import { Switch } from "@headlessui/react";
import DatePicker from "react-datepicker";
import { addAktivitas, updateAktivitas } from "@hooks/api/Kegiatan/aktivitas";
import { makeOptionsUraianTugas } from "@hooks/api/Kepegawaian/uraianTugas";
import { makeOptionsUnits } from "@hooks/api/Kepegawaian/unit";
import { makeOptionsPorgramKegiatan } from "@hooks/api/Kegiatan/programKegiatan";
function FormAktivitas({
	data = {},
	close = () => {},
	pegawai = {},
	returnSuccess = () => {},
} = {}) {
	const { getOptionsUnit, optionsUnit } = makeOptionsUnits();
	const { optionsUraianTugas, getOptionsUraianTugas } = makeOptionsUraianTugas();

	const [hasUraianTugas, sethasUraianTugas] = useState(true);
	const [jabatanId, setJabatanId] = useState(pegawai?.jabatan_id);
	const { getOptionsSubKegiatan, optionsSubKegiatan } = makeOptionsPorgramKegiatan();
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
			unit_id: pegawai?.unit_id || "",
			uraian_tugas_id: "",
		},
		resolver: yupResolver(schema),
		reValidateMode: "onChange",
	});

	useEffect(async () => {
		if (optionsUnit.length == 0) {
			await getOptionsUnit();
		}
		if (jabatanId && hasUraianTugas && optionsUraianTugas.length == 0) {
			await getOptionsUraianTugas(jabatanId);
		}
	}, [jabatanId, hasUraianTugas]);

	useEffect(() => {
		if (data && data?.uraian_tugas_id == null) {
			sethasUraianTugas(false);
		}
	}, [data]);
	useEffect(() => {
		if (!optionsSubKegiatan.length > 0) {
			getOptionsSubKegiatan();
		}
	}, []);

	const resetForm = () => {
		reset({}, { keepDefaultValues: true });
		if (close) {
			close();
		}
	};
	const submitForm = (form, event) => {
		event.preventDefault();
		if (data && data?.id) {
			updateAktivitas(form, data.id).then(res => {
				if (res.success) {
					returnSuccess(res);
					return resetForm();
				}
			});
		} else {
			addAktivitas(form).then(res => {
				if (res.success) {
					returnSuccess(res);
					return resetForm();
				}
			});
		}
	};
	return (
		<>
			<div className="form-header ">Formulir Tambah Kegiatan</div>
			<form className="form" onSubmit={handleSubmit(submitForm)}>
				<div className="flex px-4 flex-col gap-2">
					<Controller
						render={({ field }) => (
							<Input {...field} placeholder="Judul Aktivitas" error={errors?.judul?.message} />
						)}
						name="judul"
						control={control}
					/>
					<Controller
						render={({ field }) => (
							<Textarea {...field} placeholder="Uraian Aktivitas" error={errors?.uraian?.message} />
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

					{jabatanId && (
						<label className="flex flex-wrap justify-between items-start">
							Aktivitas sesuai uraian tugas?
							<Switch
								checked={hasUraianTugas}
								onChange={sethasUraianTugas}
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
					{hasUraianTugas && optionsUraianTugas.length > 0 && jabatanId && (
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
