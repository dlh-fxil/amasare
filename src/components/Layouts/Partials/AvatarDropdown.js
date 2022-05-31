import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { useAuth } from "@/hooks/api/auth";
const AvatarDropdown = () => {
	const { user, logout } = useAuth({ middleware: "auth" });
	const [urlImage, setUrlImage] = useState("images/blank-profile.png");
	useEffect(() => {
		if (user?.profile_images?.thumb) {
			setUrlImage(user?.profile_images?.thumb);
		}
		return () => {
			setUrlImage("images/blank-profile.png");
		};
	}, [user]);
	return (
		<Popover as="div" className="relative z-40">
			{({ open }) => (
				<>
					<Popover.Button
						className={`
                ${open ? "" : "opacity-90"}
                group inline-flex bg-transparent  focus:outline-none`}>
						<div>
							<img
								src={urlImage}
								className="shadow-md shadow-sky-500 max-h-full object-contain p-1 border-sky-200 rounded-full"
								alt="foto-profile"
							/>
						</div>
					</Popover.Button>
					<Transition
						show={open}
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0">
						<Popover.Panel className="absolute right-0 mt-1 origin-top-right max-w-sm w-fit mx-auto bg-slate-200 rounded-xl shadow-md overflow-hidden">
							<ProfileCard user={user} logout={logout} urlImage={urlImage} />
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
};
const ProfileCard = ({ user, logout, urlImage }) => {
	return (
		<div className="w-fit">
			<div className="flex mt-3 justify-center">
				<div className="relative w-20">
					<img src={urlImage} alt="foto-profile" className="rounded-full" />
					<span className="absolute border-white border-4 h-5 w-5 bottom-6 -right-1 bg-green-700 rounded-full"></span>
				</div>
			</div>
			<div className="flex flex-col text-center px-2 mt-3">
				<span className="font-medium underline whitespace-normal text-black">
					{user.nama}
				</span>
				<span className="text-sm text-slate-700">{user?.pangkat?.nama}</span>
				<span className="text-sm text-slate-500">NIP.{user.nip}</span>
				<span className="text-md text-slate-800">{user?.jabatan?.nama}</span>
			</div>

			<div className="mt-3 p-2 flex items-center gap-2 bg-slate-800 bg-opacity-20">
				<Link href="/profile">
					<button className="bg-slate-900 w-full text-sm px-2 py-1 text-white rounded hover:shadow hover:bg-slate-800 uppercase ">
						Profil
					</button>
				</Link>
				<button
					onClick={logout}
					className="bg-rose-900 text-sm px-2 py-1  w-full text-white rounded hover:shadow hover:bg-rose-800 uppercase ">
					Keluar
				</button>
			</div>
		</div>
	);
};
export default AvatarDropdown;
