import { z } from "zod";
import { NextResponse } from "next/server";

import { prisma } from "@/src/shared/lib/prisma";

const searchParamsSchema = z.object({
  query: z.string().trim().max(100).default(""),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(20).default(20),
});

export async function GET(request: Request) {
  const params = Object.fromEntries(new URL(request.url).searchParams);
  const parsedParams = searchParamsSchema.safeParse(params);

  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid search parameters" }, { status: 400 });
  }

  const { query, page, limit } = parsedParams.data;
  const where = query
    ? { name: { contains: query, mode: "insensitive" as const } }
    : undefined;

  try {
    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          categoryId: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      data: products.map((product) => ({ ...product, price: Number(product.price) })),
      pagination: { page, limit, total },
    });
  } catch {
    return NextResponse.json({ error: "Unable to search products" }, { status: 500 });
  }
}