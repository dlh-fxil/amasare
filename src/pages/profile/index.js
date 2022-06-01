import AppLayout from "@components/Layouts/AppLayout";
import Head from "next/head";
import Container from "@components/Container";
import HeaderProfile from "@organisms/Profile/HeaderProfile";
import { useAuth } from "@hooks/api/auth";
import { useEffect, useMemo, useRef, useState } from "react";
import AktivitasUser from "@organisms/Profile/AktivitasUser";
import UraianTugasUser from "@organisms/Profile/UraianTugasUser";
const App = () => {
	const { user } = useAuth({ middleware: "auth" });
	const [userId, setUserId] = useState(0);
	const childCompRef = useRef();
	const reloadAktivitas = params => {
		childCompRef.current.reload(params);
	};
	useEffect(() => {
		if (user?.id) {
			setUserId(user.id);
		}
	}, [user]);
	return (
		<AppLayout>
			<Head>
				<title>Profile</title>
			</Head>

			<HeaderProfile user={user} reloadAktivitas={reloadAktivitas} />
			<Container>
				<div className="w-full py-2 sm:py-0 flex flex-col gap-2 lg:flex-row">
					{user?.jabatan && (
						<div className="lg:w-1/4 h-fit flex-shrink-0">
							<UraianTugasUser jabatan={user?.jabatan} />
						</div>
					)}
					<div className="flex-grow">
						<AktivitasUser ref={childCompRef} userId={userId} />
					</div>
				</div>
			</Container>
		</AppLayout>
	);
};

export default App;
