import { model } from "mongoose";
import IToken from "./IToken";
import ITokenModel from "./ITokenModel";
import TokenSchema from "./TokenSchema";

export default model<IToken, ITokenModel>("Token", TokenSchema);