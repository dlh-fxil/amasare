import ApplicationLogo from "@atoms/ApplicationLogo";
import AuthCard from "@molecules/auth/AuthCard";
import AuthValidationErrors from "@molecules/auth/AuthValidationErrors";
import GuestLayout from "@/components/Layouts/GuestLayout";
import Link from "next/link";
import { Input, Button } from "@atoms/FormControl";
import { useAuth } from "@/hooks/api/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup
	.object({
		name: yup.string().required("Nama Harus diisi"),
		email: yup.string().required("Email harus diisi").email("Harus Berupa Email"),
		password: yup.string().required("Password Harus diisi"),
		password_confirmation: yup.string().required("Konfirmasi Password Harus diisi"),
	})
	.required();

const Register = () => {
	const { registerUser } = useAuth({
		middleware: "guest",
		redirectIfAuthenticated: "/dashboard",
	});

	const [errorsBackend, setErrors] = useState([]);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
		},
		resolver: yupResolver(schema),
		reValidateMode: "onChange",
	});
	const submitForm = (data, event) => {
		event.preventDefault();
		const { name, email, password, password_confirmation } = data;
		registerUser({
			name,
			email,
			password,
			password_confirmation,
			setErrors,
		});
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
				<div>
					<p className="font-extrabold  sm:text-2xl sm:uppercase w-full rounded-t-lg text-center px-4 pt-4 pb-2 bg-slate-500 bg-opacity-20 tracking-widest uppercase">
						Buat Akun
					</p>
					<form className="pt-4" onSubmit={handleSubmit(submitForm)}>
						{/* Validation Errors */}
						<div className="mx-6 flex flex-col gap-2">
							<AuthValidationErrors className="mb-4 mx-auto" errors={errorsBackend} />
							{/* Name */}
							<Input
								{...register("name")}
								name="name"
								placeholder="Nama"
								size="reguler"
								error={errors.name?.message}
								color="blue"
								autoFocus
							/>
							{/* Email Address */}
							<Input
								{...register("email")}
								name="email"
								placeholder="Alamat Email"
								size="reguler"
								error={errors.email?.message}
								color="blue"
							/>
							{/* Password */}
							<Input
								{...register("password")}
								name="password"
								placeholder="Password"
								size="reguler"
								error={errors.password?.message}
								color="blue"
								type="password"
							/>
							{/* Confirm Password */}
							<Input
								{...register("password_confirmation")}
								name="password_confirmation"
								placeholder="Konfirmasi Password"
								size="reguler"
								error={errors.password_confirmation?.message}
								color="blue"
								type="password"
							/>
						</div>
						<div className="flex items-center p-4 bg-slate-500 bg-opacity-20 rounded-b-lg justify-end mt-2">
							<Link href="/login">
								<a className="underline text-sm text-gray-600 hover:text-gray-900">
									Sudah ada akun?
								</a>
							</Link>

							<Button type="submit" className="ml-4">
								Register
							</Button>
						</div>
					</form>
				</div>
			</AuthCard>
		</GuestLayout>
	);
};

export default Register;
