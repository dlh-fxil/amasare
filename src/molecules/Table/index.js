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
const Table = ({ columns = [], data = [], setTableOption = () => {} } = {}) => {
	const defaultColumn = useMemo(
		() => ({
			Filter: ColumnFilter,
			minWidth: 30,
			width: 150,
			maxWidth: 600,
			canRisize: true,
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
		setAllFilters,
		setSortBy,

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

			// initialState: {
			// 	pageSize: 2,
			// },
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		useFlexLayout,
		useResizeColumns,
	);
	const resetTable = () => {
		setAllFilters([]);
		setSortBy([]);
	};
	useEffect(() => {
		console.log(sortBy);

		setTableOption({
			globalFilter,
			filters,
			sortBy,
			resetTable,
		});
	}, [globalFilter, filters, sortBy]);

	return (
		<table className="w-full overflow-x-auto mx-auto" {...getTableProps()}>
			<thead>
				{headerGroups.map(headerGroup => (
					<tr
						className="group space-x-1"
						{...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<th
								scope="col"
								className="w-full max-w-full mb-0.5"
								{...column.getHeaderProps()}>
								<div className="flex flex-col rounded-lg justify-end items-center h-full bg-slate-500/20 py-2 px-2">
									{column.canFilter && column.id !== "_id"
										? column.render("Filter")
										: null}
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
								</div>

								{column.canRisize && (
									<div
										{...column.getResizerProps()}
										className={`resizer top-[10%] -right-0.5  inline-block z-10 transform shadow-md absolute w-1 h-[80%] translate-x-1/2  ${
											column.isResizing
												? "isResizing bg-green-500"
												: "bg-lime-500"
										} `}
									/>
								)}
							</th>
						))}
					</tr>
				))}
			</thead>

			<tbody className="space-y-0.5" {...getTableBodyProps()}>
				{rows.map(row => {
					prepareRow(row);
					return (
						<tr className="space-x-1 group " {...row.getRowProps()}>
							{/* <tr {...row.getRowProps()} className="even:bg-slate-600/20"> */}
							{row.cells.map(cell => {
								return (
									<td
										data-tip={cell?.column?.Header}
										className="overflow-clip text-sm group-odd:bg-blue-500/10 leading-tight line-clamp-2 group-active:line-clamp-none group-hover:line-clamp-none shadow shadow-stone-500/50 rounded group-hover:shadow-blue-500 group-active:shadow-blue-500 max-w-full py-1 px-2"
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
};
export default Table;
