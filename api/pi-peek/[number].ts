import type { VercelRequest, VercelResponse } from "@vercel/node"
import { readFileSync } from "fs"
import path from "path"

const FILE = "pi-million.txt"
const PATH = path.join(process.cwd(), "api", "pi-peek", FILE)
const RANGE = 5

const pi = readFileSync(PATH, "utf-8")

export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const number = request.query.number as string
  const index = pi.indexOf(number)
  if (index < 0) {
    response.status(200).send({
      index: -1,
      before: "",
      between: "",
      after: pi.slice(0, RANGE),
    })
    return
  }

  response.status(200).send({
    index: index == 0 ? index : index - 1,
    before: pi.slice(index - RANGE < 0 ? 0 : index - RANGE, index),
    between: number,
    after: pi.slice(index + number.length, index + number.length + RANGE),
  })
}