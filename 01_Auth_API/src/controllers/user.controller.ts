import {NextFunction, Request, Response} from "express";

class UserController {
    async getUserInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const {id, email} = req.user;
            return res.status(200).send({
                success: true,
                data: {
                    id,
                    email
                }
            });
        } catch (err) {
            return res.status(500).send(err)
        }
    }
}

const userController = new UserController();
export default userController;
