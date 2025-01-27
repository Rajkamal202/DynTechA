"use client"

import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { logout } from "@/lib/store/authSlice"
import type { AppDispatch } from "@/lib/store"

import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"

export function AppBar() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const handleLogout = () => {
    dispatch(logout())
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <h1 className="text-xl font-bold">User Management</h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            <UserNav onLogout={handleLogout} />
          </nav>
        </div>
      </div>
    </header>
  )
}

