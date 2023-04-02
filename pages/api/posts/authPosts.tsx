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

	if (req.method === "GET") {
		try {
			const data = await prisma.user.findUnique({
				where: {
					email: session.user.email,
				},
				include: {
					posts: {
						orderBy: {
							createdAt: "desc",
						},
						include: {
							comments: true,
						},
					},
				},
			});

			return res.status(200).json(data);
		} catch (err) {
			res.status(403).json({ err: "Error has occured while making a post" });
		}
	}
}
