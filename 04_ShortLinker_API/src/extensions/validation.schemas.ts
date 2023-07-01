import {body} from "express-validator";


export const linkValidationSchema = [
    body('link').isURL(),
];
