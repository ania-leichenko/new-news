import type { NextApiRequest, NextApiResponse } from "next";
import db from "db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body.id);
  db.comments.update({_id: req.body.id}, {value: req.body.comment},{
    upsert: true,
  });
  res.status(200).json({});
};
