
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarMenuBadge,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { BrainCircuit, LayoutDashboard, School, MessageSquare, Settings, LogOut, PanelLeft, Bell, BarChart, PlusCircle, Shield } from 'lucide-react';
import { UserNav } from './user-nav';
import { logout } from '@/app/actions';

const mainNavItems = [
  { href: '/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
  { href: '/performance', icon: <BarChart />, label: 'Performance' },
  { href: '/tutor', icon: <MessageSquare />, label: 'AI Tutor' },
];

const classroomNavItems = [
    { href: '/classroom', icon: <School />, label: 'All Lessons' },
    { href: '/classroom/generate', icon: <PlusCircle />, label: 'Generate Course', isPro: true },
];

const adminNavItems = [
    { href: '/admin/users', icon: <Shield />, label: 'User Management' },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminSection = pathname.startsWith('/admin');

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent>
            <SidebarHeader className="p-4">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <BrainCircuit className="h-8 w-8 text-sidebar-primary" />
                    <span className="text-lg font-semibold text-white group-data-[collapsible=icon]:hidden">FluentMind</span>
                </Link>
            </SidebarHeader>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label, side: 'right' }}
                  >
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarGroup>
                <SidebarGroupLabel>Classroom</SidebarGroupLabel>
                <SidebarMenu>
                    {classroomNavItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === item.href}
                                tooltip={{ children: item.label, side: 'right' }}
                            >
                                <Link href={item.href}>
                                {item.icon}
                                <span>{item.label}</span>
                                {item.isPro && <SidebarMenuBadge>Pro</SidebarMenuBadge>}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
            {isAdminSection && (
                 <SidebarGroup>
                    <SidebarGroupLabel>Admin</SidebarGroupLabel>
                    <SidebarMenu>
                        {adminNavItems.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname.startsWith(item.href)}
                                    tooltip={{ children: item.label, side: 'right' }}
                                >
                                    <Link href={item.href}>
                                    {item.icon}
                                    <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            )}
          </SidebarContent>
          <SidebarFooter className="p-4 flex flex-col gap-2">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={{ children: 'Settings', side: 'right' }}>
                        <Link href="/account">
                            <Settings />
                            <span>Settings</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => logout()} 
                      asChild 
                      tooltip={{ children: 'Logout', side: 'right' }}
                    >
                        <Link href="#">
                            <LogOut />
                            <span>Logout</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1">
          <SidebarInset>
            <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
              <SidebarTrigger className="md:hidden">
                <PanelLeft className="h-6 w-6" />
                <span className="sr-only">Toggle Sidebar</span>
              </SidebarTrigger>
              <div className="flex-1">
                {/* Optional: Add page title here */}
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
                <UserNav />
              </div>
            </header>
            <main className="flex-1 p-4 sm:p-6">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
