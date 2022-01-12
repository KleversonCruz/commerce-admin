import { loja } from "../mock"

export default function handler(req, res) {
    if (req.method === 'GET') {
        
        res.status(200).json(loja)
    }
}