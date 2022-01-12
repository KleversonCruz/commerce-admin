export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJTaG9wMiIsInJvbGUiOiJsb2phIiwibmJmIjoxNjQxOTQzNDYyLCJleHAiOjE2NDI1NDgyNjIsImlhdCI6MTY0MTk0MzQ2Mn0.r5XFp64pINcbwsdQmOLBlqU2Gx41o4IT3AHzYLvOEs4",
      "user": {
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
    }
    res.status(200).json(data)
  }
}