"use client";
import { useState } from "react";
import Image from "next/image";

type EditProps = {
	id: string;
	avatar: string;
	name: string;
	title: string;
	comments?: {
		id: string;
		postId: string;
		userId: string;
	}[];
};

export default function EditPost({
	avatar,
	name,
	title,
	comments,
	id,
}: EditProps) {
	const [toggle, setToggle] = useState(false);
	return (
		<div className="bg-white my-8 p-8 rounded-lg">
			<div className="flex items-center gap-2">
				<Image width={32} height={32} src={avatar} alt="avatar" />
				<h3 className="font-bold text-gray-700">{name}</h3>
			</div>
			<div className="my-8 ">
				<p className="break-all">{title}</p>
			</div>
			<div className="flex items-center gap-4 ">
				<p className=" text-sm font-bold text-gray-700">
					{comments?.length} Comments
				</p>
				<button
					onClick={(e) => {
						e.stopPropagation();
						setToggle(true);
					}}
					className="text-sm font-bold text-red-500"
				>
					Delete
				</button>
			</div>
		</div>
	);
}
