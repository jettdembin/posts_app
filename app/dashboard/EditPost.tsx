"use client";
import { useState } from "react";
import Image from "next/image";
import Toggle from "./Toggle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

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
	const queryClient = useQueryClient();
	let deleteToastId: string;

	//delete post
	const { mutate } = useMutation(
		async (id: string) =>
			await axios.delete(`/api/posts/deletePost`, { data: id }),
		{
			onError: (error) => {
				console.log(error);
				toast.error("Error deleting that post", { id: deleteToastId });
			},
			onSuccess: (data) => {
				console.log(data);
				queryClient.invalidateQueries("getAuthPosts");
				deleteToastId = toast.success("Post has been deleted.", {
					id: deleteToastId,
				});
			},
		}
	);

	const deletePost = () => {
		deleteToastId = toast.loading("Deleting your post", {
			id: deleteToastId,
		});
		mutate(id);
	};
	return (
		<>
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
			{toggle && <Toggle setToggle={setToggle} deletePost={deletePost} />}
		</>
	);
}
