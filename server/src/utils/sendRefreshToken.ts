import { Response } from "express"
import { ___prod___ } from "../constants"


export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie('qid',token,
{
    httpOnly:true,
    secure:___prod___
})}
