import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Input, Radio } from "@atoms/FormControl";
import { addRoles, updateRoles } from "@hooks/api/ManajemenUser/roles";
import { makeOptionsPermissions } from "@hooks/api/ManajemenUser/permissions";

function FormRole({
	editData = {},
	returnSuccess = () => {},
	close = () => {},
}) {
	const [loading, setLoading] = useState(false);
	const [optionsPermissions, setOptionsPermissions] = useState({});
	const [permissionNames, setPermissionNames] = useState([]);
	const schema = yup
		.object({
			name: yup.string().required("Nama Role harus diisi"),
			level: yup
				.number()
				.required("Level Role harus diisi")
				.transform(value => (isNaN(value) ? undefined : value)),
			description: yup.string().required("Deskripsi harus diisi"),
			permission_names: yup.array().required("Ijin Peran Harus diisi"),
		})
		.required();

	const {
		control,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: editData?.name || "",
			level: editData?.level || "",
			description: editData?.description || "",
			permission_names: [],
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
		if (editData && editData?.id) {
			updateRoles(form, editData.id).then(response => {
				if (response.success) {
					resetForm();
					returnSuccess(response.data);
				}
				return setLoading(false);
			});
		} else {
			addRoles(form).then(response => {
				if (response.success) {
					resetForm();
					returnSuccess(response.data);
				}
				return setLoading(false);
			});
		}
	};
	const handleCheck = event => {
		let updatedList = [...permissionNames];
		if (event.target.checked) {
			updatedList = [...permissionNames, event.target.value];
		} else {
			updatedList.splice(permissionNames.indexOf(event.target.value), 1);
		}
		setPermissionNames(updatedList);
	};
	useEffect(() => {
		makeOptionsPermissions().then(d => setOptionsPermissions(d));
	}, []);
	useEffect(() => {
		if (editData.id && editData.permissions) {
			let temp = [];
			editData.permissions.map(({ name }) => temp.push(name));
			setPermissionNames(temp);
		}
	}, [editData]);
	useEffect(() => {
		setValue("permission_names", permissionNames);
	}, [permissionNames]);

	return (
		<div className="w-full ">
			<div className="form-header">Formulir Role</div>
			<form className="form" onSubmit={handleSubmit(submitForm)}>
				<div className="flex mx-4 py-2 flex-col gap-2">
					<Controller
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Nama Role"
								error={errors?.name?.message}
							/>
						)}
						name="name"
						control={control}
					/>
					<Controller
						render={({ field }) => (
							<Input
								{...field}
								type="number"
								placeholder="Level"
								error={errors?.level?.message}
							/>
						)}
						name="level"
						control={control}
					/>
					<Controller
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Deskripsi"
								error={errors?.description?.message}
							/>
						)}
						name="description"
						control={control}
					/>
					{/* <Controller
						render={({ field }) => (
							<Select
								isMulti
								onChange={e => console.log(e)}
								options={optionsPermissions}
							/>
						)}
						name="optionsPermissions"
						control={control}
					/> */}
				</div>
				<label className="text-center uppercase inline-block w-full mx-4 p-2 bg-slate-500/10">
					Nama-Nama Ijin Role
				</label>
				<div className="flex mb-2 p-3 max-w-full overflow-auto scrollbar-thin flex-cols-2 gap-3">
					{Object.keys(optionsPermissions).map((group, i) => (
						<div
							key={i}
							className="bg-slate-500/10 rounded-md p-2 w-full text-center font-semibold">
							<label className="uppercase">{group}</label>
							{optionsPermissions[group].map(item => (
								<label
									key={item}
									className="flex space-x-3 items-center font-normal">
									<input
										value={item}
										checked={permissionNames.includes(item)}
										type="checkbox"
										onChange={handleCheck}
									/>
									<span>{item}</span>
								</label>
							))}
						</div>
					))}
				</div>
				<p>{errors?.permission_names?.message}</p>

				<div className="flex form-footer">
					<Button
						type="button"
						loading={loading}
						onClick={resetForm}
						color="red">
						Tutup
					</Button>
					<Button disable={loading} loading={loading} type="submit">
						{editData?.id ? "Simpan Perubahan" : "Simpan"}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default FormRole;
