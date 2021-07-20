import type { NextApiRequest, NextApiResponse } from "next";
import db from "db";
import { getSession } from "next-auth/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //   console.log(req.body);
  //   const item = {
  //     comments: [req.body.comment],
  //   };
  const item = db.news.findOne({ _id: req.body.id });

  item.comments.push(req.body.comment);

  db.news.update({ _id: req.body.id }, { comments: item.comments });
  res.status(200).json({});
};

// const arr = ["c", { name: "a" }, { name: "b" }];
// console.log(arr[1].name);
