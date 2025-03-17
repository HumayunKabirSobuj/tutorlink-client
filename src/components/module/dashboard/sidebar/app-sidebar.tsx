"use client";

import * as React from "react";
import {
  Bot,
  Pen,
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
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Manage Apply",
            url: "/tutor/manage-apply-tution",
          },
          {
            title: "Show All Students",
            url: "/tutor/students",
          },
          
        ],
      },
      {
        title: "My Tutions Posts",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Create Tution Post",
            url: "/tutor/create-tution-post",
          },
          {
            title: "Manage Tution Post",
            url: "/tutor/manage-tution-post",
          },
          
        ],
      },
      {
        title: "Blog Management",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Create Blog",
            url: "/tutor/create-blog",
          },
          {
            title: "Manage Blog",
            url: "/tutor/manage-blog",
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
        title: "My Applies",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Manage Apply",
            url: "/student/manage-apply",
          },
          
          
        ],
      },
      {
        title: "My Enrollments",
        url: "/student/enrollments",
        icon: Bot,
      },

      
      {
        title: "Add Need Tutor Post",
        url: "/student/add-need-tutor",
        icon: Pen,
      },
      {
        title: "Manage Need Tutor Post",
        url: "/student/manage-need-tutor",
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
