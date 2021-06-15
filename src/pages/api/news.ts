import type { NextApiRequest, NextApiResponse } from "next";
import { NewsData } from "store/news";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const tags = getTags(req.query["tags"]);

  let result = NewsData;

  if (tags) {
    result = result.filter((x) => x.tags.some(t => tags.includes(t)));
  }

  res.status(200).json(result);
};

export function getTags(input: string | string[]): string[] {
  if (typeof input === 'string') return [input];
  return input;
}
