"use client";

import { FormEvent, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	categoryId: string;
};

type SearchResponse = {
	data: Product[];
	pagination: { page: number; limit: number; total: number };
};

const PAGE_SIZE = 20;

function ProductCard({ product }: { product: Product }) {
	return (
		<article className="flex min-h-44 flex-col justify-between rounded-xl border bg-card p-5 shadow-sm">
			<div>
				<p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
					{product.categoryId}
				</p>
				<h2 className="text-lg font-semibold">{product.name}</h2>
				<p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
					{product.description}
				</p>
			</div>
			<p className="mt-5 text-lg font-semibold">${product.price.toFixed(2)}</p>
		</article>
	);
}

function ProductGrid({ products }: { products: Product[] }) {
	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}

function Pagination({
	page,
	total,
	onChange,
}: {
	page: number;
	total: number;
	onChange: (page: number) => void;
}) {
	const pageCount = Math.ceil(total / PAGE_SIZE);

	if (pageCount < 2) return null;

	return (
		<nav aria-label="Product results pages" className="flex items-center justify-center gap-3">
			<Button
				aria-label="Previous page"
				disabled={page === 1}
				onClick={() => onChange(page - 1)}
				size="icon"
				type="button"
				variant="outline"
			>
				<ChevronLeft />
			</Button>
			<span className="text-sm text-muted-foreground">
				Page {page} of {pageCount}
			</span>
			<Button
				aria-label="Next page"
				disabled={page === pageCount}
				onClick={() => onChange(page + 1)}
				size="icon"
				type="button"
				variant="outline"
			>
				<ChevronRight />
			</Button>
		</nav>
	);
}

function ProductSearch() {
	const [input, setInput] = useState("");
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [result, setResult] = useState<SearchResponse | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const timeout = window.setTimeout(() => {
			setPage(1);
			setQuery(input.trim());
		}, 300);

		return () => window.clearTimeout(timeout);
	}, [input]);

	useEffect(() => {
		const controller = new AbortController();
		const params = new URLSearchParams({ query, page: String(page), limit: String(PAGE_SIZE) });

		fetch(`/api/products?${params}`, { signal: controller.signal })
			.then(async (response) => {
				if (!response.ok) throw new Error("Unable to load products");
				return (await response.json()) as SearchResponse;
			})
			.then(setResult)
			.catch((requestError: Error) => {
				if (requestError.name !== "AbortError") setError(requestError.message);
			})
			.finally(() => {
				if (!controller.signal.aborted) setIsLoading(false);
			});

		return () => controller.abort();
	}, [query, page]);

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
		setError(null);
		setQuery(input.trim());
		setPage(1);
	}

	return (
		<main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-12 lg:px-8">
			<header className="mb-10 max-w-2xl">
				<p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
					Marketplace
				</p>
				<h1 className="text-4xl font-semibold tracking-tight">Find your next thing.</h1>
				<p className="mt-3 text-muted-foreground">Search products by name and browse the latest listings.</p>
			</header>

			<form className="mb-10 flex max-w-2xl gap-2" onSubmit={handleSubmit}>
				<label className="sr-only" htmlFor="product-search">Search products by name</label>
				<div className="relative flex-1">
					<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						className="h-10 pl-9"
						id="product-search"
						onChange={(event) => {
							setInput(event.target.value);
							setIsLoading(true);
							setError(null);
						}}
						placeholder="Search products..."
						type="search"
						value={input}
					/>
				</div>
				<Button className="h-10" type="submit">Search</Button>
			</form>

			{isLoading && (
				<p aria-live="polite" className="py-16 text-center text-muted-foreground">Loading products...</p>
			)}
			{!isLoading && error && (
				<p aria-live="assertive" className="py-16 text-center text-destructive">{error}</p>
			)}
			{!isLoading && !error && result && result.data.length === 0 && (
				<p className="py-16 text-center text-muted-foreground">
					{query ? `No products found for “${query}”.` : "No products are available yet."}
				</p>
			)}
			{!isLoading && !error && result && result.data.length > 0 && (
				<>
					<ProductGrid products={result.data} />
					<div className="mt-10">
						<Pagination page={page} total={result.pagination.total} onChange={setPage} />
					</div>
				</>
			)}
		</main>
	);
}

export default ProductSearch;
