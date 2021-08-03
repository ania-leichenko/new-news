import type { NextApiRequest, NextApiResponse } from "next";
import db from "db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  db.comments.remove({_id: req.body.id}, false)
  res.status(200).json({});
};