import type { NextApiRequest, NextApiResponse } from "next";
import pinataSDK from "@pinata/sdk";

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const contentType = req.headers["content-type"];
  if (req.method === "POST" && contentType === "application/json") {
    try {
      const response = await pinata.pinJSONToIPFS(req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).send("Error uploading json to IPFS");
    }
  } else {
    res.status(400).send("Invalid request");
  }
}
