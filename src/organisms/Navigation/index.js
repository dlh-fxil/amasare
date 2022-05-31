import { useState } from "react";
import { Logo, Hamburger, NavLinks, ResponsiveNavigation, Settings } from "@molecules/Navigation";
import Container from "@components/Container";
const Navigation = () => {
	const [open, setOpen] = useState(false);
	return (
		<nav className="bg-white border-b border-gray-100">
			{/* Primary Navigation Menu */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex">
						{/* Logo */}
						<div className="flex-shrink-0 flex items-center">
							<Logo />
						</div>

						{/* Navigation Links */}
						<div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
							<NavLinks />
						</div>
					</div>

					{/* Settings Dropdown */}
					<div className="hidden sm:flex sm:items-center sm:ml-6">
						<Settings />
					</div>

					{/* Hamburger */}
					<div className="-mr-2 flex items-center sm:hidden">
						<Hamburger setOpen={setOpen} open={open} />
					</div>
				</div>
			</div>

			{/* Responsive Navigation Menu */}
			{open && (
				<div className="block sm:hidden">
					<ResponsiveNavigation />
				</div>
			)}
		</nav>
	);
};

export default Navigation;
