import type { NextApiRequest, NextApiResponse } from "next";
import db from "db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  db.news.update({id: req.body.id}, {value: req.body.newItem},{
    upsert: true,
  });
  res.status(200).json({});
};