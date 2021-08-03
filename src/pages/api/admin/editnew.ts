import type { NextApiRequest, NextApiResponse } from "next";
import db from "db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let id = req.query.id;
  let item = db.news.findOne({ _id: id });
  res.status(200).json(item);
};