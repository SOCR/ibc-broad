
import React from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export function AppLayout() {
  return (
    <SidebarProvider defaultIsOpen={true}>
      <div className="min-h-screen w-full flex">
        <AppSidebar />
        
        <main className="flex-1 ml-64 p-6 transition-all duration-300 overflow-x-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-2xl font-bold">MSU Broad College IBC Dashboard</h1>
            </div>
          </div>
          
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
