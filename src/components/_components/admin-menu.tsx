import { User } from "better-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import Link from "next/link";
import SignOutButton from "../auth/sign-out";
import Image from "next/image";

interface UserMenuProps {
  user: User;
}

export default function AdminMenu({ user }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 border-3 border-blue-500">
            <AvatarFallback className="text-blue-500">
              {getInitials(user?.name) || "Guest"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-56 mr-5">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-bold">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/admin/dashboard" className="flex gap-2 items-center">
            <Image
              src={"/assets/home.png"}
              alt="Dashboard"
              width={16}
              height={16}
            />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/admin/account" className="flex gap-2 items-center">
            <Image
              src={"/assets/group.png"}
              alt="Users"
              width={16}
              height={16}
            />
            <span>Accounts</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/admin/product" className="flex gap-2 items-center">
            <Image
              src={"/assets/canned-food.png"}
              alt="Products"
              width={16}
              height={16}
            />
            <span>Products</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/admin/blog" className="flex gap-2 items-center">
            <Image
              src={"/assets/blog.png"}
              alt="Blogs"
              width={16}
              height={16}
            />
            <span>Blogs</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/admin/order" className="flex gap-2 items-center">
            <Image
              src={"/assets/booking.png"}
              alt="Orders"
              width={16}
              height={16}
            />
            <span>Orders</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div>
            <SignOutButton />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
