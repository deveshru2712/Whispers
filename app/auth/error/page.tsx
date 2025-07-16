"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Home, ArrowLeft, RotateCw, AlertTriangle } from "lucide-react";

export default function AuthErrorPage() {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorConfig = {
    AccessDenied: {
      title: "Access Denied",
      description: "You don't have permission to access this resource",
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      primaryAction: {
        label: "Return Home",
        icon: <Home className="w-4 h-4" />,
        href: "/",
      },
      secondaryAction: {
        label: "Try Signing In",
        icon: <ArrowLeft className="w-4 h-4" />,
        href: "/sign-in",
      },
    },
    auth_error: {
      title: "Authentication Error",
      description: "Failed to authenticate your request",
      icon: <RotateCw className="w-5 h-5 text-yellow-500" />,
      primaryAction: {
        label: "Try Again",
        icon: <RotateCw className="w-4 h-4" />,
        href: "/sign-in",
      },
      secondaryAction: {
        label: "Return Home",
        icon: <Home className="w-4 h-4" />,
        href: "/",
      },
    },
    default: {
      title: "Error Occurred",
      description: "An unexpected error occurred",
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      primaryAction: {
        label: "Return Home",
        icon: <Home className="w-4 h-4" />,
        href: "/",
      },
      secondaryAction: {
        label: "Contact Support",
        icon: null,
        href: "https://x.com/deveshru2712",
      },
    },
  };

  const config =
    errorConfig[error as keyof typeof errorConfig] || errorConfig.default;

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        window.location.href = config.primaryAction.href;
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [error, config.primaryAction.href]);

  return (
    <div className="h-screen flex items-center justify-center bg-transparent">
      <Card className="w-full max-w-sm shadow-lg bg-background/95 backdrop-blur-sm border border-border/50">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto">{config.icon}</div>
          <CardTitle className="text-2xl font-semibold">
            {config.title}
          </CardTitle>
          <CardDescription className="text-base font-medium">
            {config.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button asChild variant={theme === "dark" ? "default" : "outline"}>
            <Link
              href={config.primaryAction.href}
              className="gap-2 hover:shadow-md transition-shadow"
            >
              {config.primaryAction.icon}
              {config.primaryAction.label}
            </Link>
          </Button>
          {config.secondaryAction && (
            <Button asChild variant="outline">
              <Link
                href={config.secondaryAction.href}
                className="gap-2 hover:shadow-md transition-shadow"
              >
                {config.secondaryAction.icon}
                {config.secondaryAction.label}
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
