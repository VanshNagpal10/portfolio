import { notFound } from "next/navigation";
import Portfolio, { type PortfolioPage } from "../../components/Portfolio";

export const dynamic = "force-dynamic";

const pages = ["projects", "experience", "honors", "about", "contact"] as const;

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (!pages.includes(page as (typeof pages)[number])) notFound();
  return <Portfolio page={page as PortfolioPage} />;
}
