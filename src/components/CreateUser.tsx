import { Badge, Button, Card, TextInput } from "@tremor/react";
import { useState } from "react";
import { useUsersActions } from "../hooks/useUsersActions";
export function CreateUser() {
	const { addUser } = useUsersActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setResult(null);
		const form = e.currentTarget;
		const formData = new FormData(form);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		if (!name || !email || !github) {
			return setResult("ko");
		}
		addUser({ name, email, github });
		setResult("ok");
		form.reset();
	};

	return (
		<Card className="mb-4">
			<h2 className="text-lg font-bold">Create new User</h2>
			<form className="flex flex-col gap-2 " onSubmit={handleSubmit}>
				<TextInput name='name' placeholder="Escribe el nombre" />
				<TextInput name='email' placeholder="Escribe el email" />
				<TextInput name='github' placeholder="Escribe el usuario de hithub" />
				<div className="flex gap-5 items-center">
					<Button type="submit"> Creat Usuario </Button>
					{result === "ok" && (
						<Badge color="green">Registrado Correactamente</Badge>
					)}
					{result === "ko" && <Badge color="red">Error al validar datos</Badge>}
				</div>
			</form>
		</Card>
	);
}
