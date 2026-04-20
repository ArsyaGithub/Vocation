"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // State awal diambil dari URL agar input tetap sinkron setelah reload
    const [origin, setOrigin] = useState(searchParams.get("origin") || "")
    const [destination, setDestination] = useState(searchParams.get("destination") || "")
    const [date, setDate] = useState(searchParams.get("date") || "")

    const handleSearch = () => {
        const params = new URLSearchParams()
        if (origin) params.set("origin", origin.toUpperCase())
        if (destination) params.set("destination", destination.toUpperCase())
        if (date) params.set("date", date)

        // Navigasi ke URL dengan query params (misal: ?origin=KMJ&destination=NYK)
        router.push(`/flights?${params.toString()}`)
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-10 flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
                <label className="text-xs font-bold text-slate-500 uppercase">From (Airport Code)</label>
                <Input
                    placeholder="e.g. KMJ"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="mt-1"
                />
            </div>
            <div className="flex-1 min-w-[200px]">
                <label className="text-xs font-bold text-slate-500 uppercase">To (Airport Code)</label>
                <Input
                    placeholder="e.g. NYK"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="mt-1"
                />
            </div>
            <div className="flex-1 min-w-[200px]">
                <label className="text-xs font-bold text-slate-500 uppercase">Date</label>
                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1"
                />
            </div>
            <Button onClick={handleSearch} className="bg-indigo-600 h-11 px-8">
                <Search className="mr-2 size-4" /> Search
            </Button>
        </div>
    )
}