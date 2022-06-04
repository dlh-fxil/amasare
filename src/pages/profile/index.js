import AppLayout from "@components/Layouts/AppLayout";
import Head from "next/head";
import Container from "@components/Container";
import HeaderProfile from "@organisms/Profile/HeaderProfile";
import { useAuth } from "@hooks/api/auth";
import { useEffect, useMemo, useRef, useState } from "react";
import AktivitasUser from "@organisms/Profile/AktivitasUser";
import UraianTugasUser from "@organisms/Profile/UraianTugasUser";
const App = () => {
	const { user, mutate } = useAuth({ middleware: "auth" });
	const [userId, setUserId] = useState(0);
	const childCompRef = useRef();
	const reloadAktivitas = params => {
		childCompRef.current.reload(params);
	};
	const reloadProfile = params => {
		mutate();
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

			<HeaderProfile
				user={user}
				reloadProfile={reloadProfile}
				reloadAktivitas={reloadAktivitas}
			/>

			{user?.jabatan && (
				<div className="card-content">
					<UraianTugasUser reload={reloadProfile} jabatan={user?.jabatan} />
				</div>
			)}
			<div className="card-content">
				<AktivitasUser ref={childCompRef} userId={userId} />
			</div>
		</AppLayout>
	);
};

export default App;
