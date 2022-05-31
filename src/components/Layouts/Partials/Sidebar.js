import React, { useEffect, useState } from "react";

import { useSpring, animated, config } from "react-spring";
import Logo from "./Logo";
import sidebarItems from "@/sataticData/sideBarItems";
import MenuItem from "./MenuItem";
const Sidebar = ({ onSidebarHide, showSidebar }) => {
	const [selected, setSelected] = useState("0");
	const { dashOffset, indicatorWidth, precentage } = useSpring({
		dashOffset: 26.015,
		indicatorWidth: 70,
		precentage: 77,
		from: { dashOffset: 113.113, indicatorWidth: 0, precentage: 0 },
		config: config.molasses,
	});
	return (
		<div
			className={`fixed h-screen bg-card w-full sm:w-64 z-40 sm:z-10 ${
				showSidebar ? "flex flex-col" : "hidden"
			}`}>
			<Logo
				className=" topbar"
				showSidebar={showSidebar}
				onSidebarHide={onSidebarHide}
			/>

			<div className="flex-grow bg-slate-900 text-white overflow-x-hidden overflow-y-auto flex flex-col">
				{sidebarItems[0].map((i, key) => (
					<MenuItem
						key={key}
						item={i}
						onClick={setSelected}
						selected={selected}
					/>
				))}
				<div className="mt-8 mb-0 font-bold px-3 block sm:hidden xl:block">
					SHORTCUTS
				</div>
				{sidebarItems[1].map((i, key) => (
					<MenuItem
						key={key}
						item={i}
						onClick={setSelected}
						selected={selected}
					/>
				))}
				<div className="flex-grow" />
				<div className="sm:hidden">
					<ProfileCard />
				</div>
				<div className="w-full sm:p-3 h-fit  sm:block sm:h-20 xl:h-32">
					<div
						className="sm:rounded-xl w-full h-full px-3 sm:px-0 xl:px-3 overflow-hidden"
						style={{
							backgroundImage:
								"url('https://assets.codepen.io/3685267/res-react-dash-usage-card.svg')",
						}}>
						<div className="sm:pt- pt-2">
							<div className="sm: sm:flex-col-reverse flex">
								<div className="flex-shrink-0">
									<div className="font-bold text-gray-300 text-sm">
										By: franzaLeny
									</div>
									<div className="text-gray-500  text-xs">2021</div>
								</div>

								<animated.div className="text-right text-gray-400 h-2 hidden sm:block text-xs">
									{precentage.to(i => `${Math.round(i)}%`)}
								</animated.div>

								<div className="w-full flex-grow block sm:hidden xl:block text-gray-300">
									<svg
										viewBox="0 0 100 11"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<line
											x1="5"
											y1="5.25"
											x2="95"
											y2="5.25"
											stroke="#3C3C3C"
											strokeWidth="5"
											strokeLinecap="round"
										/>
										<animated.line
											x1="5"
											y1="5.25"
											x2={indicatorWidth}
											y2="5.25"
											stroke="currentColor"
											strokeWidth="5"
											strokeLinecap="round"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Sidebar;
import Link from "next/link";
import { useAuth } from "@/hooks/api/auth";
const ProfileCard = () => {
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
		<div className="w-full bg-gradient-to-t to-transparent via-slate-50 h-full from-slate-200  rounded-lg">
			<div className="flex justify-center">
				<div className="relative w-28">
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
