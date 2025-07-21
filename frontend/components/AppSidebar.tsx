import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarItem } from "@/data";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface AppSidebarProps {
  logout?: () => void;
}

export function AppSidebar() {
  // const cookiesStore = await cookies();
  const menuitems = SidebarItem;

  // const logoutHandler = async () => {
  //   cookiesStore.delete("session_token");
  //   cookiesStore.delete("user_id");

  //   redirect("/login");
  // };
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>AI Supplychain</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuitems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
