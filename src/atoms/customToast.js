import { toast } from "react-toastify";

const customToast = () => {
	const toastLoading = data => {
		if (data) {
			if (data.type == "loading") {
				return toast.loading(data.message ?? "Sedang memuat", {
					toastId: "loading",
					theme: "dark",
				});
			} else {
				let message = "tidak ada pesan";
				if (data.messages) {
					message = () => (
						<div>
							<span className="font-bold mb-2 underline underline-offset-2">Data gagal simpan</span>
							<div className="flex mt-2  flex-col gap-1">
								{data.messages.map(item => (
									<p key={item} className="even:text-blue-300 w-full">
										{item}
									</p>
								))}
							</div>
						</div>
					);
				} else {
					message = data.message;
				}
				return toast.update("loading", {
					render: message,
					type: data?.type || "warning",
					autoClose: data?.type == "success" ? 3000 : 10000,
					isLoading: false,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					closeButton: true,
					progress: undefined,
				});
			}
		} else {
			return toast.dismiss();
		}
	};

	return { toastLoading };
};
export default customToast;
