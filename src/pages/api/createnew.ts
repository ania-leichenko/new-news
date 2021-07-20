import type { NextApiRequest, NextApiResponse } from "next";
import db from "db";
import { getSession } from "next-auth/client";
import { ADMINS } from "@/constants";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (session === null) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!ADMINS.includes(session.user.email)) {
    res.status(403).json({ error: "403" });
    return;
  }

  db.news.save({
    title: req.body.title,
    description: req.body.description,
    image: "/image/polaroid.jpg",
    tags: req.body.tags.split(","),
    comments: [],
  });
  res.status(200).json({});
};
