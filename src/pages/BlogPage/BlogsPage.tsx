"use client";
import { useTranslation } from "react-i18next";
import { Card, Carousel } from "../../components/Card/BlogCard";
import { blogs } from "./blogs";

export function BlogsPage() {
  const { i18n, t } = useTranslation();
  
  const cards = blogs.map((blog, index) => (
    <Card
      key={blog.src}
      card={{
        ...blog,
        title: blog.title[i18n.language] || blog.title.en,
        category: blog.category[i18n.language] || blog.category.en,
        // Pass the content as a function that receives the translation function
        content: blog.content(t),
      }}
      index={index}
    />
  ));

  return (
    <div className="w-full h-full py-20 z-5 space-y-2 overflow-auto h-screen ">
      <h2 className="max-w-7xl pl-4 mx-auto text-2xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        {t("blogs.heading", "Discover the Wonders of Uttarakhand")}
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

export default BlogsPage;