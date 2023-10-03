import type { NextApiRequest, NextApiResponse } from "next";
import pinataSDK from "@pinata/sdk";
import { Readable } from "stream";

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const contentType = req.headers["content-type"];
    if (contentType === "application/json") {
      try {
        const response = await pinata.pinJSONToIPFS(req.body);
        res.status(201).json({ response });
      } catch (error) {
        res.status(500).json({ message: "Error uploading json to IPFS" });
      }
    } else if (contentType?.startsWith("multipart/form-data")) {
      try {
        const data = await req.body;
        const file: File | null = data.get("file") as File;

        if (!file) {
          res.status(200).json({ success: false });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const response = await saveFile(buffer, file.name);

        res.status(201).json({ response });
      } catch (error) {
        res.status(500).json({ message: "Error uploading file to IPFS" });
      }
    } else {
      res.status(400).json({ message: "Invalid request" });
    }
  } else if (req.method === "GET") {
    const { hash } = req.query;
    res.status(200).json({ message: hash });
  } else {
    res.status(400).json({ message: "Bad Request" });
  }
}

const saveFile = async (buffer: Buffer, fileName: string) => {
  try {
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);

    const options = {
      pinataMetadata: {
        name: fileName,
      },
    };
    const response = await pinata.pinFileToIPFS(readable, options);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
