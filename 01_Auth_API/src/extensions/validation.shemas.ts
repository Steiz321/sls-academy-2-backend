import {body} from "express-validator";


export const signValidationSchema = [
    body('email').exists({checkFalsy: true}).isEmail(),
    body('password').exists({checkFalsy: true})
];

