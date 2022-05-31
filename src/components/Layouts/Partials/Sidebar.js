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
				<div className="w-full p-3 h-28 hidden sm:block sm:h-20 xl:h-32">
					<div
						className="rounded-xl w-full h-full px-3 sm:px-0 xl:px-3 overflow-hidden"
						style={{
							backgroundImage:
								"url('https://assets.codepen.io/3685267/res-react-dash-usage-card.svg')",
						}}>
						<div className="block sm:hidden xl:block pt-3">
							<div className="font-bold text-gray-300 text-sm">Used Space</div>
							<div className="text-gray-500 text-xs">
								Admin updated 09:12 am November 08,2020
							</div>
							<animated.div className="text-right text-gray-400 text-xs">
								{precentage.to(i => `${Math.round(i)}%`)}
							</animated.div>
							<div className="w-full text-gray-300">
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
	);
};
export default Sidebar;
