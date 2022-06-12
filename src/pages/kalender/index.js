import AppLayout from "@components/Layouts/AppLayout";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import { getProgramKegiatan } from "@hooks/api/Kegiatan/programKegiatan";
import { useEffect, useState } from "react";
import makeQueryParams from "@/lib/makeQueryParams";
import { getAktivitas } from "@hooks/api/Kegiatan/aktivitas";
import { getUnit } from "@hooks/api/Kepegawaian/unit";
import { getUsers } from "@hooks/api/ManajemenUser/users";
import { Button } from "@atoms/FormControl";
import { ModalDetailAktivitas } from "@molecules/ModalDialog/ModalAktivitas";

const App = () => {
	const [dataProgramKegiatan, setDataProgramKegiatan] = useState([]);
	const [dataAktivitas, setDataAktivitas] = useState([]);
	const [groups, setGroups] = useState([]);
	const [groupsBy, setGroupsBy] = useState("program");
	const [items, setItems] = useState([]);
	const [perPage, setPerPage] = useState(100);
	const [loading, setLoading] = useState(true);
	const [queryProgram, setQueryProgram] = useState("");
	const [queryaktivitas, setQueryaktivitas] = useState("");
	const [filtersAktivitas, setfiltersAktivitas] = useState([]);
	const [filtersProgram, setFiltersProgram] = useState([
		{ id: "type", value: "subKegiatan" },
	]);
	const [keys, setKeys] = useState({
		groupIdKey: "id",
		groupTitleKey: "title",
		groupRightTitleKey: "rightTitle",
		itemIdKey: "id",
		itemTitleKey: "judul", // key for item div content
		itemDivTitleKey: "judul", // key for item div title (<div title="text"/>)
		itemGroupKey: "program_kegiatan_id",
		itemTimeStartKey: "start_time",
		itemTimeEndKey: "end_time",
	});
	const [dataDetail, setDataDetail] = useState({});

	const getProgramgroups = async () => {
		getProgramKegiatan({ query: queryProgram }).then(res => {
			if (res.success) {
				let temp = [];
				res.data.map(item => {
					temp.push({ ...item, height: 60 });
				});
				setKeys({
					...keys,
					groupTitleKey: "nomenklatur",
					itemGroupKey: "program_kegiatan_id",
				});
				setGroups(temp);
			}
		});
	};

	const getUnitGroups = async () => {
		getUnit().then(res => {
			if (res.success) {
				let temp = [];
				res.data.map(item => {
					temp.push({ ...item, height: 60 });
				});
				setKeys({
					...keys,
					groupTitleKey: "nama",
					itemGroupKey: "unit_id",
				});
				setGroups(temp);
			}
		});
	};

	const getUsersGroups = async () => {
		getUsers().then(res => {
			if (res.success) {
				let temp = [];
				res.data.map(item => {
					temp.push({ ...item, height: 60 });
				});
				setKeys({
					...keys,
					groupTitleKey: "nama",
					itemGroupKey: "user_id",
				});
				setGroups(temp);
			}
		});
	};

	const getItems = async () => {
		getAktivitas({ query: queryaktivitas }).then(res => {
			if (res.success) {
				let temp = [];
				res.data.map(item => {
					temp.push({
						...item,
						start_time: moment(item.mulai),
						end_time: item.selesai ? moment(item.selesai) : moment(),
						canMove: false,
						canResize: false,
						canChangeGroup: false,
						itemProps: {
							"data-custom-attribute": "Random content",
							"aria-hidden": true,
							"onDoubleClick": () => {
								setDataDetail(item);
							},
							"className": "weekend",
							"style": {
								background: item.selesai ? "blue" : "green",
							},
						},
					});
				});
				setDataAktivitas(temp);
			}
		});
	};

	useEffect(() => {
		const includes = "";
		const param = makeQueryParams({
			filters: filtersProgram,
			perPage,
			includes,
		});
		setQueryProgram(param);
		return () => {
			setQueryProgram("");
		};
	}, []);

	useEffect(() => {
		const includes =
			"users,units,uraianTugas,createdBy.jabatan,programKegiatan.unit,programKegiatan.program,programKegiatan.kegiatan";

		const param = makeQueryParams({
			filters: filtersAktivitas,
			perPage: "9999",
			includes,
		});
		setQueryaktivitas(param);
		return () => {
			setQueryaktivitas("");
		};
	}, [filtersAktivitas]);

	useEffect(() => {
		if (queryProgram && groupsBy == "program") {
			getProgramgroups();
		} else if (groupsBy == "bidang") {
			getUnitGroups();
		} else if (groupsBy == "users") {
			getUsersGroups();
		}
		return () => {};
	}, [queryProgram, groupsBy]);

	useEffect(() => {
		if (queryaktivitas) {
			getItems();
		}
		return () => {};
	}, [queryaktivitas]);

	useEffect(() => {
		if (dataAktivitas.length && groupsBy == "users") {
			let tempItems = [];
			dataAktivitas.map((item, i) => {
				item.users.map((user, j) => {
					tempItems.push({
						...item,
						id: `item${i}user${j}`,
						user_id: user.id,
					});
				});
			});
			setItems(tempItems);
		} else if (dataAktivitas.length && groupsBy !== "users") {
			setItems(dataAktivitas);
		}
		return () => {
			setItems([]);
		};
	}, [dataAktivitas, groupsBy]);

	const test = (canvasTimeStart, canvasTimeEnd) => {
		const start = new Date(canvasTimeStart);
		const end = new Date(canvasTimeEnd);
		setfiltersAktivitas([
			{ id: "start", value: start },
			{ id: "finish", value: end },
		]);
	};

	return (
		<AppLayout title="Kalender">
			<div className="py-2 h-full">
				<div className="h-full flex flex-col card-content">
					<ModalDetailAktivitas
						open={!!dataDetail.id}
						close={() => setDataDetail({})}
						aktivitas={dataDetail}
					/>
					<div className="flex space-x-2 justify-end p-3">
						<Button onClick={() => setGroupsBy("users")}> Pegawai</Button>
						<Button onClick={() => setGroupsBy("bidang")}> Bidang</Button>
						<Button onClick={() => setGroupsBy("program")}>
							{" "}
							Sub Kegiatan
						</Button>
					</div>
					<div className="max-w-full -m-2 p-2 grow overflow-auto scrollbar-thin">
						{groups.length > 0 && (
							<Timeline
								className="text-stale-500"
								groups={groups}
								items={items}
								defaultTimeStart={moment().add(-5, "day")}
								defaultTimeEnd={moment().add(5, "day")}
								onBoundsChange={test}
								sidebarWidth={300}
								keys={keys}></Timeline>
						)}
					</div>
					<div className="pt-6 flex items-center justify-center pointer-events-none"></div>
				</div>
			</div>
		</AppLayout>
	);
};

export default App;
