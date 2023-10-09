import type { NextApiRequest, NextApiResponse } from "next";
import pinataSDK from "@pinata/sdk";
import formidable, { IncomingForm } from "formidable";
import fs from "fs";

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const contentType = req.headers["content-type"];
  if (req.method === "POST" && contentType?.startsWith("multipart/form-data")) {
    try {
      const form = new IncomingForm();
      form.parse(req, async function (err, fields, files) {
        if (err || files.file === undefined) {
          console.log({ err });
          return res.status(500).send("Upload Error");
        }
        const response = await saveFile(files.file[0]);
        return res.status(201).json(response);
      });
    } catch (e) {
      console.log(e);
      res.status(500).send("Error uploading file to IPFS");
    }
  } else {
    res.status(400).send("Invalid request");
  }
}

const saveFile = async (file: formidable.File) => {
  try {
    const stream = fs.createReadStream(file.filepath);
    const options = {
      pinataMetadata: {
        name: file.originalFilename,
      },
    };
    const response = await pinata.pinFileToIPFS(stream, options);
    fs.unlinkSync(file.filepath);

    return response;
  } catch (error) {
    throw error;
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
