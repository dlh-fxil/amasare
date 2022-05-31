import ApplicationLogo from "@atoms/ApplicationLogo";
import AuthCard from "@molecules/auth/AuthCard";
import AuthSessionStatus from "@molecules/auth/AuthSessionStatus";
import AuthValidationErrors from "@molecules/auth/AuthValidationErrors";
import GuestLayout from "@components/Layouts/GuestLayout";
import { Input, Button } from "@atoms/FormControl";
import Link from "next/link";
import { useAuth } from "@/hooks/api/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const ForgotPassword = () => {
	const { forgotPassword } = useAuth({
		middleware: "guest",
		redirectIfAuthenticated: "/aktivitas",
	});
	const schema = yup
		.object({
			email: yup
				.string()
				.required("Email harus diisi")
				.email("Harus Berupa Email"),
		})
		.required();
	const [status, setStatus] = useState(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
		},
		resolver: yupResolver(schema),
		reValidateMode: "onChange",
	});
	const submitForm = (form, event) => {
		event.preventDefault();

		forgotPassword({ email: form.email, setErrors, setStatus });
	};

	return (
		<GuestLayout>
			<AuthCard
				logo={
					<Link href="/">
						<a>
							<div className="h-full flex flex-grow pb-6 items-end">
								<ApplicationLogo className="w-auto h-full fill-current text-gray-500" />
							</div>
						</a>
					</Link>
				}>
				<div className="p-4 text-sm text-gray-600">
					Forgot your password? No problem. Just let us know your email address
					and we will email you a password reset link that will allow you to
					choose a new one.
				</div>

				{/* Session Status */}
				<AuthSessionStatus className="mb-4" status={status} />

				{/* Validation Errors */}
				<AuthValidationErrors className="mb-4" errors={errors} />

				<form onSubmit={handleSubmit(submitForm)}>
					{/* Email Address */}
					<div className="px-4">
						<Input
							{...register("email")}
							name="email"
							placeholder="Alamat Email"
							size="reguler"
							error={errors.email?.message}
							color="blue"
							autoFocus
						/>
					</div>

					<div className="flex items-center p-4 bg-slate-500 bg-opacity-20 rounded-b-lg justify-end mt-2">
						<Link href="/login">
							<a className="underline text-sm text-gray-600 hover:text-gray-900">
								Login?
							</a>
						</Link>

						<Button type="submit" className="ml-4">
							Kirim
						</Button>
					</div>
				</form>
			</AuthCard>
		</GuestLayout>
	);
};

export default ForgotPassword;
