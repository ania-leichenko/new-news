import db from "@/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const tags = getTags(req.query["tags"]);
  let result = db.news.find();

  result = result.map((item) => ({ ...item, id: item._id }));
  if (tags) {
    result = result.filter((x) => x.tags.some((t) => tags.includes(t)));
  }

  res.status(200).json(result);
};

export function getTags(input: string | string[]): string[] {
  if (typeof input === "string") return [input];
  return input;
}
