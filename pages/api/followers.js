import { initMongoose } from "@/lib/mongoose";
import Follower from "@/models/Follower";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export async function handler() {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);

  const { destination } = req.body;

  const existingFollow = await Follower.findOne({
    destination,
    source: session.user.id,
  });

  if (existingFollow) {
    await existingFollow.remove();
    res.json(null);
  } else {
    const f = await Follower.create({ destination, source: session.user.id });
    res.json(f);
  }
}
