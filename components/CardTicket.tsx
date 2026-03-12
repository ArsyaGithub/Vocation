import Image from "next/image"
import { Plane } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Flight } from "@/lib/type/flight"
interface FlightCardProps {
  flight: Flight
}

export function CardTicket({ flight }: FlightCardProps) {
  const minPrice = Math.min(...flight.classes.map((c) => c.price))
  
  return (
    <div className="relative w-full max-w-95">

      <Card className="relative h-65 rounded-2xl overflow-hidden border-none shadow-lg">

        <Image
          src="/destination.jpg"
          alt="Destination"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">

          <div className="flex justify-between items-start">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium">
              {flight.flight_number}
            </span>

            <span className="text-sm font-semibold tracking-wide">
              {flight.origin.code} → {flight.destination.code}
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-bold">
              {flight.destination.city}
            </h3>
            <p className="text-sm text-white/80">
              {new Date(flight.departure_time).toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long"
              })}
            </p>
          </div>

        </div>
      </Card>

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[88%]">
        <Card className="rounded-2xl shadow-xl border border-slate-100">
          <Link href={`/flight/${flight.id}`}>
            <CardContent className="p-4 flex justify-between items-center">

              <div>
                <p className="text-xs text-slate-500 font-medium">
                  Mulai dari
                </p>
                <p className="text-xl font-bold text-slate-800">
                  Rp {minPrice.toLocaleString("id-ID")}
                </p>
              </div>

              <button className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition">
                <Plane className="size-4 rotate-45" />
              </button>

            </CardContent>
          </Link>

        </Card>
      </div>

    </div>
  )
}