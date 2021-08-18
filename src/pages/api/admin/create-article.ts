import type { NextApiRequest, NextApiResponse } from "next";
import db from "db";
import { getSession } from "next-auth/client";
import { ADMINS } from "@/constants";
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (session === null) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!ADMINS.includes(session.user.email)) {
    res.status(403).json({ error: "403" });
    return;
  }
  
  const form = new formidable.IncomingForm();
  form.uploadDir = "./public/upload/";
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    const image =  files.newImg.path.replace("public\\upload\\", "/upload/");
    db.news.save({
      title: fields.title,
      description: fields.description,
      image,
      tags: fields.tags.split(","),
    });
  });  
  res.status(200).json({});
};