import { Request, Response} from "express";
let counter = 0;
export const getCounterController = async (_: Request, res: Response): Promise<void> => {
    res.status(200).json({counter})
}

export const iterateCounterController = async (req: Request, res: Response): Promise<void> => {
    const { newCount } = req.body;
    console.log(newCount)
    counter = newCount;
    res.status(200).json({counter})
};