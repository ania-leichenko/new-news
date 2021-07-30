import db from "@/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const result = db.comments.find();

  res.status(200).json(result);
};