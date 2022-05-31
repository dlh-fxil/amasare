import ApplicationLogo from "@atoms//ApplicationLogo";
import AuthCard from "@molecules/auth/AuthCard";
import AuthSessionStatus from "@molecules/auth/AuthSessionStatus";
import AuthValidationErrors from "@molecules/auth/AuthValidationErrors";
import { Button, Input } from "@atoms/FormControl";
import GuestLayout from "@/components/Layouts/GuestLayout";
import Link from "next/link";
import { useAuth } from "@/hooks/api/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const PasswordReset = () => {
	const router = useRouter();

	const { resetPassword } = useAuth({ middleware: "guest" });

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [errors, setErrors] = useState([]);
	const [status, setStatus] = useState(null);

	const submitForm = event => {
		event.preventDefault();

		resetPassword({
			email,
			password,
			password_confirmation: passwordConfirmation,
			setErrors,
			setStatus,
		});
	};

	useEffect(() => {
		setEmail(router.query.email || "");
	}, [router.query.email]);

	return (
		<GuestLayout>
			<AuthCard
				logo={
					<Link href="/">
						<a>
							<ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
						</a>
					</Link>
				}>
				{/* Session Status */}
				<AuthSessionStatus className="mb-4" status={status} />

				{/* Validation Errors */}
				<AuthValidationErrors className="mb-4" errors={errors} />

				<form onSubmit={submitForm}>
					{/* Email Address */}
					<div>
						<Input
							id="email"
							type="email"
							value={email}
							className="block mt-1 w-full"
							onChange={event => setEmail(event.target.value)}
							required
							autoFocus
						/>
					</div>

					{/* Password */}
					<div className="mt-4">
						<Input
							id="password"
							type="password"
							value={password}
							className="block mt-1 w-full"
							onChange={event => setPassword(event.target.value)}
							required
						/>
					</div>

					{/* Confirm Password */}
					<div className="mt-4">
						<Input
							id="passwordConfirmation"
							type="password"
							value={passwordConfirmation}
							className="block mt-1 w-full"
							onChange={event => setPasswordConfirmation(event.target.value)}
							required
						/>
					</div>

					<div className="flex items-center justify-end mt-4">
						<Button>Reset Password</Button>
					</div>
				</form>
			</AuthCard>
		</GuestLayout>
	);
};

export default PasswordReset;
