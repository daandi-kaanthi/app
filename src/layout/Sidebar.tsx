"use client";
import { useState } from "react";

import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/Sidebar";
import { cn } from "../lib/utils";
import { BookAudio, LayoutDashboardIcon, LogOut, Settings, User2Icon } from "lucide-react";
import HomePage from "../pages/HomePage";
import ThemeToggle from "./ThemeToggle";
import LanguageDropdown from "./languageSelector";
import HomeLogo from "./Logo";

export function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <LayoutDashboardIcon className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Blogs",
      href: "/blogs",
      icon: (
        <BookAudio className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
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
  return (
    <div
      className={cn(
        "mx-auto flex w-full  flex-1 flex-col overflow-hidden border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-[100vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? (
              <HomeLogo />
            ) : (
              <img
                src="logonobg.png"
                className="h-8 w-18 dark:filter dark:brightness-0 dark:invert"
              />
            )}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
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
            />
          </div>
        </SidebarBody>
        <Dashboard />
      </Sidebar>
    </div>
  );
}

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col  border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900">
        <HomePage />
      </div>
    </div>
  );
};
