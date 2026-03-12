"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Edit2, Loader2 } from "lucide-react"

export interface FormField {
  name: string
  label: string
  type?: "text" | "number" | "url" | "select" | "textarea"
  placeholder?: string
  required?: boolean
  options?: { label: string; value: string | number }[] // For select type
}

interface UpsertFormProps {
  title: string
  description: string
  fields: FormField[]
  initialData?: any // If provided, it's Update mode
  triggerLabel?: string
  triggerVariant?: "default" | "outline" | "ghost" | "icon"
  triggerIcon?: React.ReactNode
  onSubmit: (data: any) => Promise<void>
  onSuccess?: () => void
}

export function UpsertForm({
  title,
  description,
  fields,
  initialData,
  triggerLabel,
  triggerVariant = "default",
  triggerIcon,
  onSubmit,
  onSuccess,
}: UpsertFormProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<any>({})

  // Reset form when initialData changes or modal opens
  useEffect(() => {
    if (open) {
      setFormData(initialData || {})
    }
  }, [open, initialData])

  const handleChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(formData)
      toast.success(`${title} berhasil disimpan`)
      setOpen(false)
      if (onSuccess) onSuccess()
    } catch (error: any) {
      console.error("Gagal menyimpan data:", error)
      toast.error(`Gagal menyimpan ${title}: ${error.message || "Terjadi kesalahan"}`)
    } finally {
      setLoading(false)
    }
  }

  const isUpdate = !!initialData

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerVariant === "icon" ? (
          <Button variant="outline" size="icon" className="h-8 w-8">
            {triggerIcon || <Edit2 className="h-4 w-4" />}
          </Button>
        ) : (
          <Button variant={triggerVariant} className="gap-2">
            {triggerIcon || (isUpdate ? <Edit2 className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />)}
            {triggerLabel || (isUpdate ? "Edit" : "Tambah Baru")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-none shadow-2xl overflow-hidden p-0">
        <div className="bg-primary/5 p-6 pb-2">
            <DialogHeader>
            <DialogTitle className="text-2xl font-bold tracking-tight">
                {isUpdate ? "Update" : "Create New"} {title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-1">
                {description}
            </DialogDescription>
            </DialogHeader>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid gap-5">
            {fields.map((field) => (
              <div key={field.name} className="grid gap-2">
                <Label htmlFor={field.name} className="text-sm font-semibold flex gap-1">
                    {field.label}
                    {field.required && <span className="text-destructive">*</span>}
                </Label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    className="flex min-h-[100px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                  />
                ) : field.type === "select" ? (
                  <select
                    id={field.name}
                    className="flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                  >
                    <option value="" disabled>{field.placeholder || `Pilih ${field.label}`}</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id={field.name}
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    className="h-11 rounded-lg border-muted-foreground/20 focus:border-primary transition-all shadow-none"
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>
          
          <DialogFooter className="pt-4 border-t gap-3 sm:gap-0">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="h-11 px-6 font-medium"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="h-11 px-8 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Data"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
