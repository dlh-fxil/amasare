import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useAuth } from "@/hooks/api/auth";
import { ToastContainer } from "react-toastify";
import ReactTooltip from "react-tooltip";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import Sidebar from "./Partials/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "moment/locale/id";
import Content from "./Partials/Content";
registerLocale("id", id);

const AppLayout = ({ title = "Amasare", children, checkIsAccessible }) => {
	useAuth({ middleware: "auth" });
	const [showSidebar, onSetShowSidebar] = useState(false);
	if (checkIsAccessible) {
		if (!checkIsAccessible()) {
			return <ErrorPage statusCode={403} />;
		}
	}
	const [isTooltipVisible, setTooltipVisibility] = useState(false);

	useEffect(() => {
		setTooltipVisibility(true);
	}, []);
	useEffect(() => {
		if (isTooltipVisible) {
			ReactTooltip.rebuild();
		}
	});

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			{isTooltipVisible && (
				<ReactTooltip bodyMode globalEventOff="click blur" />
			)}
			<div className="content relative">
				{showSidebar && (
					<Sidebar
						onSidebarHide={() => {
							onSetShowSidebar(false);
						}}
						showSidebar={showSidebar}
					/>
				)}

				<Content
					onSidebarHide={() => {
						onSetShowSidebar(true);
					}}
					title={title}
					children={children}
					showSidebar={showSidebar}
				/>
			</div>
		</>
	);
};

export default AppLayout;
