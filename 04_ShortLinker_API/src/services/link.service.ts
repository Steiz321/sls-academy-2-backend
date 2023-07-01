import crypto from 'crypto';
import Link from "../models/link";
import ApiError from "../extensions/api.error";
import {ILink} from "../types/ILink";

class LinkService {
    async createLink(link: string, reqLink: string): Promise<ILink> {
        const randomString = crypto.randomBytes(4).toString('hex');

        const shortedLink = reqLink + '/' + randomString;

        const createdLink = await Link.create({originalUrl: link, shortedUrl: shortedLink});

        return createdLink;
    }

    async getLink(fullLink: string): Promise<string> {
        const linkObj = await Link.findOne({shortedUrl: fullLink});
        if(!linkObj) {
            throw ApiError.BadRequest('Unknown url!');
        }

        const originalUrl = linkObj.originalUrl;

        return originalUrl;
    }
}

const linkService = new LinkService();
export default linkService
