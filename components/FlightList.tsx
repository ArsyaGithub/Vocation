"use client"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "@tanstack/react-query"
import { CardTicket } from "@/components/CardTicket"
import { getFlights } from "@/lib/api/FlightApi"
import { Flight, FlightFilters } from "@/lib/type/flight";

interface FlightListProps {
  initialData: any;
  searchParams?: any;
}

export function FlightList({ initialData, searchParams }: FlightListProps) {
  const { ref, inView } = useInView()

  // Buat filters object yang lengkap termasuk sort_by dan order
  const filters: FlightFilters = {
    origin: searchParams?.origin || "",
    destination: searchParams?.destination || "",
    date: searchParams?.date || "",
    sort_by: searchParams?.sort_by || "flight_classes.price",
    order: searchParams?.order || "asc",
    limit: 5,
  };

  // queryKey harus menyertakan SEMUA parameter termasuk sorting
  // agar React Query tahu data berubah saat sorting berubah
  const queryKey = ["flights", filters];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => {
      return getFlights({ ...filters, page: pageParam });
    },
    initialPageParam: 1,
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.meta) return undefined;
      const { page, total, limit } = lastPage.meta;
      return page * limit < total ? page + 1 : undefined;
    },
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-6">
        {data?.pages?.map((page) =>
          page?.data?.map((flight: Flight) => (
            <CardTicket key={flight.id} flight={flight} />
          ))
        )}
      </div>

      <div ref={ref} className="h-20 flex items-center justify-center">
        {isFetchingNextPage ? (
          <p className="text-indigo-600 font-medium">Loading more flights...</p>
        ) : hasNextPage ? (
          <p className="text-slate-400 text-sm">Scroll down to see more</p>
        ) : (
          <p className="text-slate-400 text-sm italic">All flights loaded.</p>
        )}
      </div>
    </div>
  )
}