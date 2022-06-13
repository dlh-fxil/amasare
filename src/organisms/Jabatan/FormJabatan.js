import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Input, ComboBox } from "@atoms/FormControl";
import { addJabatan, updateJabatan } from "@hooks/api/Kepegawaian/jabatan";
function FormJabatan({
	dataEdit = {},
	returnSuccess = () => {},
	close = () => {},
}) {
	const [loading, setLoading] = useState(false);
	const [optionsJenisJabatan, setOptionsJenisJabatan] = useState([
		{ id: 1, value: "Struktural", label: "Jabatan Struktural" },
		{
			id: 2,
			value: "Fungsional Tertentu",
			label: "Jabatan Fungsional Tetentu",
		},
		{ id: 3, value: "Fungsional Umum", label: "Jabatan Fungsional Umum" },
	]);
	const schema = yup
		.object({
			jenis: yup.string().required("Jenis jabatan harus diisi"),
			nama: yup.string().required("Uraian tugas harus diisi"),
			kelas: yup
				.number()
				.nullable()
				.transform(value => (isNaN(value) ? undefined : value)),
			singkatan: yup.string().nullable(),
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
			jenis: dataEdit?.jenis || "Fungsional Umum",
			nama: dataEdit?.nama || "",
			kelas: dataEdit?.kelas || 10,
			singkatan: dataEdit?.singkatan || "",
		},
		resolver: yupResolver(schema),
		reValidateMode: "onChange",
	});

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
			updateJabatan(form, dataEdit.id).then(response => {
				if (response.success) {
					returnSuccess(response.data);
					close();
					resetForm();
				}
				return setLoading(false);
			});
		} else {
			addJabatan(form).then(response => {
				if (response.success) {
					resetForm();
					returnSuccess(response.data);
				}
				return setLoading(false);
			});
		}
	};

	return (
		<div className="w-full">
			<div className="form-header">Formulir Jabatan</div>
			<form className="form" onSubmit={handleSubmit(submitForm)}>
				<div className="flex mx-4 py-2 flex-col gap-2">
					{optionsJenisJabatan && (
						<Controller
							render={({ field: { onChange, value } }) => (
								<ComboBox
									value={value}
									options={optionsJenisJabatan}
									placeholder="Jenis Jabatan"
									error={errors?.jenis?.message}
									onChange={e => onChange(e)}
								/>
							)}
							name="jenis"
							control={control}
						/>
					)}

					<Controller
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Nama Jabatan"
								error={errors?.nama?.message}
							/>
						)}
						name="nama"
						control={control}
					/>
					<Controller
						render={({ field }) => (
							<Input
								{...field}
								type="number"
								placeholder="Kelas Jabatan"
								error={errors?.kelas?.message}
							/>
						)}
						name="kelas"
						control={control}
					/>
					<Controller
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Singkatan"
								error={errors?.singkatan?.message}
							/>
						)}
						name="singkatan"
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

export default FormJabatan;
