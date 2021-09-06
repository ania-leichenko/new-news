import db from "@/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const tags = getTags(req.query["tags"]);
  const page: number = Number(req.query["page"]) || 1;
  let result = db.news.find();

  result = result.map((item) => ({ ...item, id: item._id }));
  if (tags.length) {
    result = result.filter((article) =>
      article.tags.some((tag) => tags.includes(tag))
    );
  }

  const count = result.length;

  let end = page * 6;
  let start = end - 6;
  // page = 1 -> 0, 6
  // page = 2 -> 6, 12
  // page = 3 -> 12, 18
  // page = 6 -> 30, 36
  result = result.slice(start, end);

  res.status(200).json(result);
};

export function getTags(input: string | string[]): string[] {
  if (!input) return [];
  if (typeof input === "string") return [input];
  return input;
}
