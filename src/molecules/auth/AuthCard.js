const AuthCard = ({ logo, children }) => (
	<div className="h-screen overflow-auto flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-stone-500">
		<div className="max-h-[15%]">{logo}</div>

		<div className="w-full max-h[85%] sm:max-w-md sm:shadow-md sm:border border-slate-800 overflow-hidden sm:rounded-2xl bg-slate-100">
			{children}
		</div>
	</div>
);

export default AuthCard;
