import { useEffect, useState } from "react";
import Moment from "react-moment";
const chekJam = str => {
	const val = new Date(str);
	const now = new Date();
	return (now - val) / (1000 * 3600) < 12;
};
const DetailAktivitas = ({ aktivitas = {}, close = () => {} } = {}) => {
	const [unitKegiatan, setUnitKegiatan] = useState("");
	useEffect(() => {
		if (aktivitas?.unit) {
			setUnitKegiatan(aktivitas.unit);
		} else if (aktivitas?.programKegiatan?.unit) {
			setUnitKegiatan(aktivitas.programKegiatan?.unit);
		}
	}, [aktivitas]);
	const firstImage =
		aktivitas?.images ??
		"https://source.unsplash.com/random/300x400/?environment";

	return (
		<div>
			<div className="w-full p-3">
				<div className="w-full sm:flex">
					<div className="flex flex-col space-y-2 text-justify">
						<label className="font-semibold">
							Judul kegiatan:
							<p className="font-normal">{aktivitas?.judul}</p>
						</label>
						<label className="font-semibold">
							Uraian kegiatan:
							<p className="font-normal">{aktivitas?.uraian}</p>
						</label>
						{unitKegiatan?.nama && (
							<label className="font-semibold">
								Unit Pelaksana:
								<p className="font-normal">
									{unitKegiatan?.nama == "Sektretariat"
										? unitKegiatan?.nama
										: "Bidang " + unitKegiatan?.nama}
								</p>
							</label>
						)}
						{aktivitas.programKegiatan && (
							<label className="font-semibold">
								Sub Kegiatan: {aktivitas.programKegiatan?.kode}
								<p className="font-normal">
									{aktivitas.programKegiatan?.nomenklatur}
								</p>
							</label>
						)}
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
										{user.nama}
									</li>
								))}
							</ul>
						</label>
						<label className="font-semibold">
							Waktu mulai:
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
						</label>
						<label className="font-semibold">
							Selesai:
							<div className="line-clamp-2 active:line-clamp-none hover:line-clamp-none -mb-2.5 md:mb-0 text-sm -mt-0.5 md:mt-0 tracking-normal font-thin text-slate-700">
								{aktivitas.selesai ? (
									<Moment
										locale="id"
										className="line-clamp-2 active:line-clamp-none hover:line-clamp-none text-slate-800 text-xs md:text-sm"
										format="dddd D MMM YYYY h:m:s">
										{aktivitas.selesai}
									</Moment>
								) : (
									<div className="py-1 px-3 bg-yellow-300 w-fit rounded-full">
										Belum Selsai
									</div>
								)}
							</div>
						</label>
					</div>
				</div>
			</div>
			<button
				onClick={close}
				className="w-full bg-rose-800 rounded-full text-slate-100 py-1 mt-2">
				Tutup
			</button>
		</div>
	);
};
export default DetailAktivitas;
