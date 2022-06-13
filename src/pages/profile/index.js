import AppLayout from "@components/Layouts/AppLayout";
import HeaderProfile from "@organisms/Profile/HeaderProfile";
import { useAuth } from "@hooks/api/auth";
import { useEffect, useMemo, useRef, useState } from "react";
import AktivitasUser from "@organisms/Profile/AktivitasUser";
import UraianTugasUser from "@organisms/Profile/UraianTugasUser";
import DiagramAktivitas from "@organisms/Profile/DIagramAKtivitas";
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
		<AppLayout title="Profil">
			<HeaderProfile
				user={user}
				reloadProfile={reloadProfile}
				reloadAktivitas={reloadAktivitas}
			/>
			<div className="flex flex-col space-y-2 py-2">
				<div className="card-content flex items-center justify-center">
					<DiagramAktivitas />
				</div>
				{user?.jabatan && (
					<div className="card-content">
						<UraianTugasUser reload={reloadProfile} jabatan={user?.jabatan} />
					</div>
				)}
				<div className="card-content">
					<AktivitasUser ref={childCompRef} userId={userId} />
				</div>
			</div>
		</AppLayout>
	);
};

export default App;
