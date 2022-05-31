import AppLayout from "@components/Layouts/AppLayout";
import Head from "next/head";
import Container from "@components/Container";
import Timeline, {
	TimelineHeaders,
	SidebarHeader,
	DateHeader,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
const groups = [
	{ id: 1, title: "Program Kegiatan 1" },
	{ id: 2, title: "Program Kegiatan 2" },
];

const items = [
	{
		id: 1,
		group: 1,
		title: "kegiatan 1",
		start_time: moment(),
		end_time: moment().add(1, "hour"),
	},
	{
		id: 2,
		group: 2,
		title: "kegiatan 2",
		start_time: moment().add(-0.5, "hour"),
		end_time: moment().add(0.5, "hour"),
	},
	{
		id: 3,
		group: 1,
		title: "kegiatan 3",
		start_time: moment().add(2, "hour"),
		end_time: moment().add(3, "hour"),
	},
];
const App = () => {
	return (
		<AppLayout>
			<Head>
				<title>Kalender</title>
			</Head>
			<Container>
				<div className="bg-white text-slate-900">
					<Timeline
						calendarHeaderClassName="bg-slate-600"
						groups={groups}
						items={items}
						defaultTimeStart={moment().add(-15, "day")}
						defaultTimeEnd={moment().add(15, "day")}
					/>
				</div>
			</Container>
		</AppLayout>
	);
};

export default App;
