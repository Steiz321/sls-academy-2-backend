import * as fs from 'fs';
import * as path from 'path';
import ApiError from "../extensions/api.error";

const fileExtension = 'json';

class FileService {
    async createJson(bucketName: string, jsonName: string, data: string) {
        try {
            const fileName = jsonName + '.' + fileExtension;
            const filePath = path.resolve(__dirname, '..', 'storage', bucketName);

            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
            }

            fs.writeFileSync(path.resolve(filePath, fileName), data);
            const returnData = 'storage' + '/' + bucketName + '/' + jsonName + '.' + fileExtension;

            return returnData;
        } catch (err) {
            throw ApiError.BadRequest('file or folder creation error!');
        }
    }

    async getJsonData(jsonPath: string) {
        const filePath = path.resolve(__dirname, '..', jsonPath)

        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            const jsonData = JSON.parse(data);
            return jsonData;
        } catch (err) {
            throw ApiError.BadRequest('file reading error');
        }

    }
}

const fileService = new FileService();
export default fileService;
