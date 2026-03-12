"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Install: npm install js-cookie @types/js-cookie
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Login } from "@/lib/api/auth/login"; 
import { getProfile } from "@/lib/api/UserApi";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await Login(email, password);

      if (res.success) {
        // 1. Simpan Access Token ke Cookie
        Cookies.set("token", res.data.access_token, { expires: 1 });
        Cookies.set("access_token", res.data.access_token, { expires: 1 });

        const roleFromLogin = res?.data?.role;
        if (roleFromLogin) {
          Cookies.set("role", roleFromLogin, { expires: 1 });
        } else {
          try {
            const profile = await getProfile();
            const roleFromProfile = profile?.data?.role;
            if (roleFromProfile) {
              Cookies.set("role", roleFromProfile, { expires: 1 });
            }
          } catch {
          }
        }

        // 3. Redirect ke root (user group) sesuai flow kamu
        router.push("/");
        router.refresh(); // Refresh agar middleware mendeteksi cookie baru
      }
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome Back</h1>
        <p className="text-sm text-slate-500">Enter your details to access your booking.</p>
        {error && <p className="text-xs text-red-500 bg-red-50 p-2 rounded w-full">{error}</p>}
      </div>

      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel className="text-slate-700">Email Address</FieldLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-slate-200 focus:ring-indigo-500"
            id="email" type="email" placeholder="user@flightbooking.com"
            required
          />
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel className="text-slate-700">Password</FieldLabel>
            <a href="#" className="ml-auto text-xs font-medium text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>
          <Input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-slate-200 focus:ring-indigo-500" 
            id="password" 
            type="password" 
            required
          />
        </Field>

        <Button 
          type="submit" 
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all"
        >
          {loading ? "Authenticating..." : "Sign In"}
        </Button>

        {/* ... sisa UI sosial media ... */}
      </FieldGroup>
    </form>
  );
}