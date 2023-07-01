import fileService from "./file.service";
import Bucket from "../models/bucket";
import Json from "../models/json";
import ApiError from "../extensions/api.error";
import {IBucket} from "../types/IBucket";
import {IJson} from "../types/IJson";

class JsonService {
   async putJson(bucketName: string, jsonName: string, data: any) {

       const stringData = JSON.stringify(data, null, 2);

       const jsonPath = await fileService.createJson(bucketName, jsonName, stringData)

       let existingBucket: any = await Bucket.findOne({bucketName});

       if(!existingBucket) {
           existingBucket = await Bucket.create({ bucketName, jsons: []})
       }

       let jsonFile: any = await Json.findOneAndUpdate({fileName: jsonName, filePath: jsonPath},{fileName: jsonName, filePath: jsonPath})
       if(!jsonFile) {
           jsonFile = await Json.create({fileName: jsonName, filePath: jsonPath});
       }

       if(!existingBucket.jsons.includes(jsonFile._id)) {
           await existingBucket.jsons.push(jsonFile._id);
           await existingBucket.save()
       }

       return data;
   }

   async getJson(bucketName: string, jsonName: string) {

       const bucket: IBucket | null = await Bucket.findOne({bucketName});
       if(!bucket) {
           throw ApiError.BadRequest('invalid bucket or file name');
       }

       const json: IJson | null = await Json.findOne({fileName: jsonName}).where('_id').in(bucket.jsons).exec();
       if(!json) {
           throw ApiError.BadRequest('invalid bucket or file name');
       }

       const jsonData = await fileService.getJsonData(json.filePath);

       return jsonData;

   }
}

const jsonService = new JsonService();
export default jsonService;
