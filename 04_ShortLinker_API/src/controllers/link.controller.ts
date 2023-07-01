import {NextFunction, Request, Response} from "express";
import linkService from "../services/link.service";


class LinkController {
    async createLink(req: Request, res: Response, next: NextFunction) {
        try {
            const reqLink = req.protocol + '://' + req.get('host');
            const {link} = req.body;

            const createdLink = await linkService.createLink(link, reqLink);

            return res.status(200).json({createdLink});
        } catch (err) {
            next(err);
        }
    }

    async getLink(req: Request, res: Response, next: NextFunction) {
        try {
            const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

            const originalLink = await linkService.getLink(fullUrl);

            res.status(300).redirect(originalLink);
        } catch (err) {
            next(err)
        }
    }
}

const linkController = new LinkController();
export default linkController;
