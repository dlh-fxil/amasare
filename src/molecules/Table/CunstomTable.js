import {
	useTable,
	useFilters,
	useGlobalFilter,
	useSortBy,
	useFlexLayout,
	usePagination,
	useResizeColumns,
} from "react-table";
import React, { useMemo, useState, useEffect } from "react";
import ColumnFilter from "./ColumnFilter";
const CustomTable = ({ columns = [], data = [], loading = false } = {}) => {
	const defaultColumn = useMemo(
		() => ({
			Filter: ColumnFilter,
			minWidth: 30,
			width: 150,
			maxWidth: 600,
		}),
		[],
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		visibleColumns,
		state: {
			pageIndex,
			pageSize,
			globalFilter,
			filters,
			columnResizing,
			sortBy,
		},
	} = useTable(
		{
			columns,
			data,
			defaultColumn,
			manualGlobalFilter: true,
			manualFilters: true,
			manualSortBy: true,
			// disableMultiSort: false,
			initialState: {
				// pageIndex: PAGE_NO,
				pageSize: 2,
			},
			// pageCount: totalPage,
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		useFlexLayout,
		useResizeColumns,
	);
	const [tableOption, setTableOption] = useState({});

	useEffect(() => {
		setTableOption({ globalFilter, filters, sortBy });

		return () => {
			setTableOption({});
		};
	}, [globalFilter, filters, sortBy]);
	//

	const Table = () => (
		<table className="w-full overflow-x-auto mx-auto" {...getTableProps()}>
			<thead>
				{headerGroups.map(headerGroup => (
					<tr className="" {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<th
								scope="col"
								className="w-full max-w-full border border-slate-500"
								{...column.getHeaderProps()}>
								<div className="flex flex-col justify-center items-center h-full bg-slate-300 text-slate-900 py-2 px-2">
									{/* <div className='' {...column.getHeaderProps(column.getSortByToggleProps())}> */}
									<div className="w-full" {...column.getSortByToggleProps()}>
										{column.render("Header")}
										<span className="text-right">
											{column.isSorted
												? column.isSortedDesc
													? " 🔽"
													: " 🔼"
												: ""}
										</span>
									</div>
									{column.canFilter && column.id !== "_id"
										? column.render("Filter")
										: null}
								</div>

								<div
									{...column.getResizerProps()}
									className={`resizer top-0 right-0 inline-block z-10 transform absolute w-1 h-full translate-x-1/2  ${
										column.isResizing
											? "isResizing bg-orange-300"
											: "bg-green-500"
									} `}
								/>
							</th>
						))}
					</tr>
				))}
			</thead>

			<tbody {...getTableBodyProps()}>
				{rows.map(row => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map(cell => {
								if (loading) {
									return (
										<td
											key={cell.column.id}
											className="overflow-clip px-3 text-center border max-w-full border-slate-500 w-full"
											{...cell.getCellProps({
												style: {
													minWidth: cell.minWidth, // width: cell.width,
												},
											})}>
											<div className="flex items-center gap-2">
												<svg
													className="animate-spin h-5 w-5 text-green-700"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24">
													<circle
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"></circle>
													<path
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
												</svg>
												<div className="animate-pulse inline-flex w-full text-center space-x-4">
													<div className="h-6 bg-slate-800 blur to-stone-600 w-full text-sm text-stone-800 text-opacity-50 rounded">
														{/* {cell.column.Header} */}
													</div>
												</div>
											</div>
										</td>
									);
								}

								return (
									<td
										className="overflow-clip max-w-full flex border border-slate-500 py-1 px-2"
										{...cell.getCellProps({
											style: {
												minWidth: cell.minWidth, // width: cell.width,
											},
										})}>
										{cell.render("Cell")}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
	return { Table, tableOption };
};
export default CustomTable;
