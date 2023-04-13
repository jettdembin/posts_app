import prisma from "../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		try {
			console.log(req.query);
			const data = await prisma.post.findUnique({
				where: {
					id: req.query.details,
				},
				include: {
					user: true,
					comments: {
						orderBy: {
							createdAt: "desc",
						},
						include: {
							user: true,
						},
					},
				},
			});
			return res.status(200).json(data);
		} catch (err) {}
	}
}
