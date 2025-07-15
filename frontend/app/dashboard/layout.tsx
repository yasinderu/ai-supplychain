import { AppSidebar } from "@/components/AppSidebar";
import AIChatUI from "@/components/AIChat";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getAiChatHistory } from "@/actions/ai.action";
import { cookies } from "next/headers";

export default async function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = await cookies();
  const userId = cookiesStore.get("user_id")?.value;
  const aiChatHistory = await getAiChatHistory(userId);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <AIChatUI
        isOnline={true}
        supportTitle="AI Assistant"
        initialMessages={aiChatHistory}
        userId={userId || ""}
      />
      <main className="container mx-auto mt-10">{children}</main>
    </SidebarProvider>
  );
}
