import { Button, Input, Textarea, ComboBox } from "@atoms/FormControl";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Icons from "@atoms/Icons";
import * as yup from "yup";
import { Switch } from "@headlessui/react";
import { followingAktivitas } from "@hooks/api/Kegiatan/aktivitas";
import Moment from "react-moment";
import { useAuth } from "@hooks/api/auth";
const FormFollowAktivitas = ({
	aktivitas = {},
	close = () => {},
	responseFromChild = () => {},
} = {}) => {
	const { user } = useAuth({ middleware: "auth" });

	const [optionsUraianTugas, setOptionsUraianTugas] = useState([]);
	const [withUraianTugas, setWithUraianTugas] = useState(true);

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

	useEffect(() => {
		if (aktivitas && aktivitas?.uraian_tugas_id == null) {
			setWithUraianTugas(false);
		}
	}, [aktivitas]);

	const resetForm = () => {
		reset({}, { keepDefaultValues: true });
		close();
	};
	const submitForm = (form, event) => {
		event.preventDefault();
		if (aktivitas && aktivitas?.id) {
			followingAktivitas(form, aktivitas.id).then(res => {
				responseFromChild(res);
				return resetForm();
			});
		}
	};
	return (
		<>
			<div className="form-header ">Formulir Peserta Kegiatan</div>
			<form className="form" onSubmit={handleSubmit(submitForm)}>
				<div className="flex p-4 flex-col gap-2">
					<div>
						<p className="font-semibold text-center uppercase">
							{aktivitas?.judul}
						</p>
						<p>{aktivitas?.uraian}</p>
						<div className="text-right">
							{chekJam(aktivitas.mulai) ? (
								<Moment
									locale="id"
									className="text-green-700 line-clamp-1 hover:line-clamp-none text-xs md:text-sm "
									fromNow>
									{aktivitas.mulai}
								</Moment>
							) : (
								<Moment
									locale="id"
									className="line-clamp-1 hover:line-clamp-none text-slate-800 text-xs md:text-sm"
									format="dddd D MMM YYYY h:m:s">
									{aktivitas.mulai}
								</Moment>
							)}
						</div>
					</div>

					{user?.jabatan?.uraianTugas && (
						<label className="flex flex-wrap justify-between items-start">
							Aktivitas sesuai uraian tugas?
							<Switch
								checked={withUraianTugas}
								onChange={() => {
									setWithUraianTugas(!withUraianTugas);
								}}
								className={`${
									withUraianTugas ? "bg-blue-300" : "bg-red-300"
								} relative inline-flex h-6 w-11 items-center rounded-full`}>
								<span className="sr-only">Ya</span>

								{withUraianTugas ? (
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

					{withUraianTugas && optionsUraianTugas.length > 0 && (
						<Controller
							render={({ field: { onChange, value } }) => (
								<ComboBox
									placeholder="Pilih uraian tugas yang sesuai"
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
