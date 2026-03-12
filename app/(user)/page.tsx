import {
  Card,
  CardContent,
} from "@/components/ui/card"
import Image from "next/image"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { CardTicket } from "@/components/CardTicket"
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getFlights } from "@/lib/api/FlightApi"
import { ApiResponse, Flight } from "@/lib/type/flight";
async function SearchPage() {
  const flightsData = await getFlights()

  return (
    <div className="h-max p-10">
      {/* Top Section */}
      <section>
        <div className="relative max-w-4xl mx-auto">
          <Card className="relative h-105 border-none rounded-2xl">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Image
                src="/destination.jpg"
                alt="Destination"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 text-white z-10">
              <h1 className="text-4xl font-bold mb-4">
                Jelajahi Dunia Tanpa Batas
              </h1>
              <p className="max-w-lg text-white/90">
                Temukan destinasi terbaik dengan harga terbaik.
                Perjalanan impianmu dimulai dari sini.
              </p>
            </div>
          </Card>

          {/* Search Section */}
          <section>
            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-[90%] z-20">
              <Card className="shadow-2xl border-none rounded-2xl">
                <CardContent className="p-6 bg-white rounded-2xl text-black">
                  <InputGroup className="max-w-xs">
                    <InputGroupInput placeholder="Search..." />
                    <InputGroupAddon>
                      <Search />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
                  </InputGroup>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section>
        <div className="container mx-auto py-20 px-4">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl font-bold text-slate-900">Popular Destinations</h2>
            <p className="text-slate-500">Pick your favorite place and fly with SkyPass</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-6 justify-items-center">
            {flightsData.data.slice(0, 4).map((flight: Flight) => (
              <CardTicket key={flight.id} flight={flight} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="container mx-auto py-20 px-4">
        <div className="flex flex-col md:flex-row items-stretch gap-16">
          {/* Bagian Kiri: Gambar dengan Floating Cards */}
          <div className="w-full md:w-1/3 md:ml-20">
            <div className="relative group h-full">
              <Card className="relative h-full min-h-[500px] border-none rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/destination.jpg"
                  alt="Destination"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5" />
              </Card>

              <div className="absolute top-10 -left-25 bg-white p-4 rounded-2xl shadow-2xl z-20 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <span className="text-yellow-600 text-xl">⭐</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">4.9/5 Rating</p>
                    <p className="text-xs text-slate-500">dari 2,000+ Pengguna </p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2: Status (Tengah Kanan) */}
              <div className="absolute top-1/2 -right-20 -translate-y-1/2 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl z-20 hidden md:block border border-white/20">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Terpercaya</p>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                        U{i}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
                      +1k
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">Sudah memesan tiket hari ini</p>
                </div>
              </div>
              <div className="absolute top-90 -left-25 bg-white p-4 rounded-2xl shadow-2xl z-20 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <span className="text-yellow-600 text-xl">⭐</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">4.9/5 Rating</p>
                    <p className="text-xs text-slate-500">dari 2,000+ Pengguna </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-8 md:ml-30">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Mengapa Memilih Voca Plane?</h2>
              <p className="text-slate-500">Nikmati perjalanan udara dengan standar layanan terbaik[cite: 6].</p>
            </div>

            <div className="space-y-10">
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xl transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Temukan Destinasi Terbaik</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Pilih rute dari berbagai bandara internasional utama dengan kode IATA resmi[cite: 12].
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xl transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Transparansi Harga & Kelas</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Tersedia berbagai pilihan kelas mulai dari Economy, Business, hingga First Class.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xl transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Keamanan Transaksi Terjamin</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Sistem booking aman dengan kode unik untuk setiap transaksi yang terdaftar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore More Section */}
      <section className="relative py-24 px-4 overflow-hidden mt-20">
        {/* Background Decorations */}
        <div className="absolute inset-0 bg-slate-50 -z-10" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-3xl -z-10 translate-y-1/3 -translate-x-1/3" />

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
            <div className="text-center md:text-left">
              <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Discover</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Explore More Flights</h2>
              <p className="text-slate-500 mt-4 max-w-xl text-lg">Temukan lebih banyak destinasi menakjubkan untuk petualangan Anda selanjutnya dengan harga terbaik.</p>
            </div>
            <Link
              href="/flight"
              className="hidden md:flex items-center gap-2 px-8 py-4 bg-white text-blue-600 border border-blue-100 hover:border-blue-200 hover:bg-blue-50/50 rounded-full font-semibold transition-all shadow-sm hover:shadow-md group"
            >
              See All Flights
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-6 justify-items-center relative">
            {flightsData.data.slice(5, 10).map((flight:Flight) => (
              <div key={flight.id} className="transition-transform duration-300 hover:-translate-y-3 w-full max-w-sm">
                <CardTicket flight={flight} />
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center md:hidden">
            <Link
              href="/flight"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 rounded-full font-semibold transition-all shadow-md hover:shadow-lg group w-full max-w-sm"
            >
              See All Flights
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center py-16 px-4 space-y-10 rounded-3xl">
        {/* Teks & Aksi */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Pesan dan Pergi Sekarang Juga
          </h2>
          <p className="text-slate-500 text-lg">
            Jelajahi destinasi impian dengan harga terbaik di Voca Plane.
          </p>
          <Link href="/flight">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-blue-200">
              Pesan Tiket Sekarang
            </button>
          </Link>
        </div>

        <div className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl border-4 border-white">
          
        </div>
      </section>
    </div>
  )
}

export default SearchPage
