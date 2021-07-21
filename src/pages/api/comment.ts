import type { NextApiRequest, NextApiResponse } from "next";
import db from "db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const item = db.news.findOne({ _id: req.body.id });

  item.comments.push(req.body.comment);

  db.news.update({ _id: req.body.id }, { comments: item.comments });
  res.status(200).json({});
};