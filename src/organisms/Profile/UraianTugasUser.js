import { useState, useEffect } from "react";
import { getUraianTugas } from "@hooks/api/Kepegawaian/uraianTugas";
import { Disclosure, Transition } from "@headlessui/react";
import { Button } from "@atoms/FormControl";
import { ChevronUpIcon } from "@heroicons/react/outline";
import ModalUraianTugas from "@organisms/UraianTugas/ModalUraianTugas";
export default function UraianTugasUser({ jabatan = {} } = {}) {
	const [dataUraianTugas, setDataUraianTugas] = useState([]);
	const [dataEdit, setDataEdit] = useState({});
	const [openModal, setOpenModal] = useState(false);
	const [open, setOpen] = useState(true);
	const getDataUraianTugas = () => {
		const query = "?perPage=500&filter[jabatan_id]=" + jabatan.id;
		getUraianTugas({ query })
			.then(res => {
				if (res.success) {
					setDataUraianTugas(res.data);
					// setOpen(true);
				}
			})
			.catch(err => console.log(err));
	};
	const closeModalJabatan = () => {
		setOpenModal(false);
	};
	const openModalJabatan = () => {
		setOpenModal(true);
	};
	useEffect(() => {
		if (jabatan.id) {
			getDataUraianTugas();
		}
	}, [jabatan]);

	const editData = item => {
		if (item.id) {
			setDataEdit(item);
			openModalJabatan();
		}
	};
	const reload = () => {
		getDataUraianTugas();
		closeModalJabatan();
	};
	return (
		<Disclosure
			as="div"
			className={`h-fit w-full overflow-clip  ${
				open ? "rounded-lg border border-blue-500" : ""
			}`}>
			<Disclosure.Button
				onClick={() => setOpen(!open)}
				className={`focus:outline-none flex w-full justify-between items-center px-4 py-2 text-left text-sm font-medium  hover:text-green-700 hover:bg-blue-200 ${
					open
						? "bg-blue-900 text-lime-100 rounded-t-lg bg-opacity-50"
						: "bg-orange-700 text-green-100 rounded-lg"
				}`}>
				<span className="font-medium text-center w-full text-lg">
					Urain Tugas
				</span>
				<ChevronUpIcon
					className={`${open ? "" : "rotate-180 transform"} h-5 w-5`}
				/>
			</Disclosure.Button>
			<Transition
				show={open}
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0">
				{/* {open && ( */}
				<Disclosure.Panel className="text-sm rounded-b-lg overflow-hidden text-gray-500">
					<p
						className={`text-left mt-2 px-2 font-bold ${
							dataUraianTugas.length > 0 ? "text-slate-50" : "text-red-500"
						}`}>
						{dataUraianTugas.length > 0
							? "Uraian Tugas "
							: "Belum ada uraian tugas untuk jabatan "}
						{jabatan?.nama}
					</p>
					<div className="text-base text-slate-100  px-6 pb-4">
						<ul className="sm:mt-2 list-decimal space-y-2">
							{dataUraianTugas.map(item => (
								<li key={item.id}>
									<p>
										{item?.uraian_tugas}{" "}
										<span>
											<button
												onClick={() => editData(item)}
												type="button"
												className="font-medium text-blue-500">
												Edit
											</button>
										</span>
									</p>
								</li>
							))}
						</ul>
						{/* <FormUraianTugas /> */}
						<ModalUraianTugas
							open={openModal}
							close={closeModalJabatan}
							jabatanId={jabatan.id}
							withJabatan={false}
							dataEdit={dataEdit}
							returnSuccess={reload}
						/>
					</div>
					<div className="flex gap-4 items-center bg-slate-500 bg-opacity-10 p-4 justify-end">
						<Button
							disable={!open}
							color="red"
							onClick={() => setOpen(false)}
							type="button">
							Tutup
						</Button>
						<Button
							disable={!open}
							color="blue"
							onClick={openModalJabatan}
							type="button">
							Tugas Baru
						</Button>
					</div>
				</Disclosure.Panel>
			</Transition>
		</Disclosure>
	);
}
