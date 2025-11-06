"use client";
import { PackageModal } from "./UserInquiries";
import {
  ProfileCarasoul,
  ProfileCard,
} from "../../components/Card/ProfileCard";
import { useAuth0 } from "@auth0/auth0-react";

export function AuthenticatedProfile() {
  const { user } = useAuth0();

  const cards = [
    { title: user?.email, category: "Email" },
    { title: user?.name, category: "Name" },
    { title: user?.nickname, category: "Username" },
  ];

  const items = cards.map((card, index) => (
    <ProfileCard key={index} card={card} index={index} layout />
  ));

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-4xl">
      {/* Profile Picture */}
      <img
        src={user?.picture}
        alt="Profile"
        className="w-16 h-16 rounded-full border-2 border-muted-foreground"
      />

      {/* Carousel */}
        <ProfileCarasoul items={items} initialScroll={0} />

      {/* Modal */}
      <PackageModal />
    </div>
  );
}
