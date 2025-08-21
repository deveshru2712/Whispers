"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, User, LogOut, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/lib/actions/user.action";

const NavigationDropdown = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUserDetails = async () => {
      if (session?.user?.id) {
        try {
          setLoading(true);
          setError(null);
          const userData = await getUserInfo(session.user.id);
          if (userData) {
            setUser(userData);
          }
        } catch (err) {
          console.error("Failed to fetch user details:", err);
          setError("Failed to load user information");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    getUserDetails();
  }, [session]);

  const onProfileClick = () => {
    router.push("/profile");
  };

  const onLogoutClick = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  if (!session || !user) {
    return null;
  }

  if (loading) {
    return (
      <Button
        variant="ghost"
        className="flex items-center gap-2 px-2 py-2 h-auto"
        aria-label="Loading user menu"
      >
        <UserCircle className="h-8 w-8 text-muted-foreground" />
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-2 py-2 h-auto hover:bg-accent hover:text-accent-foreground transition-colors group relative"
          aria-label="User menu"
        >
          <UserCircle className="h-8 w-8 text-muted-foreground" />
          <ChevronDown className="h-4 w-4 text-muted-foreground" />

          {/* Tooltip that appears on hover */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none">
            {user?.name || "User"}
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 bg-background border border-border shadow-lg z-50"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name || "User"}
            </p>
            {user?.bio && (
              <p className="text-xs leading-none text-muted-foreground line-clamp-2">
                {user.bio}
              </p>
            )}
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onProfileClick}
          className="cursor-pointer flex items-center gap-2 hover:bg-accent hover:text-accent-foreground"
        >
          <User className="h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onLogoutClick}
          className="cursor-pointer flex items-center gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300"
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavigationDropdown;
