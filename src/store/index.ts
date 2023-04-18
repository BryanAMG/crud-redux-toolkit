import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/slice";

// creando un middleware para el localstorage
const persistentMiddleware = (store) => (next) => (action) => {
	next(action);
	localStorage.setItem("__redux_state__", JSON.stringify(store.getState()));
};

// configurando la store
export const store = configureStore({
	reducer: {
		users: userReducer,
	},
	middleware: [persistentMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
