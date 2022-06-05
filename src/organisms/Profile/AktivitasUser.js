import React, {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from "react";
import SemuaAktivitas from "@organisms/Aktivitas/SemuaAktivitasAktivitas";
import makeQueryParams from "@/lib/makeQueryParams";
import { getAktivitas } from "@hooks/api/Kegiatan/aktivitas";
const AktivitasUser = ({ userId = null }, ref) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});
	const [perPage, setPerPage] = useState(10);
	const [globalFilter, setGlobalFilter] = useState("");
	const [filters, setFilters] = useState([]);
	const [filtersDefault, setFiltersDefault] = useState([]);
	const [includes, setIncludes] = useState(
		"users,units,uraianTugas,createdBy.jabatan,programKegiatan.unit,programKegiatan.program,programKegiatan.kegiatan",
	);

	const generateParam = () => {
		const q = makeQueryParams({
			globalFilter,
			filters: [...filtersDefault, ...filters],
			perPage,
			includes,
		});
		return q;
	};
	const getData = async query => {
		setLoading(true);
		const res = await getAktivitas({ query });
		if (res.success) {
			setLoading(false);
			return res;
		}
		setLoading(false);
		return {};
	};

	useEffect(async () => {
		if (filtersDefault.length) {
			const query = generateParam();
			await getData(query).then(res => setData(res));
		}
		return () => {
			setData({});
		};
	}, [filtersDefault]);
	useEffect(() => {
		if (userId) {
			setFiltersDefault([{ id: "user_id", value: userId }]);
		}
	}, [userId]);
	useImperativeHandle(ref, params => ({
		reload(params = null) {
			console.log("reload");
			returnSuccess(params);
		},
	}));
	const returnSuccess = newData => {
		const query = generateParam();
		getData(query).then(res => {
			setData(res);
			// setOpenModal(false);
		});
	};
	return (
		<SemuaAktivitas
			allDataAktivitas={data}
			// setDataFollow={setDataFollow}
			pageLoad={loading}
			responseFromChild={returnSuccess}
		/>
	);
};
export default forwardRef(AktivitasUser);
