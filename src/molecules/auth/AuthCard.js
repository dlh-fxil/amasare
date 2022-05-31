const AuthCard = ({ logo, children }) => (
	<div className="h-screen overflow-auto flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-slate-800">
		<div className="max-h-[15%]">{logo}</div>

		<div className="w-full max-h[85%] sm:max-w-md shadow-md overflow-hidden sm:rounded-2xl bg-gradient-to-tr from-sky-200 rounded-xl to-green-200">
			{children}
		</div>
	</div>
);

export default AuthCard;
