"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

interface Props {
	children?: ReactNode;
}

const QueryWrapper = ({ children }: Props) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default QueryWrapper;
