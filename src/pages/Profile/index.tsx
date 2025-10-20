"use client";
import { useTranslation } from "react-i18next";
import { blogs } from "./blogs";
import { ProfileCarasoul, ProfileCard } from "../../components/Card/ProfileCard";

export function ProfilePage() {
  const { i18n } = useTranslation();
  const loggedIn=false
  
  const cards = blogs.map((blog, index) => (
    <ProfileCard
      key={index}
      card={{
        ...blog,
        title: blog.title[i18n.language] || blog.title.en,
        category: blog.category[i18n.language] || blog.category.en,
        // Pass the content as a function that receives the translation function
      }}
      index={index}
    />
  ));

  return (
    <div className="overflow-auto max-h-screen ">
        <ProfileCarasoul items={cards} loggedIn={loggedIn} />
    </div>
  );
}

export default ProfilePage;