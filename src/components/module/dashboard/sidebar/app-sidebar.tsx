"use client";

import * as React from "react";
import {
  Bot,
  SquareTerminal,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import Logo from "@/assets/svgs/Logo";

// ইউজারের রোল অনুযায়ী নেভিগেশন মেনু সেট করা
const getNavItems = (role: "tutor" | "student") => {
  if (role === "tutor") {
    return [
      {
        title: "Dashboard",
        url: "/tutor/dashboard",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "My Courses",
        url: "/tutor/courses",
        icon: Bot,
        items: [
          {
            title: "Manage Courses",
            url: "/tutor/courses/manage",
          },
          {
            title: "Students",
            url: "/tutor/students",
          },
        ],
      },
      {
        title: "Update Profile",
        url: "/tutor/update-profile",
        icon: User,
        isActive: true,
      },
    ];
  } else {
    return [
      {
        title: "Dashboard",
        url: "/student/dashboard",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "My Enrollments",
        url: "/student/enrollments",
        icon: Bot,
      },
    ];
  }
};

export function AppSidebar({ role, ...props }: { role: "tutor" | "student" } & React.ComponentProps<typeof Sidebar>) {
  const navMain = getNavItems(role);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  <Logo />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">TutorLink</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
