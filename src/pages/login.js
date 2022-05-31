import ApplicationLogo from "@atoms/ApplicationLogo";
import AuthCard from "@molecules/auth/AuthCard";
import AuthSessionStatus from "@molecules/auth/AuthSessionStatus";
import AuthValidationErrors from "@molecules/auth/AuthValidationErrors";
import GuestLayout from "@/components/Layouts/GuestLayout";
import Link from "next/link";
import { Input, Button } from "@atoms/FormControl";
import { useAuth } from "@/hooks/api/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup
	.object({
		email: yup
			.string()
			.required("Email harus diisi")
			.email("Harus Berupa Email"),
		password: yup.string().required("Password Harus diisi"),
	})
	.required();
const Login = () => {
	const router = useRouter();

	const { login } = useAuth({
		middleware: "guest",
		redirectIfAuthenticated: "/aktivitas",
	});

	const [errorsBackend, setErrors] = useState([]);
	const [status, setStatus] = useState(null);
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
			select: [],
		},
		resolver: yupResolver(schema),
		reValidateMode: "onChange",
	});
	useEffect(() => {
		if (router.query.reset?.length > 0 && errors.length === 0) {
			setStatus(atob(router.query.reset));
		} else {
			setStatus(null);
		}
	});

	const submitForm = async (data, event) => {
		event.preventDefault();
		const { email, password } = data;
		login({ email, password, setErrors, setStatus });
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
					<p className="font-bold text-lg sm:text-2xl sm:uppercase w-full rounded-t-lg text-center px-4 pt-4 pb-2 bg-slate-500 bg-opacity-10 tracking-widest">
						Login
					</p>
					<div className="p-4">
						<AuthSessionStatus status={status} />
						<AuthValidationErrors errors={errorsBackend} />
					</div>
					<form className="px-6" onSubmit={handleSubmit(submitForm)}>
						<div className="flex flex-col gap-6">
							<Input
								{...register("email")}
								name="email"
								placeholder="Alamat Email"
								size="reguler"
								error={errors.email?.message}
								color="blue"
								autoFocus
							/>

							<Input
								{...register("password")}
								name="password"
								placeholder="Password"
								size="reguler"
								error={errors.password?.message}
								color="blue"
								type="password"
							/>
							{/* Remember Me */}
							<div className="flex justify-between items-center">
								<label
									htmlFor="remember_me"
									className="inline-flex group cursor-pointer items-center">
									<input
										id="remember_me"
										type="checkbox"
										name="remember"
										className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
									/>

									<span className="ml-2 group-hover:scale-105 font-bold group-hover:font-semibold  text-sm text-gray-800">
										Ingat saya
									</span>
								</label>
								<Link href="/forgot-password">
									<a className="underline text-sm text-sky-900 hover:scale-105 font-bold hover:font-semibold cursor-pointer hover:text-slate-900">
										Lupa Password?
									</a>
								</Link>
							</div>
							<div className="flex items-center pb-4 gap-2 justify-end">
								<Link href="/register">
									<a className="underline text-sm hover:scale-105  hover:font-semibold cursor-pointer text-blue-900 font-bold hover:text-gray-900">
										Belum Punya Akun?
									</a>
								</Link>

								<Button type="submit" color="sky">
									Masuk
								</Button>
							</div>
						</div>
					</form>
				</div>
			</AuthCard>
		</GuestLayout>
	);
};

export default Login;
