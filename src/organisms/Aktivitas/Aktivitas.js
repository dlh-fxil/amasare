import { useState, forwardRef, useEffect } from "react";
import Moment from "react-moment";
import { PhotographIcon } from "@heroicons/react/solid";
import DialogModal from "@atoms/Modal";
import FormFollowAktivitas from "./FormFollowAktivitas";
import {
	cancelEndAktivitas,
	deleteAktivitas,
	endAktivitas,
} from "@hooks/api/Kegiatan/aktivitas";
import DialogConfirmation from "@molecules/DialogConfirmation";
const Aktivitas = (
	{ aktivitas = {}, responseFromChild = () => {} } = {},
	ref,
) => {
	const [showDetail, setShowDetail] = useState(false);
	const [modalFollow, setModalFollow] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [modalEnd, setModalEnd] = useState(false);
	const [modalCancelEnd, setModalCancelEnd] = useState(false);
	const [unitKegiatan, setUnitKegiatan] = useState("");
	const chekJam = str => {
		const val = new Date(str);
		const now = new Date();
		return (now - val) / (1000 * 3600) < 12;
	};

	useEffect(() => {
		if (aktivitas?.unit) {
			setUnitKegiatan(aktivitas.unit);
		} else if (aktivitas?.programKegiatan?.unit) {
			setUnitKegiatan(aktivitas.programKegiatan?.unit);
		}
	}, [aktivitas]);

	const openModalFollow = () => {
		setModalFollow(true);
	};

	const openModalEnd = () => {
		setModalEnd(true);
	};

	const openModalCancelEnd = () => {
		setModalCancelEnd(true);
	};
	const openModalConfirmDelete = () => {
		setConfirmDelete(true);
	};
	const closeModal = (res = { success: true }) => {
		if (res?.success) {
			setModalFollow(false);
			setModalEnd(false);
			setConfirmDelete(false);
			setModalCancelEnd(false);
			return responseFromChild(res);
		}
		console.log(res);
	};
	const firstImage =
		aktivitas?.images ??
		"https://source.unsplash.com/random/300x400/?environment";

	const end = () => {
		endAktivitas(aktivitas.id).then(res => {
			return closeModal(res);
		});
	};
	const cancelEnd = () => {
		cancelEndAktivitas(aktivitas.id).then(res => {
			return closeModal(res);
		});
	};

	const unfollow = () => {
		deleteAktivitas(aktivitas.id).then(res => {
			return closeModal(res);
		});
	};
	return (
		<div ref={ref}>
			<div className="shadow card rounded-lg">
				<div className="">
					<div className={` w-full`}>
						<div className="flex items-center w-full justify-between px-4 py-2">
							<div className="flex space-x-2 w-full items-center ">
								<div className="flex space-x-2 w-fit  overflow-y-clip flex-nowrap overflow-x-auto"></div>
								<div className="relative min-w-fit min-h-fit">
									<img
										src={
											aktivitas?.createdBy?.profile_images?.thumb ??
											`https://ui-avatars.com/api/?size=40&name=${aktivitas?.createdBy?.name}&color=fff&background=0D8ABC`
										}
										alt="Profile picture"
										className="w-10 h-10 object-cover overflow-hidden rounded-full"
									/>
									<span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
								</div>
								<div className="flex items-center justify-between  w-full">
									<div className="h-fit min-w-fit pr-2">
										<div className="line-clamp-2 active:line-clamp-none hover:line-clamp-none text-sm md:text-base md:font-semibold font-medium">
											{aktivitas?.createdBy?.name}
										</div>
										<div className="line-clamp-2 active:line-clamp-none hover:line-clamp-none -mb-2.5 md:mb-0 text-sm -mt-0.5 md:mt-0 tracking-normal font-thin text-slate-700">
											{chekJam(aktivitas.mulai) ? (
												<Moment
													locale="id"
													className="text-green-700 flex-shrink-0 line-clamp-2 active:line-clamp-none hover:line-clamp-none w-fit text-xs md:text-sm "
													fromNow>
													{aktivitas.mulai}
												</Moment>
											) : (
												<Moment
													locale="id"
													className="line-clamp-2 active:line-clamp-none hover:line-clamp-none text-slate-800 text-xs md:text-sm"
													format="dddd D MMM YYYY h:m:s">
													{aktivitas.mulai}
												</Moment>
											)}
										</div>
									</div>
									<div className="hidden sm:flex overscroll-x-contain overflow-x-auto justify-end scrollbar-thin supports-scrollbars:pb-1 space-x-1 ">
										{aktivitas?.users?.map(
											user =>
												user.id !== aktivitas.created_by && (
													<div key={user.id} className="min-w-fit min-h-fit">
														<img
															src={
																user?.profile_images?.thumb ??
																`https://ui-avatars.com/api/?name=${user.name}&color=fff&background=0D8ABC&size=32`
															}
															alt="Profile picture"
															data-tip={user.nama}
															className="w-10 h-10 scrollbar:h-8 scrollbar:w-8 object-cover rounded-full"
														/>
													</div>
												),
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="text-justify flex items-center px-4 ">
							<div className="w-full">
								<p className=" font-bold whitespace-nowrap sm:text-lg text-left w-full pb-1">
									{aktivitas.judul}{" "}
									<span>
										<button
											onClick={() => setShowDetail(!showDetail)}
											className="py-0.5 text-slate-900 px-2 rounded-full bg-blue-200 text-sm">
											{showDetail ? "Sembunyikan" : "Detail"}
										</button>
									</span>
								</p>
								<p className="font-medium line-clamp-1 active:line-clamp-none hover:line-clamp-none sm:text-md text-left w-full pb-2">
									{unitKegiatan?.nama == "Sektretariat"
										? unitKegiatan?.nama
										: "Bidang " + unitKegiatan?.nama}
								</p>

								<p
									className={`line-clamp-2 text-sm sm:text-base active:line-clamp-none hover:line-clamp-none`}>
									{aktivitas.uraian}{" "}
								</p>
								{!showDetail && (
									<div className="flex mt-1 sm:hidden overscroll-x-contain overflow-x-auto scrollbar-thin supports-scrollbars:pb-1 space-x-1 ">
										{aktivitas?.users?.map(
											user =>
												user.id !== aktivitas.created_by && (
													<div key={user.id} className="min-w-fit min-h-fit">
														<img
															src={
																user?.profile_images?.thumb ??
																`https://ui-avatars.com/api/?name=${user.name}&color=fff&background=0D8ABC&size=32`
															}
															alt="Profile picture"
															data-tip={user.nama}
															className="w-10 h-10 scrollbar:h-8 scrollbar:w-8 object-cover rounded-full"
														/>
													</div>
												),
										)}
									</div>
								)}
								{showDetail && (
									<div className="w-full sm:flex">
										<div className="md:w-1/6 w-full flex justify-center items-center h-64 md:h-auto md:pr-2 md:pt-2 overflow-hidden rounded-lg">
											<img
												className="w-full object-contain rounded-lg h-full"
												src={firstImage}
												alt={aktivitas.judul}
											/>
										</div>
										<div>
											<label className="font-semibold">
												Pelaksana:
												<p className="font-normal">
													{unitKegiatan?.nama == "Sektretariat"
														? unitKegiatan?.nama
														: "Bidang " + unitKegiatan?.nama}
												</p>
											</label>
											<label className="font-semibold">
												Sub Kegiatan: {aktivitas.programKegiatan?.kode}
												<p className="font-normal">
													{aktivitas.programKegiatan?.nomenklatur}
												</p>
											</label>
											{aktivitas.programKegiatan?.kegiatan && (
												<label className="font-semibold">
													Kegiatan:
													<p className="font-normal">
														{aktivitas.programKegiatan?.kegiatan?.nomenklatur}
													</p>
												</label>
											)}
											{aktivitas.programKegiatan?.program && (
												<label className="font-semibold">
													Program:
													<p className="font-normal">
														{aktivitas.programKegiatan?.program?.nomenklatur}
													</p>
												</label>
											)}

											<label className="font-semibold">
												Nama Peserta Pelaksana Kegiatan:
												<ul>
													{aktivitas?.users?.map(user => (
														<li
															key={user.id}
															className="list-decimal font-normal list-inside">
															{/* <img
																		src={
																			user?.profile_images?.thumb ??
																			`https://ui-avatars.com/api/?name=${user.name}&color=fff&background=0D8ABC&size=32`
																		}
																		alt="Profile picture"
																		data-tip={user.nama}
																		className="w-10 h-10 scrollbar:h-8 scrollbar:w-8 object-cover rounded-full"
																	/> */}
															{user.nama}
														</li>
													))}
												</ul>
											</label>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="py-2 px-4">
					<div className="border border-gray-200 border-l-0 border-r-0 py-1">
						<div className="flex justify-around space-x-2">
							{aktivitas.can.end ? (
								<button
									onClick={openModalEnd}
									type="button"
									className="w-full flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500">
									<span className="text-sm font-semibold">Selesaikan</span>
								</button>
							) : (
								<button
									onClick={openModalCancelEnd}
									type="button"
									className="w-full flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500">
									<span className="text-sm font-semibold">Masih berjalan</span>
								</button>
							)}
							{aktivitas.can.follow ? (
								<button
									onClick={openModalFollow}
									type="button"
									className="w-full flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500">
									<span className="text-sm font-semibold">Ikuti</span>
								</button>
							) : (
								<button
									onClick={openModalConfirmDelete}
									type="button"
									className="w-full flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500">
									<span className="text-sm font-semibold">Hapus</span>
								</button>
							)}
							{!aktivitas.can.end && (
								<button
									type="button"
									onClick={() => alert("fitur dalam proses pengerjaan")}
									className="w-full flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500">
									<PhotographIcon className="-ml-4 w-5 h-5 hidden md:block text-lime-700" />
									<span className="text-sm font-semibold truncate">Foto</span>
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
			{ModalDialog()}
		</div>
	);

	function ModalDialog() {
		return (
			<>
				<DialogModal isOpen={modalFollow} closeModal={closeModal}>
					<FormFollowAktivitas
						aktivitas={aktivitas}
						close={closeModal}
						responseFromChild={responseFromChild}
					/>
				</DialogModal>

				<DialogConfirmation
					open={modalCancelEnd}
					action={cancelEnd}
					close={closeModal}>
					Apakah anda yakin kegiatan ini masih berjalan?
				</DialogConfirmation>

				<DialogConfirmation open={modalEnd} action={end} close={closeModal}>
					Apakah anda yakin ingin menyelesaikan kegiatan ini?
				</DialogConfirmation>

				<DialogConfirmation
					open={confirmDelete}
					action={unfollow}
					close={closeModal}>
					Apakah anda yakin ingin menghapus kegiatan ini?
				</DialogConfirmation>
			</>
		);
	}
};

export default forwardRef(Aktivitas);
