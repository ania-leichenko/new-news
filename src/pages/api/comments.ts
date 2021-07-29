import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/db";
import { getSession } from "next-auth/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (session === null ) {
    res.status(401).json({ error: "Упсс..,вы кажись не зарегестрированы" });
    return;
  } else {
    db.comments.save({
      value: req.body.comment,
      articleId: req.body.id,
      userEmail: session.user.email,
      userImage: session.user.image,
    }) 
  }
  res.status(200).json({});
};