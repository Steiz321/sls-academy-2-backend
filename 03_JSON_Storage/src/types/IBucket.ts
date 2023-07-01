import { Document } from "mongoose";

export interface IBucket extends Document  {
    _id?: string;
    bucketName: string;
    jsons: any[];
}
