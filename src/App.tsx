"use client";
import React, { useEffect, useState, Suspense } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import {
  BookAudio,
  LayoutDashboardIcon,
  MapPin,
  User2Icon,
} from "lucide-react";

import { Sidebar, SidebarBody, SidebarLink } from "./components/ui/Sidebar";
import ThemeToggle from "./layout/ThemeToggle";
import LanguageDropdown from "./layout/languageSelector";
import HomeLogo from "./layout/Logo";
import { cn } from "./lib/utils";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import { PackageModal } from "./components/PackageModal";
import LoginButton from "./components/ui/Button/LoginButton";
import { LoaderOne } from "./components/ui/Text/Loader";

// ✅ Lazy load routes (code-splitting)
const HomePage = React.lazy(() => import("./pages/HomePage"));
const BlogsPage = React.lazy(() => import("./pages/BlogPage/BlogsPage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const ProfilePage = React.lazy(() => import("./pages/Profile"));

// Optional fallback loader
function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoaderOne />
    </div>
  );
}

export function App() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated } = useAuth0();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const langParam = searchParams.get("lang");
    if (langParam && ["en", "hi", "es", "mr"].includes(langParam)) {
      i18n.changeLanguage(langParam);
    }
  }, [searchParams, i18n]);

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
    {
      label: t("sidebar.profile", "My Profile"),
      href: "/profile",
      icon: (
        <>
          {isAuthenticated ? (
            <img
              src={user?.picture}
              alt="Profile"
              className="w-5 h-5 rounded-full border-2 border-muted-foreground"
            />
          ) : (
            <User2Icon className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
          )}
        </>
      ),
    },
  ];

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden md:flex-row"
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
                alt="Logo"
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
            <SidebarLink
              link={{
                label: "",
                href: "#",
                icon: <LoginButton showText={open ? true : false} />,
              }}
              shouldNavigate={false}
            />
          </div>
        </SidebarBody>

        {/* Routes */}
        <div className="flex flex-1">
          <div className="flex w-full flex-1 flex-col bg-white dark:bg-neutral-950 text-black dark:text-white">
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/package/:id/:title/:tab?" element={<HomePage />}>
                  <Route path="" element={<PackageModal />} />
                </Route>
                <Route path="*" element={<HomePage />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}

export default App;
