import type { NextApiRequest, NextApiResponse } from "next";
import pinataSDK from "@pinata/sdk";

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);

export default async function handler(
  req: NextApiRequest,
  { params }: { params: { hash: string } },
  res: NextApiResponse
) {
  const hash = params.hash;
  try {
    const response = await fetch(`${process.env.IPFS_URL}/${hash}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let result;
    try {
      result = await response.json();
    } catch (error) {
      throw new Error("Error parsing JSON!");
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
}
