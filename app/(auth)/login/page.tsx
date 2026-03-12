import { PlaneTakeoff } from "lucide-react"
import Image from "next/image"
import { LoginForm } from "@/components/LoginForm"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-slate-50">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <PlaneTakeoff className="size-5" />
            </div>
            SkyPass.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block overflow-hidden">
        <Image
        src="/plane.jpg"
        width={40}
        height={40}
        alt="Wing of an airplane above clouds"
          
        />
        
        <div className="absolute inset-0 bg-linear-to-t from-indigo-900/60 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center">
           <svg className="w-24 h-24 mb-6 opacity-80 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-1.1.1-1.5.5l-.3.3c-.4.4-.5 1-.1 1.4L10 12l-4 4H3l-1 1 3 1 1 3 1-1v-3l4-4 3.6 7.1c.4.4 1 .3 1.4-.1l.3-.3c.4-.4.6-1 .5-1.5z" />
           </svg>
           <h2 className="text-3xl font-bold tracking-tight">Ready for your next adventure?</h2>
           <p className="mt-2 text-indigo-50/80">Access your tickets and manage your trips in one click.</p>
        </div>
      </div>
    </div>
  )
}