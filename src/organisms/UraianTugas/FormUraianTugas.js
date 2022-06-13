import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
	addUraianTugas,
	updateUraianTugas,
} from "@hooks/api/Kepegawaian/uraianTugas";
import { Button, Input, Textarea, ComboBox, Radio } from "@atoms/FormControl";
import {
	makeOptionsJabatan,
	createOptionJabatan,
	getJabatan,
} from "@hooks/api/Kepegawaian/jabatan";
function FormUraianTugas({
	dataEdit = {},
	returnSuccess = () => {},
	withJabatan = false,
	close = () => {},
	jabatanId = {},
}) {
	const [loading, setLoading] = useState(false);
	const [optionsJabatan, setOptionsJabatan] = useState([]);
	const schema = yup
		.object({
			jenis_tugas: yup.string().required("Jenis uraian tugas harus diisi"),
			uraian_tugas: yup.string().required("Uraian tugas harus diisi"),
			indikator: yup.string().nullable(),
			angka_kredit: yup
				.number()
				.nullable()
				.transform(value => (isNaN(value) ? undefined : value)),
			keterangan: yup.string().nullable(),

			jabatan_id: yup
				.number()
				.transform(value => (isNaN(value) ? undefined : value))
				.when("requireJabatan", {
					is: val => val === true,
					then: schema => schema.required("Data Harus diisi"),
					otherwise: schema => schema.nullable(),
				}),
		})
		.required();

	const {
		control,
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			requireJabatan: withJabatan,
			jenis_tugas: dataEdit?.jenis_tugas || "Tugas Pokok",
			uraian_tugas: dataEdit?.uraian_tugas || "",
			indikator: dataEdit?.indikator || "",
			angka_kredit: dataEdit?.angka_kredit || "",
			jabatan_id: dataEdit?.jabatan_id || jabatanId || "",
		},
		resolver: yupResolver(schema),
		reValidateMode: "onChange",
	});
	useEffect(() => {
		makeOptionsJabatan().then(options => setOptionsJabatan(options));
	}, []);

	const resetForm = () => {
		reset(undefined, {
			keepDefaultValues: true,
		});
		close();
	};
	const submitForm = async (form, event) => {
		event.preventDefault();
		setLoading(true);
		if (dataEdit && dataEdit?.id) {
			updateUraianTugas(form, dataEdit.id).then(response => {
				if (response.success) {
					returnSuccess(response.data);
					resetForm();
				} else {
					console.warn(response);
				}
				return setLoading(false);
			});
		} else {
			addUraianTugas(form).then(response => {
				if (response.success) {
					resetForm();
					console.log(response);
					returnSuccess(response.data);
				} else {
					console.warn(response);
				}
				return setLoading(false);
			});
		}
	};

	return (
		<div className="w-full">
			<div className="form-header">Formulir Uraian Tugas</div>
			<form className="form" onSubmit={handleSubmit(submitForm)}>
				<div className="flex mx-4 py-2 flex-col gap-2">
					<div className="flex justify-center gap-2 sm:gap-5 p-2 mx-2 rounded-full bg-stone-500/50 items-center flex-1">
						<Radio
							{...register("jenis_tugas")}
							id="Tugas Pokok"
							text="Tugas Pokok"
							value="Tugas Pokok"
							color="green"
							labelFont="font-semibold sm:tracking-widest"
						/>
						<Radio
							{...register("jenis_tugas")}
							id="Tugas Tambahan"
							text="Tugas Tambahan"
							value="Tugas Tambahan"
							labelFont="font-semibold upercase sm:tracking-widest"
						/>
					</div>
					{optionsJabatan && (
						<Controller
							render={({ field: { onChange, value } }) => (
								<ComboBox
									value={value}
									options={optionsJabatan}
									placeholder="Jabatan"
									error={errors?.jabatan_id?.message}
									onChange={e => onChange(e)}
									disabled={!withJabatan}
								/>
							)}
							name="jabatan_id"
							control={control}
						/>
					)}
					<Controller
						render={({ field }) => (
							<Textarea
								{...field}
								placeholder="Uraian Tugas"
								error={errors?.uraian_tugas?.message}
							/>
						)}
						name="uraian_tugas"
						control={control}
					/>

					<Controller
						render={({ field }) => (
							<Input
								{...field}
								type="number"
								placeholder="Angka kredit"
								error={errors?.angka_kredit?.message}
							/>
						)}
						name="angka_kredit"
						control={control}
					/>
					<Controller
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Indikator kinerja"
								error={errors?.indikator?.message}
							/>
						)}
						name="indikator"
						control={control}
					/>
				</div>

				<div className="flex form-footer">
					<Button
						type="button"
						loading={loading}
						onClick={resetForm}
						color="red">
						Tutup
					</Button>
					<Button disable={loading} loading={loading} type="submit">
						{dataEdit?.id ? "Simpan Perubahan" : "Simpan"}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default FormUraianTugas;
