import { Document } from "mongoose";

export interface IJson extends Document  {
    _id?: string;
    fileName: string;
    filePath: string;
}
