import { Search, Filter, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InputGroupInput } from "@/components/ui/input-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { FlightList } from "@/components/FlightList" // Import komponen baru
import { getFlights, getFlightsSearch } from "@/lib/api/FlightApi"
import { SortSelect } from "@/components/Sorting"

interface FlightPageProps {
  searchParams: Promise<{
    origin?: string;
    destination?: string;
    date?: string;
    page?: string;
    sort_by?: string;
    order?: string;
  }>
}

async function FlightPage({ searchParams }: FlightPageProps) {
  // 1. Await searchParams terlebih dahulu (Wajib di Next.js 15)
  const resolvedParams = await searchParams;

  // 2. Susun objek filters menggunakan data dari resolvedParams
  const filters = {
    origin: resolvedParams.origin || "",
    destination: resolvedParams.destination || "",
    date: resolvedParams.date || "",
    page: Number(resolvedParams.page) || 1, // Pastikan jadi number
    limit: 5,
    sort_by: resolvedParams.sort_by || "flight_classes.price",
    order: resolvedParams.order || "asc",
  };

  // 3. Panggil API (Logic diperbaiki agar tidak double ternary)
  // Sekarang kita cukup panggil satu fungsi karena getFlights sudah handle semua param
  const initialFlights = await getFlights(filters);

  return (
    <div className="container mx-auto py-10 px-4">
      <form className="bg-white p-6 rounded-xl shadow-sm border mb-10 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-50">
          <label className="text-xs font-bold text-slate-500 uppercase">From</label>
          <InputGroupInput name="origin" defaultValue={resolvedParams.origin} placeholder="Origin Airport" className="mt-1" />
        </div>
        <div className="flex-1 min-w-50">
          <label className="text-xs font-bold text-slate-500 uppercase">To</label>
          <InputGroupInput name="destination" defaultValue={resolvedParams.destination} placeholder="Destination Airport" className="mt-1" />
        </div>
        <div className="flex-1 min-w-50">
          <label className="text-xs font-bold text-slate-500 uppercase">Date</label>
          <InputGroupInput type="date" name="date" defaultValue={resolvedParams.date} className="mt-1" />
        </div>
        <Button type="submit" className="bg-indigo-600 h-11 px-8">
          <Search className="mr-2 size-4" /> Search
        </Button>
      </form>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="hidden md:block w-64 space-y-8">
          <div>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Filter className="size-4" /> Filters
            </h3>
            <div className="space-y-4 mb-6">
              <p className="text-sm font-semibold text-slate-700">Airlines</p>
              <div className="space-y-2">
                {["Garuda Indonesia", "AirAsia", "Lion Air"].map((airline) => (
                  <div key={airline} className="flex items-center space-x-2">
                    <Checkbox id={airline} />
                    <label htmlFor={airline} className="text-sm text-slate-600 cursor-pointer">
                      {airline} [cite: 10]
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <p className="text-sm font-semibold text-slate-700">Price Range</p>
              <Slider defaultValue={[500000]} max={5000000} step={100000} />
              <div className="flex justify-between text-xs text-slate-500">
                <span>Rp 500rb</span>
                <span>Rp 5jt [cite: 51]</span>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-slate-700">Class</p>
              <div className="space-y-2">
                {["Economy", "Business", "First"].map((cls) => (
                  <div key={cls} className="flex items-center space-x-2">
                    <Checkbox id={cls} />
                    <Label htmlFor={cls} className="font-normal">{cls} [cite: 47]</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 mt-6">
              <Button variant="outline" className="w-full">Reset Filters</Button>
            </div>
            <div className="space-y-4 mt-6">
              <Button variant="default" className="w-full">Apply Filters</Button>
            </div>
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Showing {initialFlights.meta?.total || 0} Flights</h1>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="size-4 text-slate-400" />
              <SortSelect /> {/* Pakai komponen yang kita buat tadi */}
            </div>
          </div>
          <FlightList initialData={initialFlights} searchParams={resolvedParams} />
        </main>
      </div>
    </div>
  )
}



export default FlightPage

