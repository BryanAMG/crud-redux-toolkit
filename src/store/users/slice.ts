import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Bryan Armando",
		email: "bryan@gmail.com",
		github: "bryan",
	},
	{
		id: "2",
		name: "Matias ",
		email: "matias@gmail.com",
		github: "matias",
	},
	{
		id: "3",
		name: "Miriam Pilar",
		email: "miriam@gmail.com",
		github: "miriam",
	},
];

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: UserId;
}

const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux_state__");
	return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

// creando una porcion del store
export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			// a través de a base de datos - local
			const id = crypto.randomUUID();
			return [...state, { id, ...action.payload }];
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
	},
});
// exportando las acciones o funciones para cambiar el estado
// para usar en componentes
export const { deleteUserById, addNewUser } = userSlice.actions;
// para el store
export default userSlice.reducer;
