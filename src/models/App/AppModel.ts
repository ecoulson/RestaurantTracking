import { model } from "mongoose";
import IApp from "./IApp";
import IAppModel from "./IAppModel";
import AppSchema from "./AppSchema";

export default model<IApp, IAppModel>("App", AppSchema)