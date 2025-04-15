
"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

import { cn } from "@/lib/utils"

type SidebarContextProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextProps>({
  isOpen: true,
  setIsOpen: () => undefined,
  toggleSidebar: () => undefined,
})

export function SidebarProvider({
  children,
  defaultIsOpen = true,
}: {
  children: React.ReactNode
  defaultIsOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  function toggleSidebar() {
    setIsOpen((prev) => !prev)
  }

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export function Sidebar({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const { isOpen } = useSidebar()

  return (
    <aside
      className={cn(
        "group fixed left-0 top-0 z-40 flex h-full flex-col border-r bg-sidebar transition-[width] duration-300",
        isOpen ? "w-64" : "w-16 items-center",
        className
      )}
    >
      {children}
    </aside>
  )
}

export function SidebarHeader({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  const { isOpen } = useSidebar()

  return (
    <div
      className={cn(
        "flex h-16 items-center border-b px-4 py-2",
        isOpen ? "justify-between" : "justify-center",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SidebarContent({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const { isOpen } = useSidebar()

  return (
    <div
      className={cn(
        "flex flex-1 flex-col gap-2 overflow-y-auto py-2",
        isOpen ? "px-2" : "px-1 items-center",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SidebarFooter({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  const { isOpen } = useSidebar()

  return (
    <div
      className={cn(
        "flex items-center border-t p-4",
        isOpen ? "justify-between" : "justify-center",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SidebarTrigger({ className }: { className?: string }) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={toggleSidebar}
    >
      <MenuIcon className="h-4 w-4" />
    </button>
  )
}

export function SidebarGroup({
  heading,
  className,
  children,
}: {
  heading?: string
  className?: string
  children?: React.ReactNode
}) {
  const { isOpen } = useSidebar()

  return (
    <div className={cn("py-2", className)}>
      {heading && isOpen && (
        <div className="mb-2 px-4 text-sm font-semibold tracking-tight">
          {heading}
        </div>
      )}
      {children}
    </div>
  )
}

export function SidebarMenu({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <nav className={cn("grid gap-1", className)}>
      {children}
    </nav>
  )
}

export function SidebarMenuItem({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn("", className)}>{children}</div>
}

export function SidebarMenuButton({
  className,
  children,
  asChild,
  ...props
}: {
  className?: string
  children: React.ReactNode
  asChild?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { isOpen } = useSidebar()
  const Comp = asChild ? AsChild : "button"

  return (
    <Comp
      className={cn(
        "group flex h-10 w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isOpen ? "justify-start" : "justify-center px-0",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

function AsChild({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  const child = React.Children.only(children) as React.ReactElement
  return React.cloneElement(child, { ...props })
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
