"use client";

// import EditPost from "./EditPost";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "../types/AuthPosts";

const fetchAuthPosts = async () => {
	const response = await axios.get("/api/posts/authPosts");
	// debugger;
	return response.data;
};

export default function MyPosts(): JSX.Element {
	const { data, isLoading } = useQuery<AuthPosts>(
		["auth-posts"],
		fetchAuthPosts
	);
	if (isLoading) return <h1>Posts are loading...</h1>;
	if (data) console.log(data);
	return (
		<div>
			{data?.posts?.map((post) => (
				// <EditPost

				<>test</>
			))}
		</div>
	);
}
