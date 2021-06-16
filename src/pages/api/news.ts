import type { NextApiRequest, NextApiResponse } from "next";
import { NewsItem } from "pages/types";
import { readFile } from "fs/promises";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const tags = getTags(req.query["tags"]);

  readFile("./src/store/news.json", { encoding: "utf8" })
    .then((json) => {
      let result: NewsItem[] = JSON.parse(json);

      if (tags) {
        const callBackSome = (t: string) => tags.includes(t); // ['hot']
        const callBackFilter = (x: NewsItem) => x.tags.some(callBackSome);
        result = result.filter(callBackFilter);
      }

      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(JSON.stringify([err]));
    });
};

export function getTags(input: string | string[]): string[] {
  if (typeof input === "string") return [input];
  return input;
}
