"use client"

import Link from "next/link"
import { Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import UserItem from "./UserItem"
import Cookies from "js-cookie"
import { useQuery } from "@tanstack/react-query"
import { getProfile } from "@/lib/api/UserApi"

export function Header() {
  const token = Cookies.get("access_token") || Cookies.get("token")

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getProfile,
    retry: false,
    enabled: Boolean(token),
  })

  const isAuthenticated = Boolean(token) && Boolean(data?.data) && !isError

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <Plane className="size-6 rotate-45" />
          <span>Vocation</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link href="/promos" className="hover:text-indigo-600 transition-colors">Promos</Link>
          <Link href="/my-bookings" className="hover:text-indigo-600 transition-colors">My Bookings</Link>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <UserItem />
          ) : isLoading ? null : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-slate-600 hover:text-indigo-600">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-indigo-600 hover:bg-indigo-700">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}