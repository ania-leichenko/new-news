import type { NextApiRequest, NextApiResponse } from "next";
import db from "db";
import { getSession } from "next-auth/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (session === null) {
    res.status(401).json({ error: "error" });
    return;
  }

  db.users.update({ email: session.user.email }, session.user, {
    upsert: true,
  });
  res.status(200).json(session);
};