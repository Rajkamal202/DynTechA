"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithAuthComponent(props: P) {
    const router = useRouter()
    const isAuthenticated = useSelector((state: RootState) => !!state.auth.token)

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login")
      }
    }, [isAuthenticated, router])

    if (!isAuthenticated) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}


