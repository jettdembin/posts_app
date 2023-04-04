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
}: EditProps) {}
