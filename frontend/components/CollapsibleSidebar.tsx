"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, LayoutDashboard, Users, Settings } from "lucide-react"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function CollapsibleSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen bg-[#1A1B1E] transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border/10">
        {!isCollapsed && <h2 className="text-lg font-semibold text-white">Menu</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-white/10"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 p-2">
          {sidebarNavItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <span
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10",
                  pathname === item.href ? "bg-white/10 text-white" : "transparent",
                  isCollapsed ? "justify-center" : "justify-start",
                )}
              >
                <item.icon className={cn("h-4 w-4", isCollapsed ? "mr-0" : "mr-2")} />
                {!isCollapsed && <span>{item.title}</span>}
              </span>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}

