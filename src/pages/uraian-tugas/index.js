import AppLayout from "@components/Layouts/AppLayout";
import Head from "next/head";
import Container from "@components/Container";
const App = () => {
	return (
		<AppLayout>
			<Head>
				<title>Uraian Tugas</title>
			</Head>
			<Container>Uraoan Tugas</Container>
		</AppLayout>
	);
};

export default App;
