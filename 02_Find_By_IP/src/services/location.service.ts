import ApiError from "../extensions/api.error";
import * as fs from "fs";
import csv from 'csv-parser';
import {ICSVData} from "../types/ICSVData";
import {ICountry} from "../types/ICountry";


class LocationService {
    async ConvertIpToDecimal(ip: string | string[] | null): Promise<number> {
        if(!ip) {
            throw ApiError.BadRequest('ip error');
        }
        let arr;
        if (typeof ip === "string") {
            arr = ip.split('.').map(el => Number(el));
        } else {
            arr = ip[0].split('.').map(el => Number(el));
        }
        const decimalIp = arr[0] * Math.pow(256, 3) + arr[1] * Math.pow(256, 2) + arr[2] * 256 + arr[3] * 1;
        return decimalIp;
    }

    async readCSVData(): Promise<ICSVData[]> {
        const results: ICSVData[] = [];

        await new Promise((resolve, reject) => {
            fs.createReadStream('./dist/files/IP2LOCATION-LITE-DB1.csv')
                .pipe(csv(['lower', 'upper', 'symbol', 'country']))
                .on('data', (data) => results.push(data))
                .on('end', resolve)
                .on('error', reject);
        })

        if(!results.length) {
            throw ApiError.BadRequest('read file error');
        }

        return results;
    }

    async checkCountry(ip: string | string[] | null): Promise<ICountry | null> {
        const decimalIp = await this.ConvertIpToDecimal(ip);
        const data = await this.readCSVData();

        for(let el of data) {
            if(Number(el.lower) <= decimalIp && Number(el.upper) >= decimalIp) {
                return {
                    symbol: el.symbol,
                    country: el.country
                }
            }
        }

        return null;

    }
}

const locationService = new LocationService();
export default locationService;
