import Icons from "@atoms/Icons";

const LogoTopBar = ({ showSidebar, onSidebarHide, ...props }) => {
	return (
		<div {...props}>
			<div className="h-16 px-3 topbar  sm:w-64 bg-slate-300 w-full flex flex-nowrap items-center justify-between sidebar-separator-top">
				<img
					src="/images/logo/ama-sare-horizontal.png"
					className="object-contain object-center h-8 flex-grow"
					alt="Logo Ama Sare"
				/>
				<IconButton show={showSidebar} onClick={onSidebarHide} />
			</div>
		</div>
	);
};
export default LogoTopBar;
const IconButton = ({
	onClick = () => {},
	className = "w-10 h-10",
	show = true,
}) => {
	return (
		<button
			onClick={onClick}
			type="button"
			className={`${
				show
					? "bg-red-700 bg-opacity-75 opacity-90 hover:opacity-100"
					: "hover:opacity-90"
			}  rounded-full border flex flex-none w-fit justify-center items-center ${className}`}>
			{show ? (
				<Icons icon="XIcon" className="w-7 h-7 text-white" />
			) : (
				<Icons icon="MenuIcon" className="w-7 h-7 text-blue-100" />
			)}
		</button>
	);
};
