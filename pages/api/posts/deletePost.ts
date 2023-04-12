import prisma from "../../../prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: "Please sign in" });
	}

	if (req.method === "DELETE") {
		try {
			const postId = req.body;
			const result = await prisma.post.delete({
				where: {
					id: postId,
				},
			});

			return res.status(200).json(result);
		} catch (err) {
			res.status(403).json({ err: "Error has occured while making a post" });
		}
	}
}
