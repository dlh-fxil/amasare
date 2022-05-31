import { Button, Input, Textarea, ComboBox } from "@atoms/FormControl";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Icons from "@atoms/Icons";
import * as yup from "yup";
import { Switch } from "@headlessui/react";
import { followingAktivitas } from "@hooks/api/Kegiatan/aktivitas";
import Moment from "react-moment";
import { makeOptionsUraianTugas } from "@hooks/api/Kepegawaian/uraianTugas";
const FormFollowAktivitas = ({
	dataFollow = {},
	close = () => {},
	pegawai = {},
	returnSuccess = () => {},
} = {}) => {
	const { optionsUraianTugas, getOptionsUraianTugas } = makeOptionsUraianTugas();

	const [hasUraianTugas, sethasUraianTugas] = useState(true);
	const [jabatanId, setJabatanId] = useState(pegawai?.jabatan_id);
	const schema = yup
		.object({
			uraian_tugas_id: yup
				.number()
				.transform(value => (isNaN(value) ? undefined : value))
				.nullable(),
		})
		.required();
	const chekJam = str => {
		const val = new Date(str);
		const now = new Date();
		return (now - val) / (1000 * 3600) < 12;
	};
	const {
		control,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			uraian_tugas_id: "",
		},
		resolver: yupResolver(schema),
		reValidateMode: "onChange",
	});

	useEffect(async () => {
		if (jabatanId && hasUraianTugas && optionsUraianTugas.length == 0) {
			await getOptionsUraianTugas(jabatanId);
		}
	}, [jabatanId, hasUraianTugas]);

	useEffect(() => {
		console.log(dataFollow);
		if (dataFollow && dataFollow?.uraian_tugas_id == null) {
			sethasUraianTugas(false);
		}
	}, [dataFollow]);

	const resetForm = () => {
		reset({}, { keepDefaultValues: true });
		if (close) {
			close();
		}
	};
	const submitForm = (form, event) => {
		event.preventDefault();
		if (dataFollow && dataFollow?.id) {
			followingAktivitas(form, dataFollow.id).then(res => {
				returnSuccess(res);
				return resetForm();
			});
		}
	};
	return (
		<>
			<div className="form-header ">Formulir Tambah Kegiatan</div>
			<form className="form" onSubmit={handleSubmit(submitForm)}>
				<div className="flex px-4 flex-col gap-2">
					<p>{dataFollow?.judul}</p>
					<p>
						{chekJam(dataFollow.mulai) ? (
							<Moment
								locale="id"
								className="text-green-700 line-clamp-1 hover:line-clamp-none text-xs md:text-sm "
								fromNow>
								{dataFollow.mulai}
							</Moment>
						) : (
							<Moment
								locale="id"
								className="line-clamp-1 hover:line-clamp-none text-slate-800 text-xs md:text-sm"
								format="dddd D MMM YYYY h:m:s">
								{dataFollow.mulai}
							</Moment>
						)}
					</p>

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
						Simpan dan Ikuti
						<Icons icon="UploadIcon" className="-mr-2 w-4 h-4 text-sky-200" />
					</Button>
				</div>
			</form>
		</>
	);
};
export default FormFollowAktivitas;
