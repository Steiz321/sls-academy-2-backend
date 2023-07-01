import {Schema, model, Model} from "mongoose";
import {IJson} from "../types/IJson";


const JsonSchema: Schema<IJson> = new Schema({
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
        unique: true
    }
})

const Json: Model<IJson> = model('Json', JsonSchema);
export default Json;
