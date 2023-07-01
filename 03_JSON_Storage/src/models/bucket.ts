import {Schema, model, Model} from "mongoose";
import {IBucket} from "../types/IBucket";


const bucketSchema: Schema<IBucket> = new Schema({
    bucketName: {
        type: String,
        required: true,
        unique: true
    },
    jsons: [{
        type: Schema.Types.ObjectId,
        ref: 'Json'
    }]

})

const Bucket: Model<IBucket> = model('Bucket', bucketSchema);
export default Bucket;
