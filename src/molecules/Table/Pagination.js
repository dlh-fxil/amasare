const Pagination = ({ gotoPage, canPreviousPage, metaData, canNextPage, pageCount, pageIndex, setCursor }) => {
	return (
		<div className="p-2">
			{metaData?.current_page && <FirstPage gotoPage={gotoPage} canPreviousPage={canPreviousPage} />}

			<PrevPage setCursor={setCursor} prev_cursor={metaData?.prev_cursor} gotoPage={gotoPage} current_page={metaData?.current_page} canPreviousPage={canPreviousPage} />

			<NextPage setCursor={setCursor} next_cursor={metaData?.next_cursor} gotoPage={gotoPage} current_page={metaData?.current_page} canPreviousPage={canPreviousPage} />

			{metaData?.current_page && <LastPage gotoPage={gotoPage} pageCount={pageCount} canNextPage={canNextPage} />}
			{metaData?.current_page && <PageInfo current_page={metaData?.current_page} pageCount={pageCount} />}
			{metaData?.current_page && (
				<span>
					| Go to page:
					<input
						className="w-fit"
						type="number"
						value={pageIndex + 1}
						onChange={e => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							gotoPage(page);
						}}
					/>
				</span>
			)}
		</div>
	);
};

export default Pagination;
function FirstPage({ gotoPage, canPreviousPage }) {
	return (
		<button className="bg-zinc-300 p-1 mx-2" onClick={() => gotoPage(1)} disabled={!canPreviousPage}>
			{"<<"}
		</button>
	);
}
function PrevPage({ setCursor, prev_cursor, current_page, gotoPage, canPreviousPage }) {
	return (
		<button
			className="bg-zinc-300 p-1 mx-2"
			onClick={() => {
				prev_cursor ? setCursor(prev_cursor) : gotoPage(current_page - 2);
			}}
			disabled={!canPreviousPage && !prev_cursor}>
			{"<"}
		</button>
	);
}
function NextPage({ setCursor, next_cursor, gotoPage, current_page, canPreviousPage }) {
	return (
		<button
			className="bg-zinc-300 p-1 mx-2"
			onClick={() => {
				next_cursor ? setCursor(next_cursor) : gotoPage(current_page);
			}}
			disabled={!canPreviousPage && !next_cursor}>
			{">"}
		</button>
	);
}
function LastPage({ gotoPage, pageCount, canNextPage }) {
	return (
		<button className="bg-zinc-300 p-1 mx-2" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
			{">>"}
		</button>
	);
}
function PageInfo({ current_page, pageCount }) {
	return (
		<span>
			Page{" "}
			<strong>
				{current_page} of {pageCount}
			</strong>
		</span>
	);
}
