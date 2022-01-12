export default function handler(req, res) {
  if (req.method === 'GET') {
    const data = {
      "id": 2,
      "userName": "Shop2",
      "shopId": 2,
      "userRoles": [
        {
          "role": {
            "id": 2,
            "name": "loja"
          }
        }
      ]
    }
    res.status(200).json(data)
  }
}