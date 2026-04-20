// components/SortSelect.tsx
"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SortSelect() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Logika mapping ke API
    if (value === "cheapest") {
      params.set("sort_by", "flight_classes.price")
      params.set("order", "asc")
    } else if (value === "highest") {
      params.set("sort_by", "flight_classes.price")
      params.set("order", "desc")
    } else if (value === "earliest") {
      params.set("sort_by", "departure_time") // sesuaikan field API kamu
      params.set("order", "asc")
    } else if (value === "latest") {
      params.set("sort_by", "departure_time")
      params.set("order", "desc")
    }

    // Update URL, Next.js akan trigger server component untuk fetch ulang
    router.push(`?${params.toString()}`)
  }

  return (
    <Select onValueChange={handleSortChange} defaultValue="cheapest">
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="cheapest">Lowest Price</SelectItem>
        <SelectItem value="highest">Highest Price</SelectItem>
        <SelectItem value="earliest">Earliest Flight</SelectItem>
        <SelectItem value="latest">Latest Flight</SelectItem>
      </SelectContent>
    </Select>
  )
}