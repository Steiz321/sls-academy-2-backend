import {Document} from "mongoose";

export interface ILink extends Document {
    _id?: string;
    originalUrl: string;
    shortedUrl: string;
}
