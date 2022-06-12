import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Input, Radio } from "@atoms/FormControl";
import {
	addRoles,
	makeOptionsRoles,
	updateRoles,
} from "@hooks/api/ManajemenUser/roles";

function FormPegawai({
	editData = {},
	returnSuccess = () => {},
	close = () => {},
}) {
	const [loading, setLoading] = useState(false);
	const [optionsRoles, setOptionsRoles] = useState([]);
	const [rolesNames, setRolesNames] = useState([]);
	const schema = yup
		.object({
			// name: yup.string().required("Nama Role harus diisi"),
			// level: yup
			// 	.number()
			// 	.required("Level Role harus diisi")
			// 	.transform(value => (isNaN(value) ? undefined : value)),
			// description: yup.string().required("Deskripsi harus diisi"),
			role_names: yup.array().required("Peran (Role) Harus diisi"),
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
			// name: editData?.name || "",
			// level: editData?.level || "",
			// description: editData?.description || "",
			role_names: [],
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
		console.log(form);
		// if (editData && editData?.id) {
		// 	updateRoles(form, editData.id).then(response => {
		// 		if (response.success) {
		// 			resetForm();
		// 			returnSuccess(response.data);
		// 		}
		// 		return setLoading(false);
		// 	});
		// } else {
		// 	addRoles(form).then(response => {
		// 		if (response.success) {
		// 			resetForm();
		// 			returnSuccess(response.data);
		// 		}
		// 		return setLoading(false);
		// 	});
		// }
	};
	const handleCheck = event => {
		let updatedList = [...rolesNames];
		if (event.target.checked) {
			updatedList = [...rolesNames, event.target.value];
		} else {
			updatedList.splice(rolesNames.indexOf(event.target.value), 1);
		}
		setRolesNames(updatedList);
	};
	useEffect(() => {
		makeOptionsRoles().then(d => setOptionsRoles(d));
	}, []);
	useEffect(() => {
		if (editData.id && editData.permissions) {
			let temp = [];
			editData.permissions.map(({ name }) => temp.push(name));
			setRolesNames(temp);
		}
	}, [editData]);
	useEffect(() => {
		setValue("role_names", rolesNames);
	}, [rolesNames]);

	return (
		<div className="w-full ">
			<div className="form-header">Formulir Role</div>
			<form className="form" onSubmit={handleSubmit(submitForm)}>
				<div className="flex mx-4 py-2 flex-col gap-2">
					<label className="text-center uppercase inline-block w-full mx-4 p-2 bg-slate-500/10">
						Nama-Nama Role
					</label>
					<div className="flex mb-2 p-3 max-w-full overflow-auto scrollbar-thin flex-col gap-3">
						{optionsRoles.map(item => (
							<label
								key={item}
								className="flex space-x-3 items-center font-normal">
								<input
									value={item}
									checked={rolesNames.includes(item)}
									type="checkbox"
									onChange={handleCheck}
								/>
								<span>{item}</span>
							</label>
						))}
					</div>
					<p>{errors?.role_names?.message}</p>
					{/* <Controller
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
					/> */}
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
						{editData?.id ? "Simpan Perubahan" : "Simpan"}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default FormPegawai;
