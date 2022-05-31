import AppLayout from "@components/Layouts/AppLayout";
import Head from "next/head";
import Container from "@components/Container";
const App = () => {
	return (
		<AppLayout>
			<Head>
				<title>Managemen User</title>
			</Head>
			<Container>Manajemen User</Container>
		</AppLayout>
	);
};

export default App;
