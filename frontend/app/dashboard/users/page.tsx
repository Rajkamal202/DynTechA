import { AppBar } from "@/components/AppBar"
import { UserTable } from "@/components/UserTable"

export default function UsersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppBar />
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        </div>
        <UserTable />
      </main>
    </div>
  )
}

