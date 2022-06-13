import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const dataUraianTugas = {
	labels: ["Sesuai Uraian Tugas", "TIdak Sesuai Uraian Tugas"],
	datasets: [
		{
			label: "# of Votes",
			data: [90, 10],
			backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
			borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
			borderWidth: 1,
		},
	],
};
export const dataProgramKegiatan = {
	labels: ["Sesuai DPA", "TIdak Sesuai DPA"],
	datasets: [
		{
			label: "# of Votes",
			data: [10, 1],
			backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
			borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
			borderWidth: 1,
		},
	],
};
export const dataDisetujui = {
	labels: ["Disetujui", "TIdak Disetujui", "Belum Disetujui"],
	datasets: [
		{
			label: "# of Votes",
			data: [10, 7, 8],
			backgroundColor: [
				"rgba(54, 162, 235, 0.2)",
				"rgba(255, 99, 132, 0.2)",
				"rgba(255, 159, 64, 0.2)",
			],
			borderColor: [
				"rgba(54, 162, 235, 1)",
				"rgba(255, 99, 132, 1)",
				"rgba(255, 159, 64, 1)",
			],
			borderWidth: 1,
		},
	],
};

const DiagramAktivitas = () => {
	return (
		<div className="flex max-w-full overflow-auto scrollbar-thin p-2 justify-center items-center">
			<div>
				<Pie data={dataUraianTugas} />
			</div>
			<div>
				<Pie data={dataProgramKegiatan} />
			</div>
			<div>
				<Pie data={dataDisetujui} />
			</div>
			{/* <div>
				<Pie data={data} />
			</div>
			<div>
				<Pie data={data} />
			</div>
			<div>
				<Pie data={data} />
			</div>
			<div>
				<Pie data={data} />
			</div> */}
		</div>
	);
};
export default DiagramAktivitas;
