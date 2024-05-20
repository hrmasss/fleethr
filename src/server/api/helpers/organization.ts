import type { Prisma } from "@prisma/client";
import slugify from "slugify";

export const generateUniqueOrganizationSlug = async (
  db: Prisma.TransactionClient,
  organizationName: string,
) => {
  const slug = slugify(organizationName, { lower: true, strict: true });

  const existingSlug = await db.organization.findFirst({
    where: { slug },
    select: { slug: true },
  });

  if (!existingSlug) return slug;

  const existingSlugs = await db.organization.findMany({
    where: {
      slug: {
        startsWith: slug,
        not: slug,
      },
    },
    select: {
      slug: true,
    },
  });

  // Extract the numeric suffixes from the existing slugs
  const suffixes = existingSlugs
    .map((org) => {
      const match = org.slug.match(/^(.*?)-(\d+)$/);

      return match?.[2] ? parseInt(match[2], 10) : null;
    })
    .filter((suffix): suffix is number => suffix !== null)
    .sort((a, b) => b - a); // Sort in descending order

  // Find the next available suffix
  const nextSuffix = suffixes?.[0] ? suffixes[0] + 1 : 2;

  return `${slug}-${nextSuffix}`;
};
