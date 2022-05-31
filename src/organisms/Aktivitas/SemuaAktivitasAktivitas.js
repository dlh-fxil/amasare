import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import Aktivitas from "./Aktivitas";
import dynamic from "next/dynamic";
// const Aktivitas = dynamic(() => import("./Aktivitas"), {
// 	ssr: false,
// });
import { deleteAktivitas } from "@hooks/api/Kegiatan/aktivitas";
import axios from "@/lib/axios";
const SemuaAktivitas = ({
	allDataAktivitas = {},
	pageLoad = false,
	returnSuccess = () => {},
	setDataFollow = () => {},
} = {}) => {
	const [loading, setLoading] = useState(true);
	const [dataAktivitas, setDataAktivitas] = useState([]);
	const [nextPage, setNextPage] = useState("");
	useEffect(() => {
		if (allDataAktivitas?.links?.next) {
			setNextPage(allDataAktivitas.links.next);
		}
		if (allDataAktivitas.data) {
			setDataAktivitas(allDataAktivitas.data);
		}
		return () => {
			setDataAktivitas([]);
		};
	}, [allDataAktivitas]);
	useEffect(() => {
		setLoading(pageLoad);
	}, [pageLoad]);
	const appenData = url => {
		setLoading(true);
		axios.get(url).then(res => {
			setDataAktivitas([...dataAktivitas, ...res.data.data]);
			setNextPage(res.data.links.next);
			setLoading(false);
		});
	};
	const unfollow = id => {
		if (id) {
			deleteAktivitas(id).then(res => {
				// console.log(res);
				returnSuccess(res);
			});
		}
	};
	return (
		<div className="space-y-2">
			{dataAktivitas.length > 0 ? (
				<Transition
					show={dataAktivitas.length > 0}
					enter="transition duration-100 ease-out"
					enterFrom="transform scale-95 opacity-0"
					enterTo="transform scale-100 opacity-100"
					leave="transition duration-75 ease-out"
					leaveFrom="transform scale-100 opacity-100"
					leaveTo="transform scale-95 opacity-0">
					<div className="flex flex-col gap-2">
						{dataAktivitas?.map(item => (
							<Aktivitas
								key={item.id}
								aktivitas={item}
								setDataFollow={setDataFollow}
								unfollow={unfollow}
							/>
							// <div key={item.id} className="">
							// 	{JSON.stringify(item)}
							// </div>
						))}
					</div>
				</Transition>
			) : (
				<Transition
					show={dataAktivitas.length == 0 && !loading}
					enter="transition duration-100 ease-out"
					enterFrom="transform scale-95 opacity-0"
					enterTo="transform scale-100 opacity-100"
					leave="transition duration-75 ease-out"
					leaveFrom="transform scale-100 opacity-100"
					leaveTo="transform scale-95 opacity-0">
					<div className="border relative transition-all border-blue-300 shadow rounded-md p-4 w-full mx-auto">
						<div className="animate-pulse flex space-x-4">
							<div className="rounded-full bg-slate-700 h-10 w-10"></div>
							<div className="flex-1 space-y-6 py-1">
								<div className="h-2 bg-slate-700 rounded"></div>
								<div className="space-y-3">
									<div className="grid grid-cols-3 gap-4">
										<div className="h-2 bg-slate-700 rounded col-span-2"></div>
										<div className="h-2 bg-slate-700 rounded col-span-1"></div>
									</div>
									<div className="h-2 bg-slate-700 rounded"></div>
								</div>
							</div>
						</div>
						<div className="absolute inset-0 flex items-center justify-center w-full bg-red-400 overflow-hidden bg-opacity-25">
							<span className="bg-red-500 font-bold text-lg px-5 py-1 rounded-full">
								Tidak Ada Aktivitas
							</span>
						</div>
					</div>
				</Transition>
			)}
			{loading && (
				<Transition
					show={loading}
					enter="transition duration-100 ease-out"
					enterFrom="transform scale-95 opacity-0"
					enterTo="transform scale-100 opacity-100"
					leave="transition duration-75 ease-out"
					leaveFrom="transform scale-100 opacity-100"
					leaveTo="transform scale-95 opacity-0">
					<div className="border  border-blue-300 shadow rounded-md p-4  w-full mx-auto">
						<div className="animate-pulse flex space-x-4 ">
							<div className="rounded-full bg-slate-700 h-10 w-10"></div>
							<div className="flex-1 space-y-6 py-1">
								<div className="h-2 bg-slate-700 rounded"></div>
								<div className="space-y-3">
									<div className="grid grid-cols-3 gap-4">
										<div className="h-2 bg-slate-700 rounded col-span-2"></div>
										<div className="h-2 bg-slate-700 rounded col-span-1"></div>
									</div>
									<div className="h-2 bg-slate-700 rounded"></div>
								</div>
							</div>
						</div>
					</div>
				</Transition>
			)}
			{!loading && nextPage && (
				<Transition
					show={!loading}
					enter="transition duration-100 ease-out"
					enterFrom="transform scale-95 opacity-0"
					enterTo="transform scale-100 opacity-100"
					leave="transition duration-75 ease-out"
					leaveFrom="transform scale-100 opacity-100"
					leaveTo="transform scale-95 opacity-0">
					<button
						type="button"
						onClick={() => appenData(nextPage)}
						className="w-full rounded-full mt-2 bg-sky-300 hover:text-sky-200 hover:bg-sky-800 px-2 py-2">
						Lihat yang lainnya
					</button>
				</Transition>
			)}
		</div>
	);
};
export default SemuaAktivitas;
