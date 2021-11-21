import axios from 'axios'

export default async function handler(req, res) {
  const { film } = req.body
  const sendSubscribe = await axios.get(
    `${process.env.NEXT_BASE_URL_API}/movies-list-get-title-contains/${film}`,
  )
  res.status(200).json(sendSubscribe.data)
}
