// import useUnitHook from "@/hooksApi/Kepegawaian/unit";
// import useJabatanHook from "@/hooksApi/Kepegawaian/jabatan";
// import useSubUnitHook from "@/hooksApi/Kepegawaian/subUnit";
// import usePangkatHook from "@/hooksApi/Kepegawaian/pangkat";
import { Button, Input, ComboBox, Radio } from "@atoms/FormControl";
import { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateUser, showUser } from "@hooks/api/ManajemenUser/users";
import { makeOptionsUnits } from "@hooks/api/Kepegawaian/unit";
import { makeOptionsSubUnit } from "@hooks/api/Kepegawaian/subUnit";
import { makeOptionsJabatan } from "@hooks/api/Kepegawaian/jabatan";
import { makeOptionsPangkat } from "@hooks/api/Kepegawaian/pangkat";
const FormProfilePegawai = ({
	dataUser = {},
	cancel = () => {},
	returnSuccess = () => {},
} = {}) => {
	const [loading, setLoading] = useState(true);
	const [invalids, setInvalids] = useState({});
	const { getOptionsUnit, optionsUnit } = makeOptionsUnits();
	const { getOptionsSubUnit, optionsSubUnit } = makeOptionsSubUnit();
	const { getOptionsJabatan, optionsJabatan } = makeOptionsJabatan();
	const { getOptionsPangkat, optionsPangkat } = makeOptionsPangkat();
	const makeOptions = async () => {
		await getOptionsPangkat();
		await getOptionsJabatan();
		await getOptionsUnit();
	};

	useEffect(() => {
		makeOptions();
	}, []);

	const schema = yup
		.object({
			jenis_pegawai: yup.string().required("Jenis pegawai harus diisi"),
			name: yup.string().required("Nama Pegawai Sesusi SK harus diisi"),
			nip: yup.string().when("jenis_pegawai", {
				is: val => val === "PNS" || val === "P3K",
				then: schema =>
					schema.required("NIP Harus diisi apabila pegawai adalah PNS / P3K"),
				otherwise: schema => schema.nullable(),
			}),
			pangkat_id: yup
				.number("Pangkat Harus diisi berdasarkan pilihan")
				.transform(value => (isNaN(value) ? undefined : value))
				.when("jenis_pegawai", {
					is: val => val === "PNS" || val === "P3K",
					then: schema =>
						schema.required(
							"Pangkat Harus diisi apabila pegawai adalah PNS / P3K",
						),
					otherwise: schema => schema.nullable(),
				}),
			sub_unit_id: yup
				.number()
				.nullable(true)
				.transform(value => (isNaN(value) ? undefined : value)),

			no_wa: yup.string().nullable(true),
			no_hp: yup.string().nullable(true),
			eselon: yup.string().nullable(true),
			jabatan_id: yup
				.number()
				.transform(value => (isNaN(value) ? undefined : value))
				.required("Jabatan Harus diisi"),
			unit_id: yup
				.number()
				.nullable()
				.transform(value => (isNaN(value) ? undefined : value)),
		})
		.required();
	const {
		register,
		control,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			jenis_pegawai: dataUser?.jenis_user || "PNS",
			name: dataUser?.name || "",
			nip: dataUser?.nip || "",
			no_wa: dataUser?.no_wa || "",
			no_hp: dataUser?.no_hp || "",
			eselon: dataUser?.eselon || "",
			pangkat_id: dataUser?.pangkat_id || "",
			jabatan_id: dataUser?.jabatan_id || "",
			unit_id: dataUser?.unit_id || "",
			sub_unit_id: dataUser?.sub_unit_id || "",
		},
		resolver: yupResolver(schema),
		reValidateMode: "onChange",
	});
	const unitId = useWatch({
		control,
		name: "unit_id",
	});

	const jenisPegawai = useWatch({
		control,
		name: "jenis_pegawai",
	});

	useEffect(() => {
		setLoading(true);
		if (unitId) {
			getOptionsSubUnit(unitId).finally(() => setLoading(false));
		} else {
			setValue("sub_unit_id", "", { shouldValidate: true });
			setLoading(false);
		}
	}, [unitId]);

	useEffect(() => {
		if (jenisPegawai === "PPNPNS") {
			setValue("pangkat_id", "", { shouldValidate: true });
			setValue("eselon", "", { shouldValidate: true });
			setValue("nip", "", { shouldValidate: true });
		}
	}, [jenisPegawai]);

	const checkErrors = key => {
		if (key in invalids) {
			const errors = Object.values(invalids[key]).flat();
			return errors.join(", ");
		}
		return false;
	};

	const submitForm = async (formData, event) => {
		event.preventDefault();
		setLoading(true);
		if (dataUser && dataUser?.id) {
			updateUser(formData, dataUser.id).then(response => {
				if (response.success) {
					// setData(response.data);
					returnSuccess(response.data);
					reset(undefined, {
						keepValues: true,
						keepDirty: true,
					});
				} else if (response.errors) {
					setInvalids(response.errors);
				} else {
					console.warn(response);
				}
				return setLoading(false);
			});
		} else {
			setLoading(false);
		}
	};

	return (
		<form className="form" onSubmit={handleSubmit(submitForm)}>
			<div className="flex p-4 flex-col gap-1">
				<div className="flex justify-around p-2 mx-2 rounded-full bg-white bg-opacity-30 items-center flex-1">
					<Radio
						{...register("jenis_pegawai")}
						id="pns"
						text="PNS"
						value="PNS"
					/>
					<Radio
						{...register("jenis_pegawai")}
						id="p3k"
						text="P3K"
						value="P3K"
						color="green"
					/>
					<Radio
						{...register("jenis_pegawai")}
						id="ppnpns"
						text="PPNPNS"
						value="PPNPNS"
						color="sky"
					/>
				</div>

				<Controller
					render={({ field }) => (
						<Input
							{...field}
							placeholder="Nama Sesua SK"
							error={errors?.name?.message || checkErrors("nama")}
							autoFocus
						/>
					)}
					name="name"
					control={control}
				/>
				{jenisPegawai !== "PPNPNS" && (
					<Controller
						render={({ field }) => (
							<Input
								{...field}
								placeholder="NIP"
								error={errors?.nip?.message || checkErrors("nip")}
							/>
						)}
						name="nip"
						control={control}
					/>
				)}
				<Controller
					render={({ field }) => (
						<Input
							{...field}
							placeholder="Nomor Whatsapp"
							error={errors?.no_wa?.message || checkErrors("no_wa")}
						/>
					)}
					name="no_wa"
					control={control}
				/>
				<Controller
					render={({ field }) => (
						<Input
							{...field}
							placeholder="Nomor HP"
							error={errors?.no_hp?.message || checkErrors("no_wa")}
						/>
					)}
					name="no_hp"
					control={control}
				/>
				<Controller
					render={({ field }) => (
						<Input
							{...field}
							placeholder="Eselon"
							error={errors?.eselon?.message || checkErrors("no_wa")}
						/>
					)}
					name="eselon"
					control={control}
				/>
				{optionsPangkat && jenisPegawai !== "PPNPNS" && (
					<Controller
						render={({ field: { onChange, value } }) => (
							<ComboBox
								placeholder="Pangakat"
								options={optionsPangkat}
								value={value}
								error={errors?.pangkat_id?.message || checkErrors("pangkat_id")}
								onChange={e => onChange(e)}
							/>
						)}
						name="pangkat_id"
						control={control}
					/>
				)}
				{optionsJabatan && (
					<Controller
						render={({ field: { onChange, value } }) => (
							<ComboBox
								value={value}
								options={optionsJabatan}
								placeholder="Jabatan"
								error={errors?.jabatan_id?.message || checkErrors("jabatan_id")}
								onChange={e => onChange(e)}
							/>
						)}
						name="jabatan_id"
						control={control}
					/>
				)}
				{optionsUnit && (
					<Controller
						render={({ field: { onChange, value } }) => (
							<ComboBox
								value={value}
								options={optionsUnit}
								placeholder="Pilih Bidang/Sekreariat"
								error={errors?.unit_id?.message || checkErrors("unit_id")}
								onChange={e => onChange(e)}
							/>
						)}
						name="unit_id"
						control={control}
					/>
				)}

				{optionsSubUnit && unitId && (
					<Controller
						render={({ field: { onChange, value } }) => (
							<ComboBox
								options={optionsSubUnit}
								value={value}
								placeholder="Sub Bagian/Seksi"
								error={
									errors?.sub_unit_id?.message || checkErrors("sub_unit_id")
								}
								onChange={e => onChange(e)}
							/>
						)}
						name="sub_unit_id"
						control={control}
					/>
				)}
			</div>

			<div className="flex items-center gap-4 justify-end p-4 bg-slate-500 bg-opacity-20">
				<Button type="button" loading={loading} onClick={cancel} color="red">
					Tutup
				</Button>
				<Button disable={loading} loading={loading} type="submit">
					Simpan
				</Button>
				{/* <div>{JSON.stringify(data)}</div> */}
			</div>
		</form>
	);
};

export default FormProfilePegawai;
