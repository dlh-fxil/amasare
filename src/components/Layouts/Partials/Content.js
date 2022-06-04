import Topbar from "./Topbar";

const Content = ({ onSidebarHide, showSidebar, children, title }) => {
	return (
		<div className="flex h-screen w-full relative">
			{/* sidebarSection */}
			{showSidebar && (
				<div
					className={`w-full h-auto sm:w-64 flex-shrink-0 sm:block hidden`}></div>
			)}
			{/* contenSection */}
			<div className="grow w-full flex flex-col max-w-full overflow-x-hidden">
				{/* top-bar */}
				<Topbar
					showSidebar={showSidebar}
					title={title}
					onSidebarHide={onSidebarHide}
				/>
				<main id="content" className="w-full grow h-full overflow-auto">
					{children}
				</main>
			</div>
		</div>
	);
};
export default Content;
