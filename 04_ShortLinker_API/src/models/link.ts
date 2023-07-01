import {Schema, model, Model} from "mongoose";
import {ILink} from "../types/ILink";

const linkSchema: Schema<ILink> = new Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortedUrl: {
        type: String,
        required: true,
        unique: true
    }
})

const Link: Model<ILink> = model('Link', linkSchema);
export default Link;
