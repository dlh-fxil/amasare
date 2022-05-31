import Icons from "@atoms/Icons";
import Link from "next/link";
import { useRouter } from "next/router";
const MenuItem = ({
	item: { id, title, notifications, icon, route },
	onClick,
	selected,
}) => {
	const router = useRouter();

	return (
		<Link href={route ?? "/"}>
			<a
				className={`
          'w-full  flex items-center ml-2  px-4 sm:px-1 xl:px-3 justify-start sm:justify-center xl:justify-start py-2 cursor-pointer',
          ${
						router.pathname == route
							? "bg-gradient-to-l pointer-events-none shadow shadow-slate-600 from-slate-800 to-blue-900 text-lime-200 my-1 menu-items rounded-l-full relative"
							: ""
					}
        `}
				onClick={() => onClick(id)}>
				<Icons
					icon={icon}
					className={`w-fit h-5 ${
						router.pathname == route ? " text-yellow-200" : ""
					}`}
				/>
				<div className="block ml-2">{title}</div>
				<div className="block flex-grow" />
				{notifications && (
					<div className="flex bg-pink-600  w-5 h-5 items-center justify-center rounded-full mr-2">
						<div className="text-white text-sm">{notifications}</div>
					</div>
				)}
			</a>
		</Link>
	);
};
export default MenuItem;
