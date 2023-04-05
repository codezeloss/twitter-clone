import { initMongoose } from "@/lib/mongoose";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  initMongoose();
  const session = await getServerSession(req, res, authOptions);
  const { bio, name, username } = req.body;
  User.findByIdAndUpdate(session.user.id, { bio, name, username });
  res.json("ok");
}
