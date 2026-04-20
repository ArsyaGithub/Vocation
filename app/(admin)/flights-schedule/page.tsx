import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, ChevronRight, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FlightsTableData } from "@/components/admin/FlightsTableData"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
export default function FlightSchedulePage() {
  return (
    <div className="p-5 space-y-4">
      <div className="flex flex-col space-y-2">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">Flights Schedule</span>
        </nav>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Flights Schedule Management</h2>
            <p className="text-muted-foreground">
              Monitor flights schedule for the flight booking system.
            </p>
          </div>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Add New Flight
          </Button>
        </div>
      </div>

      <Separator />


      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search flight number or city..." className="pl-8" />
            </div>
            {/* Filter Trigger bisa di sini */}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Flights</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="archived">Archived (Soft Deleted)</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <FlightsTableData />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}