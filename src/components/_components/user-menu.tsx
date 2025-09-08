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
import {
  Heart,
  Newspaper,
  Phone,
  ShoppingBag,
  ShoppingCartIcon,
  UserStar,
} from "lucide-react";
import SignOutButton from "../auth/sign-out";

interface UserMenuProps {
  user: User;
}

export default function UserMenu({ user }: UserMenuProps) {
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
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/admin/dashboard">
            <UserStar className="mr-2 h-4 w-4" />
            <span>Admin</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/blog">
            <Newspaper className="mr-2 h-4 w-4" />
            <span>Blog</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/product">
            <ShoppingCartIcon className="mr-2 h-4 w-4" />
            <span>Shopping</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/cart">
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Cart</span>
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/favourite">
            <Heart className="mr-2 h-4 w-4" />
            <span>Favourite</span>
          </Link>
        </DropdownMenuItem> */}
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/contact">
            <Phone className="mr-2 h-4 w-4" />
            <span>Contact</span>
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
