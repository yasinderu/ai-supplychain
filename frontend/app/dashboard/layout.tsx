import { AppSidebar } from "@/components/AppSidebar";
import FloatingChatUI from "@/components/FloatingChatUI";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <FloatingChatUI isOnline={true} supportTitle="AI Assistant" />
      <main className="container mx-auto mt-10">{children}</main>
    </SidebarProvider>
  );
}
