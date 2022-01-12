import { clientes } from "../mock"

export default function handler(req, res) {
    res.status(200).json(clientes)
}
