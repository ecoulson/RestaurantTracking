import { createStore } from "redux"
import AppReducers from "./reducers";

const store = createStore(AppReducers);

export default store;