"use client"
import { 
  Plane, 
  Settings, 
  LayoutDashboard,
  LogOut,
  Building2,
  CalendarDays,
  MapPin,
  PlaneTakeoff,
  ReceiptText,
  Terminal,
  TicketPercent,
  UserCog
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

// 1. Kelompokkan menu agar lebih terorganisir
const menuGroups = [
  {
    label: "Main",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Flight Schedule", url: "/flights-schedule", icon: CalendarDays },
    ],
  },
  {
    label: "Flight Operations",
    items: [
      { title: "Flights Master", url: "/flights/manage", icon: PlaneTakeoff }, // Kelola flight_classes & seats [cite: 32, 52]
      { title: "Airlines", url: "/airlines", icon: Building2 }, // [cite: 9]
      { title: "Airports", url: "/airports", icon: MapPin }, // [cite: 11]
    ],
  },
  {
    label: "Sales & Marketing",
    items: [
      { title: "Transactions", url: "/transactions", icon: ReceiptText }, // [cite: 77]
      { title: "Promo Codes", url: "/promos", icon: TicketPercent }, // [cite: 82]
    ],
  },
  {
    label: "User Management",
    items: [
      { title: "User Access", url: "/users-monitoring", icon: UserCog }, // [cite: 4]
      { title: "Admin Tools", url: "/admin-tool", icon: Terminal }, // Untuk POST Seed & GET Test dari gambar
    ],
  },
  {
    label: "System",
    items: [
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname() // Untuk mendeteksi halaman aktif

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-200">
      <SidebarHeader className="py-4 border-b border-slate-300" >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <Plane className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-lg tracking-tight">Voca<span className="text-indigo-600">Admin</span></span>
                  <span className="text-[10px] text-slate-500 font-medium">Enterprise Suite</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>

        {menuGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-slate-400 font-bold px-4 py-2 uppercase text-[10px] tracking-widest">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        tooltip={item.title}
                        className={cn(
                          "transition-all duration-200 py-5",
                          isActive 
                            ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700 font-semibold" 
                            : "text-slate-600 hover:bg-slate-100"
                        )}
                      >
                        <Link href={item.url} className="flex items-center gap-3">
                          <item.icon className={cn("size-5", isActive ? "text-indigo-600" : "text-slate-400")} />
                          <span>{item.title}</span>
                          {isActive && (
                            <div className="ml-auto size-1.5 rounded-full bg-indigo-600" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-300 ">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5 leading-none">
           <p>Admin</p>
           <p>admin@gmail.com</p>
          </div>
          <Button variant="ghost" size="icon" className="group-data-collapsed:hidden">
            <LogOut />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}