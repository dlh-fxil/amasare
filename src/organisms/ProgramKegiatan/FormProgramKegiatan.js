import { Button, ComboBox, Input, Radio, Textarea } from "@atoms/FormControl";
import { useForm, Controller, useWatch } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { XIcon, UploadIcon } from "@heroicons/react/solid";
import { makeOptionsUnits } from "@hooks/api/Kepegawaian/unit";
import { schemaProgramKegiatan, formDefault } from "./IntialProgramKegiatan";
import { YearPiccker } from "@atoms/FormControl/CustomDatePicker";
import {
	makeOptionsPorgramKegiatan,
	updateProgramKegiatan,
	addProgramKegiatan,
} from "@hooks/api/Kegiatan/programKegiatan";
function FormProgramKegiatan({ editData = {}, close = () => {}, returnSuccess = () => {} } = {}) {
	const { getOptionsUnit, optionsUnit } = makeOptionsUnits();
	const {
		getOptionsProgram,
		optionsProgram,
		optionsKegiatanProgram,
		getOptionsKegiatanProgram,
	} = makeOptionsPorgramKegiatan();

	const {
		setValue,
		reset,
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: formDefault(editData),
		resolver: yupResolver(schemaProgramKegiatan),
		reValidateMode: "onChange",
	});

	const resetForm = () => {
		close();
	};
	const type = useWatch({
		control,
		name: "type",
	});
	const idProgram = useWatch({
		control,
		name: "id_program",
	});
	const idKegiatan = useWatch({
		control,
		name: "id_kegiatan",
	});

	useEffect(() => {
		if (!optionsUnit.length > 0) {
			getOptionsUnit();
		}
		return () => {};
	}, []);

	useEffect(() => {
		if (type == "program") {
			setValue("id_program", null);
			setValue("id_kegiatan", null);
			setValue("kode_kegiatan", "");
			setValue("kode_sub_kegiatan", "");
		} else if (!optionsProgram.length > 0) {
			getOptionsProgram();
		} else if (idProgram && type == "kegiatan") {
			console.log(optionsProgram);
			const data = optionsProgram;
			const dataSel = data.filter(p => p.value == idProgram);
			setValue("kode_urusan", dataSel[0]?.object.kode_urusan);
			setValue("kode_bidang_urusan", dataSel[0]?.object.kode_bidang_urusan);
			setValue("kode_program", dataSel[0]?.object.kode_program);
			setValue("id_kegiatan", null);
			setValue("kode_sub_kegiatan", "");
			setValue("unit_id", dataSel[0]?.object.unit_id);
		} else if (idProgram && !optionsKegiatanProgram.length > 0) {
			getOptionsKegiatanProgram(idProgram);
		} else if (idKegiatan) {
			const data = optionsKegiatanProgram;
			const dataSel = data.filter(p => p.value == idKegiatan);
			setValue("kode_urusan", dataSel[0]?.object.kode_urusan);
			setValue("kode_bidang_urusan", dataSel[0]?.object.kode_bidang_urusan);
			setValue("kode_program", dataSel[0]?.object.kode_program);
			setValue("kode_kegiatan", dataSel[0]?.object.kode_kegiatan);
			setValue("unit_id", dataSel[0]?.object.unit_id);
		}
		return () => {};
	}, [type, idProgram, optionsProgram, idKegiatan, optionsKegiatanProgram]);
	const submitForm = (form, event) => {
		event.preventDefault();
		console.log(form);
		if (editData && editData?.id) {
			updateProgramKegiatan(form, editData.id).then(res => {
				if (res.success) {
					returnSuccess(res.data);
					return resetForm();
				}
			});
		} else {
			addProgramKegiatan(form).then(res => {
				if (res.success) {
					returnSuccess(res.data);
					return resetForm();
				}
			});
		}
	};
	return (
		<div className="max-h-screen py-4 overflow-y-hidden flex flex-col">
			<div className="h-fit flex-shrink-0 text-center w-full max-w-screen-xl  text-lg py-3 font-bold uppercase form-header">
				Form Program kegiatan
			</div>
			<form
				className="form flex-grow flex relative flex-col max-h-full overflow-y-hidden"
				onSubmit={handleSubmit(submitForm)}>
				<div className="h-full flex-grow  overflow-auto">
					<div className="flex mx-4 py-4 flex-wrap items-center">
						<div className="flex-1 mx-2 sm:mx-4 ">
							<div className=" h-fit p-2 rounded-full overflow-hidden bg-green-500 bg-opacity-30 flex-1">
								{!type && (
									<div className="bg-lime-100  text-center font-bold -mt-2 -mx-2 pt-1.5 mb-1 pb-0.5">
										Pilih Jenis Kegiatan
									</div>
								)}
								<div className="flex h-fit font-bold justify-around">
									<Radio {...register("type")} id="1" text="Program" value="program" />
									<Radio
										{...register("type")}
										id="2"
										text="Kegiatan"
										value="kegiatan"
										color="green"
									/>
									<Radio
										{...register("type")}
										id="3"
										text="Sub Kegiatan"
										value="subKegiatan"
										color="sky"
									/>
								</div>
							</div>
						</div>
					</div>

					{type && (
						<>
							<div className="flex p-4 -mt-6 sm:p-6 flex-col gap-2">
								{optionsProgram.length > 0 && type !== "program" && (
									<Controller
										render={({ field: { onChange, value } }) => (
											<ComboBox
												value={idProgram}
												options={optionsProgram}
												placeholder="Pilih Program"
												onChange={e => onChange(e)}
												autoComplete="selectedProgram"
											/>
										)}
										name="id_program"
										control={control}
									/>
								)}
								{optionsKegiatanProgram.length > 0 && type !== "kegiatan" && idProgram && (
									<Controller
										render={({ field: { onChange, value } }) => (
											<ComboBox
												value={idKegiatan}
												options={optionsKegiatanProgram}
												placeholder="Pilih Kegiatan"
												autoComplete="selectedKegiatanProgram"
												onChange={e => onChange(e)}
											/>
										)}
										name="id_kegiatan"
										control={control}
									/>
								)}

								{(type == "program" || (type == "kegiatan" && idProgram) || idKegiatan) && (
									<>
										<div className="flex items-center gap-8 ">
											<div className="space-y-2">
												<label className="font-bold items-center w-full flex">
													Kode :
													<div className="ml-4 text-red-500 text-sm font-thin">
														{errors?.kode_urusan?.message ||
															errors?.kode_bidang_urusan?.message ||
															errors?.kode_program?.message ||
															errors?.kode_kegiatan?.message ||
															errors?.kode_sub_kegiatan?.message}
													</div>
												</label>
												<div className="flex font-bold">
													{/* kode_urusan: "", */}
													<Controller
														render={({ field }) => (
															<input
																data-tip="Kode Urusan"
																{...field}
																readOnly={type !== "program"}
																autoComplete="kode_urusan"
																className="w-10 read-only:border-0 read-only:bg-transparent read-only:px-0 px-1 read-only:w-8 border border-green-500 font-bold text-blue-500"
															/>
														)}
														name="kode_urusan"
														control={control}
													/>
													.{/* kode_bidang_urusan */}
													<Controller
														render={({ field }) => (
															<input
																{...field}
																data-tip="Kode Bidang Urusan"
																readOnly={type !== "program"}
																autoComplete="kode_bidang_urusan"
																className="w-10 read-only:border-0 read-only:bg-transparent read-only:px-0 px-1 read-only:w-8 border border-green-500 font-bold text-blue-500"
															/>
														)}
														name="kode_bidang_urusan"
														control={control}
													/>
													.{/* kode_program: "",  */}
													<Controller
														render={({ field }) => (
															<input
																{...field}
																data-tip="Kode Program"
																readOnly={type !== "program"}
																autoComplete="kode_program"
																className="w-10 read-only:border-0 read-only:bg-transparent read-only:px-0 px-1 read-only:w-8 border border-green-500 font-bold text-blue-500"
															/>
														)}
														name="kode_program"
														control={control}
													/>
													{/* kode_kegiatan: "",  */}
													{type !== "program" && (
														<>
															.
															<Controller
																render={({ field }) => (
																	<input
																		{...field}
																		data-tip="Kode Kegiatan"
																		readOnly={type !== "kegiatan"}
																		className="w-10 read-only:border-0 read-only:bg-transparent read-only:px-0 px-1 read-only:w-8 border border-green-500 font-bold text-blue-500"
																	/>
																)}
																name="kode_kegiatan"
																control={control}
															/>
														</>
													)}
													{/* kode_sub_kegiatan: "", */}
													{type == "subKegiatan" && (
														<>
															.
															<Controller
																render={({ field }) => (
																	<input
																		{...field}
																		readOnly={type !== "subKegiatan"}
																		className="w-10 read-only:border-0 read-only:bg-transparent read-only:px-0 px-1 read-only:w-8 border border-green-500 font-bold text-blue-500"
																		data-tip="Kode Sub Kegiatan"
																	/>
																)}
																name="kode_sub_kegiatan"
																control={control}
															/>
														</>
													)}
												</div>
											</div>
											<div className="max-w-fit relative">
												{/* tahun_anggaran: "",  */}
												<Controller
													render={({ field: { onChange, value } }) => (
														<YearPiccker
															value={value}
															onChange={e => onChange(e)}
															placeholder="Tahun Anggaran"
															error={errors?.tahun_anggaran?.message}
															// customInput={<ExampleCustomInput />}
														/>
													)}
													name="tahun_anggaran"
													control={control}
												/>
											</div>
										</div>

										{/* nomenklatur: "",  */}
										<Controller
											render={({ field }) => (
												<Textarea
													{...field}
													placeholder={`Nomenklatur ${
														type == "subKegiatan" ? "sub kegiatan" : type
													}`}
													error={errors?.nomenklatur?.message}
													autoFocus
												/>
											)}
											name="nomenklatur"
											control={control}
										/>
										{/* unit_id: "", */}
										{optionsUnit.length > 0 && (
											<Controller
												render={({ field: { onChange, value } }) => (
													<ComboBox
														value={value}
														options={optionsUnit}
														disabled={type != "program"}
														placeholder="Unit Pelaksanan (Pilih Bidang / Sekreariat)"
														error={errors?.unit_id?.message}
														onChange={e => onChange(e)}
													/>
												)}
												name="unit_id"
												control={control}
											/>
										)}
										{/* kinerja: "",  */}
										<Controller
											render={({ field }) => (
												<Textarea
													{...field}
													placeholder="Kinerja"
													error={errors?.kinerja?.message}
												/>
											)}
											name="kinerja"
											control={control}
										/>
										{/* indikator: "", */}
										<Controller
											render={({ field }) => (
												<Textarea
													{...field}
													placeholder="Indikator"
													error={errors?.indikator?.message}
												/>
											)}
											name="indikator"
											control={control}
										/>

										{/* biaya: "",  */}
										<Controller
											render={({ field }) => (
												<Input
													{...field}
													type="number"
													placeholder="Biaya (Jml Anggaran)"
													error={errors?.biaya?.message}
												/>
											)}
											name="biaya"
											control={control}
										/>
										{/* target_waktu_pelaksanaan: "",  */}
										<Controller
											render={({ field }) => (
												<Input
													{...field}
													type="number"
													placeholder="Target waktu pelaksanaan (Bulan)"
													error={errors?.target_waktu_pelaksanaan?.message}
												/>
											)}
											name="target_waktu_pelaksanaan"
											control={control}
										/>
										{/* target_jumlah_hasil: "", */}
										<Controller
											render={({ field }) => (
												<Input
													{...field}
													type="number"
													placeholder="Target jumlah hasil"
													error={errors?.target_jumlah_hasil?.message}
												/>
											)}
											name="target_jumlah_hasil"
											control={control}
										/>
										{/* satuan: "",  */}
										<Controller
											render={({ field }) => (
												<Input {...field} placeholder="Satuan" error={errors?.satuan?.message} />
											)}
											name="satuan"
											control={control}
										/>

										{/* progress: "",  */}
										<Controller
											render={({ field }) => (
												<Input
													{...field}
													type="number"
													placeholder="Progress kinerja"
													error={errors?.progress?.message}
												/>
											)}
											name="progress"
											control={control}
										/>

										{/* selesai: "", */}
										<Controller
											render={({ field }) => (
												<Input
													{...field}
													placeholder="Sudah selesai?"
													error={errors?.selesai?.message}
												/>
											)}
											name="selesai"
											control={control}
										/>
									</>
								)}
							</div>
						</>
					)}
				</div>
				<div className="flex h-fit flex-shrink-0 items-center flex-wrap py-4  sm:px-8 space-x-4 form-footer justify-end px-6  max-w-full">
					<Button onClick={resetForm} type="button" color="red">
						<XIcon className="-ml-2 w-4 h-4" />
						Tutup
					</Button>
					{(type == "program" || (idProgram && type == "kegiatan") || idKegiatan) && (
						<Button type="submit" color="blue">
							<UploadIcon className="-ml-2 w-4 h-4 text-sky-200" />
							{editData.id ? "Simpan Perubahan" : "Simpan"}
						</Button>
					)}
				</div>
			</form>
		</div>
	);
}

export default FormProgramKegiatan;
