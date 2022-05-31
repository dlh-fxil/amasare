const Container = ({ children }) => {
	return (
		<div className="mx-auto sm:p-6 lg:p-8 overflow-auto max-w-full overflow-clip shadow-sm sm:rounded-lg">
			{children}
		</div>
	);
};

export default Container;
