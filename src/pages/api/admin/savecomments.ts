import type { NextApiRequest, NextApiResponse } from "next";
import db from "db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  db.comments.update({_id: req.body.id}, {value: req.body.comment},{
    upsert: true,
  });
  res.status(200).json({});
};
