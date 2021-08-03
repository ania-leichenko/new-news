import type { NextApiRequest, NextApiResponse } from "next";
import db from "db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body);
    db.news.update({_id: req.body.id}, {
        title: req.body.title, 
        description: req.body.description
    }, {
        upsert: true, 
    });
  res.status(200).json({});
};