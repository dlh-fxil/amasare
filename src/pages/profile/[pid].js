import AppLayout from "@components/Layouts/AppLayout";
import { useRouter } from "next/router";
import HeaderProfile from "@organisms/Profile/HeaderProfile";
import { useAuth } from "@hooks/api/auth";
import { useEffect, useMemo, useRef, useState } from "react";
import AktivitasUser from "@organisms/Profile/AktivitasUser";
import UraianTugasUser from "@organisms/Profile/UraianTugasUser";
import { showUser } from "@hooks/api/ManajemenUser/users";
const App = () => {
	// const { user, mutate } = useAuth({ middleware: "auth" });

	const router = useRouter();
	const { pid } = router.query;
	const [userId, setUserId] = useState();
	const [user, setuser] = useState({});
	useEffect(() => {
		console.log(userId);
		if (userId) {
			// showUser(userId).then(res => console.log(res));
		}
	}, [userId]);
	useEffect(() => {
		if (pid) {
			setUserId(pid);
		}
	}, [pid]);
	// const childCompRef = useRef();
	// const reloadAktivitas = params => {
	// 	childCompRef.current.reload(params);
	// };
	// const reloadProfile = params => {
	// 	mutate();
	// };
	// useEffect(() => {
	// 	if (user?.id) {
	// 		setUserId(user.id);
	// 	}
	// }, [user]);
	return (
		// <AppLayout title="Profil">
		<div>tes</div>

		/* <HeaderProfile
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
			</div> */
		// </AppLayout>
	);
};

export default App;
