"use client";
import { useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import {
  BookAudio,
  LayoutDashboardIcon,
  MapPin,
} from "lucide-react";

import { Sidebar, SidebarBody, SidebarLink } from "./components/ui/Sidebar";
import ThemeToggle from "./layout/ThemeToggle";
import LanguageDropdown from "./layout/languageSelector";
import HomeLogo from "./layout/Logo";
import { cn } from "./lib/utils";

//pages
import BlogsPage from "./pages/BlogPage/BlogsPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import { useTranslation } from "react-i18next";
// import ProfilePage from "./pages/Profile";
import { PackageModal } from "./components/PackageModal";
import ProfilePage from "./pages/Profile";

export function App() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  const links = [
    {
      label: t("sidebar.dashboard", "Dashboard"),
      href: "/",
      icon: (
        <LayoutDashboardIcon className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: t("sidebar.blogs", "Blogs"),
      href: "/blogs",
      icon: (
        <BookAudio className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: t("sidebar.about", "About Us"),
      href: "/about",
      icon: (
        <MapPin className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    // {
    //   label: t("sidebar.profile", "My Profile"),
    //   href: "/profile",
    //   icon: (
    //     <User2Icon className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    //   ),
    // },
    // {
    //   label: "Settings",
    //   href: "#",
    //   icon: (
    //     <Settings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    //   ),
    // },
    // {
    //   label: "Logout",
    //   href: "#",
    //   icon: (
    //     <LogOut className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    //   ),
    // },
  ];

  const [open, setOpen] = useState(false);
  useEffect(() => {
    const langParam = searchParams.get("lang");
    if (langParam && ["en", "hi", "es", "mr"].includes(langParam)) {
      i18n.changeLanguage(langParam);
    }
  }, [searchParams, i18n]);

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden md:flex-row h-[100vh]"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 h-[100vh]">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? (
              <HomeLogo />
            ) : (
              <img
                src="/logonobg.png"
                className="h-8 w-18 dark:filter dark:brightness-0 dark:invert"
              />
            )}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} shouldNavigate={true} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "",
                href: "#",
                icon: (
                  <div className="flex items-center gap-6">
                    <ThemeToggle />
                    <LanguageDropdown />
                  </div>
                ),
              }}
              shouldNavigate={false}
            />
          </div>
        </SidebarBody>
        <div className="flex flex-1">
          <div className="flex  w-full flex-1 flex-col dark:bg-neutral-950 text-black dark:text-white ">
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/package/:id/:title/:tab?" element={<HomePage />}>
                <Route path="" element={<PackageModal />} />
              </Route>
              <Route path="*" element={<HomePage />} />
            </Routes>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}

export default App;
