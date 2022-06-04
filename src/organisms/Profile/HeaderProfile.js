import PhotoProfile from "./PhotoProfile";
function HeaderProfile({
	user = {},
	reloadAktivitas = () => {},
	reloadProfile = () => {},
} = {}) {
	return (
		<div className=" bg-cover bg-[url(https://source.unsplash.com/random/1920x160/?wallpaper,landscape)]">
			<div className="flex md:flex-row  flex-col-reverse">
				<div className="flex-1  md:bg-gradient-to-r bg-slate-50/50 md:bg-transparent from-white ">
					<div className="flex h-full flex-col">
						<div className="grow md:flex items-center justify-between px-2 sm:px-3 lg:px-4 py-4">
							<div>
								<div className="text-center md:text-left font-bold text-slate-800 font text-lg md:text-2xl">
									{user?.name}
								</div>
								{user.nip && (
									<p className="text-center md:text-left text-slate-900 text-lg font-semibold">
										{user?.nip}
									</p>
								)}
								{user?.pangkat && (
									<p className="text-center md:text-left text-slate-900 text-lg">
										{user?.pangkat.nama}
									</p>
								)}
								{user.jabatan && (
									<p className="text-center md:text-left text-slate-900 font-semibold">
										{user?.jabatan?.nama}
									</p>
								)}
							</div>
						</div>
						<div className="bg-green-500/50 md:bg-transparent md:rounded-l-full h-fit flex-none bg-opacity-10 flex justify-end">
							<div className="flex px-4 flex-wrap  w-full justify-end items-center">
								<ul className="flex py-1.5 gap-y-1 gap-x-4 items-center flex-1 flex-wrap justify-start">
									{user.email && cardEmail()}
									{user.no_wa && cardNoWa()}
									{user.no_hp && cardNoHp()}
								</ul>
								<ButtonProfile
									reloadAktivitas={reloadAktivitas}
									user={user}
									reloadProfile={reloadProfile}
								/>
							</div>
						</div>
					</div>
				</div>
				<PhotoProfile user={user} />
			</div>
		</div>
	);

	function cardNoHp() {
		return (
			<li className="font-semibold text-slate-900">
				<div className="flex  items-center gap-2 font-semibold">
					<div className="w-fit h-fit">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="blue"
							className="h-6 w-auto"
							viewBox="0 0 448 512">
							<path d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96C448 60.65 419.3 32 384 32zM351.6 321.5l-11.62 50.39c-1.633 7.125-7.9 12.11-15.24 12.11c-126.1 0-228.7-102.6-228.7-228.8c0-7.328 4.984-13.59 12.11-15.22l50.38-11.63c7.344-1.703 14.88 2.109 17.93 9.062l23.27 54.28c2.719 6.391 .8828 13.83-4.492 18.22L168.3 232c16.99 34.61 45.14 62.75 79.77 79.75l22.02-26.91c4.344-5.391 11.85-7.25 18.24-4.484l54.24 23.25C349.5 306.6 353.3 314.2 351.6 321.5z" />
						</svg>
					</div>
					<span> {user?.no_hp}</span>
				</div>
			</li>
		);
	}

	function cardNoWa() {
		return (
			<li className="font-semibold text-green-900">
				<a
					href={`https://wa.me/${user?.no_wa}`}
					target="_blank"
					className="flex items-center gap-2 font-semibold">
					<div className="w-fit h-fit ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="green"
							className="h-6 w-auto"
							viewBox="0 0 448 512">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
							/>
						</svg>
					</div>
					<span> {user?.no_wa}</span>
				</a>
			</li>
		);
	}

	function cardEmail() {
		return (
			<li className="font-semibold ">
				<a
					href={`mailto:${user?.email}`}
					className="flex items-center gap-2 text-slate-900 md:font-semibold">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-auto"
						viewBox="0 0 640 512"
						fill="red">
						<path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L478.9 160.8C412.3 167.2 356.5 210.8 332.6 270.6L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM294.4 339.2L320.8 319.4C320.3 324.9 320 330.4 320 336C320 378.5 335.1 417.6 360.2 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2zM640 336C640 415.5 575.5 480 496 480C416.5 480 352 415.5 352 336C352 256.5 416.5 192 496 192C575.5 192 640 256.5 640 336zM540.7 292.7L480 353.4L451.3 324.7C445.1 318.4 434.9 318.4 428.7 324.7C422.4 330.9 422.4 341.1 428.7 347.3L468.7 387.3C474.9 393.6 485.1 393.6 491.3 387.3L563.3 315.3C569.6 309.1 569.6 298.9 563.3 292.7C557.1 286.4 546.9 286.4 540.7 292.7H540.7z" />
					</svg>
					<span> {user?.email}</span>
				</a>
			</li>
		);
	}
}

export default HeaderProfile;
import { useState, useEffect } from "react";
import ModalEditProfile from "./ModalEditProfile";
import ModalAktivitas from "./ModalAktivitas";

const ButtonProfile = ({
	user = {},
	reloadAktivitas = () => {},
	reloadProfile = () => {},
}) => {
	const [openModalEditProfile, setOpenModalEditProfile] = useState(false);
	const [openModalKegiatan, setOpenModalKegiatan] = useState(false);
	const closeModalProfile = () => {
		setOpenModalEditProfile(false);
	};
	const openModalProfile = () => {
		setOpenModalEditProfile(true);
	};
	const closeModalKegiatan = () => {
		setOpenModalKegiatan(false);
	};
	const openModalAddKegiatan = () => {
		setOpenModalKegiatan(true);
	};

	return (
		<>
			<ModalEditProfile
				open={openModalEditProfile}
				close={closeModalProfile}
				user={user}
				returnSuccess={reloadProfile}
			/>
			<ModalAktivitas
				returnSuccess={reloadAktivitas}
				open={openModalKegiatan}
				close={closeModalKegiatan}
				user={user}
			/>
			<ul className="flex py-1.5 items-center gap-2 justify-end">
				<li className="font-semibold">
					<button
						onClick={openModalAddKegiatan}
						className="bg-blue-600 px-3 py-2 rounded-md text-white font-semibold">
						Kegiatan Baru
					</button>
				</li>
				<li className="font-semibold">
					<button
						onClick={openModalProfile}
						className="bg-gray-200 px-3 py-2 rounded-md text-black font-semibold">
						Edit Profile
					</button>
				</li>
				<li className="font-semibold">
					<button className="bg-gray-200 px-4 py-2 rounded-md text-black font-semibold">
						...
					</button>
				</li>
			</ul>
		</>
	);
};
