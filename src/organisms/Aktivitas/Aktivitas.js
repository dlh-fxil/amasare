import { useState, useEffect } from "react";
import Moment from "react-moment";
import { PhotographIcon } from "@heroicons/react/solid";
import { useAuth } from "@hooks/api/auth";
const Aktivitas = ({
	aktivitas = {},
	dataEdit = () => {},
	setDataFollow = () => {},
	unfollow = () => {},
} = {}) => {
	const [showDetail, setShowDetail] = useState(false);
	const { user } = useAuth();
	const chekJam = str => {
		const val = new Date(str);
		const now = new Date();
		return (now - val) / (1000 * 3600) < 12;
	};

	const firstImage = aktivitas?.images ?? "https://source.unsplash.com/random/300x400/?environment";

	if (aktivitas) {
		return (
			<div className="shadow card rounded-lg">
				<div className="">
					<div className={` w-full`}>
						<div className="flex items-center w-full justify-between px-4 py-2">
							<div className="flex space-x-2 w-full items-center">
								<div className="flex space-x-2">
									{aktivitas?.users?.map(
										user =>
											user.id !== aktivitas.created_by && (
												<div key={user.id} className="flex gap-2">
													<img
														src={
															user?.profile_images?.thumb ??
															`https://ui-avatars.com/api/?name=${user.name}&color=fff&background=0D8ABC&size=32`
														}
														alt="Profile picture"
														data-tip={user.nama}
														className="w-10 h-auto object-cover rounded-full"
													/>
												</div>
											),
									)}
								</div>
								<div className="relative">
									<img
										src={
											aktivitas?.createdBy?.profile_images?.thumb ??
											`https://ui-avatars.com/api/?size=40&name=${aktivitas?.createdBy?.name}&color=fff&background=0D8ABC`
										}
										alt="Profile picture"
										className="w-10 h-auto object-cover rounded-full"
									/>
									<span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
								</div>
								<div className="flex items-center justify-between w-full">
									<div className="h-fit grow">
										<div className="line-clamp-1 hover:line-clamp-none touch:line-clamp-none text-sm md:text-base md:font-semibold font-medium">
											{aktivitas?.createdBy?.name}
										</div>
										<div className="line-clamp-1 hover:line-clamp-none touch:line-clamp-none -mb-2.5 md:mb-0 text-sm -mt-0.5 md:mt-0 tracking-normal font-thin text-slate-700">
											{aktivitas?.createdBy?.jabatan?.nama}
										</div>
									</div>
									{chekJam(aktivitas.mulai) ? (
										<Moment
											locale="id"
											className="text-green-700 flex-shrink-0 line-clamp-1 hover:line-clamp-none touch:line-clamp-none w-fit text-xs md:text-sm "
											fromNow>
											{aktivitas.mulai}
										</Moment>
									) : (
										<Moment
											locale="id"
											className="line-clamp-1 hover:line-clamp-none touch:line-clamp-none text-slate-800 text-xs md:text-sm"
											format="dddd D MMM YYYY h:m:s">
											{aktivitas.mulai}
										</Moment>
									)}
								</div>
							</div>
							<div className="w-8 h-8 grid place-items-center text-xl text-slate-500 hover:bg-slate-200 rounded-full cursor-pointer">
								<i className="bx bx-dots-horizontal-rounded"></i>
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
								<p className=" font-medium whitespace-nowrap sm:text-md text-left w-full pb-2">
									{aktivitas.programKegiatan?.unit?.nama == "Sektretariat"
										? aktivitas.programKegiatan?.unit?.nama
										: "Bidang " + aktivitas.programKegiatan?.unit?.nama}
								</p>

								<p
									className={`${
										showDetail ? "line-clamp-none" : "line-clamp-3"
									} text-sm sm:text-base hover:line-clamp-none`}>
									{aktivitas.uraian}{" "}
								</p>
								{showDetail && (
									<div className="w-full sm:flex">
										<div className="md:w-1/6 w-full flex justify-center items-center h-64 md:h-auto md:pr-2 md:pt-2 overflow-hidden rounded-lg">
											<img
												className="w-full object-contain rounded-lg h-full"
												src={firstImage}
												alt={aktivitas.judul}
											/>
										</div>
										<table className="mt-3">
											<tbody>
												<tr>
													<td className="font-medium whitespace-nowrap">Bidang</td>
													<td className="w-3 px-1">:</td>
													<td colSpan={2} className="font-medium">
														{aktivitas.programKegiatan?.unit?.nama}
													</td>
												</tr>
												<tr>
													<td className="font-medium whitespace-nowrap">Program</td>
													<td className="w-3 px-1">:</td>
													<td className="px-1 font-bold whitespace-nowrap">
														{aktivitas.programKegiatan?.program?.kode}
													</td>
													<td>{aktivitas.programKegiatan?.program?.nomenklatur}</td>
												</tr>
												<tr>
													<td className="font-medium whitespace-nowrap">Kegiatan</td>
													<td className="w-3 px-1">:</td>
													<td className="px-1 font-bold whitespace-nowrap">
														{aktivitas.programKegiatan?.kegiatan?.kode}
													</td>
													<td>{aktivitas.programKegiatan?.kegiatan?.nomenklatur}</td>
												</tr>
												<tr>
													<td className="font-medium whitespace-nowrap">Sub Kegiatan</td>
													<td className="w-3 px-1">:</td>
													<td className="px-1 font-bold whitespace-nowrap">
														{aktivitas.programKegiatan?.kode}
													</td>
													<td>{aktivitas.programKegiatan?.nomenklatur}</td>
												</tr>
											</tbody>
										</table>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="py-2 px-4">
					<div className="border border-gray-200 border-l-0 border-r-0 py-1">
						<div className="flex justify-around space-x-2">
							<div className="w-full flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500">
								<i className="bx bx-comment"></i>
								<span className="text-sm font-semibold">Selesaikan</span>
							</div>
							{aktivitas.can.follow && setDataFollow && (
								<button
									onClick={() => setDataFollow(aktivitas)}
									type="button"
									className="w-full flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500">
									<span className="text-sm font-semibold">Ikuti</span>
								</button>
							)}
							{aktivitas.can.unfollow && unfollow && (
								<button
									onClick={() => unfollow(aktivitas.id)}
									type="button"
									className="w-full flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500">
									<span className="text-sm font-semibold">Hapus/Berhenti Mengikuti</span>
								</button>
							)}
							<div className="w-full flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500">
								<PhotographIcon className="-ml-4 w-5 h-5 hidden md:block text-lime-700" />
								<span className="text-sm font-semibold truncate">Foto</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	return <></>;
};

export default Aktivitas;
