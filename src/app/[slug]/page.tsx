import Header from "@/components/header";
import formatDate from "@/lib/formatDate";
import { Metadata } from "next";
import { getDocumentBySlug, getDocumentSlugs, load } from "outstatic/server";

interface Params {
  params: {
    slug: string;
  };
}

export async function generateMetadata(params: Params): Promise<Metadata> {
  const { doc } = await getData(params);

  if (!doc) {
    return {};
  }

  return {
    title: `${doc.title} - HireQuotient`,
    description: doc.description,
    openGraph: {
      title: `${doc.title} - HireQuotient`,
      description: doc.description,
      type: "article",
      url: `https://docs.hirequotient.com/${doc.slug}`,
      images: [
        {
          url: "https://outstatic.com/images/og-image.png",
          width: 1200,
          height: 630,
          alt: doc.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: "https://outstatic.com/images/og-image.png",
    },
  };
}

export default async function Post(params: Params) {
  const { doc, menu } = await getData(params);

  return (
    <>
      <Header />
      <div className="bg-background flex w-full">
        <SidebarNav content={menu.content} />
        <div className="w-full ml-0 md:ml-6 px-4 lg:px-6 xl:px-8 py-12 max-w-[1400px] overflow-x-scroll lg:overflow-x-auto">
          <article className="mb-32 w-full">
            <h1 className="font-primary text-2xl font-bold md:text-4xl mb-2">
              {doc.title}
            </h1>
            <div className="hidden md:block md:mb-12 text-slate-700 dark:text-slate-400">
              Last updated on{" "}
              <time dateTime={doc.publishedAt}>
                {formatDate(doc.publishedAt)}
              </time>
            </div>
            <hr className="border-neutral-200 mt-2 mb-2" />
            <div className="w-full prose prose-outstatic max-w-none">
              <MDXComponent content={doc.content} />
            </div>
          </article>
        </div>
      </div>
      <MobileMenu content={menu.content} />
    </>
  );
}

import MDXComponent from "@/components/mdx/mdx-component";
import { MobileMenu } from "@/components/mobile-menu";
import { SidebarNav } from "@/components/sidebar-nav";
import MDXServer from "@/lib/mdx-server";

async function getData({ params }: Params) {
  const db = await load();

  const doc = await db
    .find({ collection: "docs", slug: params.slug }, [
      "title",
      "publishedAt",
      "slug",
      "author",
      "content",
      "coverImage",
    ])
    .first();

  const menu = getDocumentBySlug("menus", "docs-menu", ["content"]);

  const docMdx = await MDXServer(doc?.content);

  const menuMdx = menu ? await MDXServer(menu?.content) : "";

  return {
    doc: {
      ...doc,
      content: docMdx,
    },
    menu: {
      content: menuMdx,
    },
  };
}

export async function generateStaticParams() {
  const posts = getDocumentSlugs("docs");
  return posts.map((slug) => ({ slug }));
}
