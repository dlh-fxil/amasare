import React from "react";
import Icons from "@atoms/Icons";
import AvatarDropdown from "./AvatarDropdown";
import Logo from "./Logo";

const Topbar = ({ showSidebar, onSidebarHide, title = "DLH Lembata" }) => {
	return (
		<div
			id="topbar"
			className="flex-none topbar w-full h-16 space-x-2 flex flex-nowrap items-center justify-between">
			<div className="sm:flex block w-full items-center">
				{!showSidebar && (
					<Logo showSidebar={showSidebar} onSidebarHide={onSidebarHide} />
				)}
				<div className="hidden sm:flex justify-between h-full items-center w-full text-lg font-bold pl-3">
					{title}
					{/* <input
						type="text"
						name="company_website"
						id="company_website"
						className="block w-full rounded-md h-8 px-2 border-gray-300 text-slate-800 bg-card"
						placeholder="Cari..."
					/> */}
					<Icons
						icon="SearchIcon"
						outline
						className=" pointer-events-none h-5 w-5"
					/>
				</div>
			</div>
			<div className="p-2 h-16 w-16 hidden sm:block">
				<AvatarDropdown />
			</div>
		</div>
	);
};
export default Topbar;
