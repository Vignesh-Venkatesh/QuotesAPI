import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = ({ user, handleLogout }) => {
  return (
    <nav className="flex justify-between items-center bg-gray-900 h-16 px-6 shadow-md">
      {/* <h1 className="text-white font-semibold font-josefin text-xl">
        WELCOME {user.name.toUpperCase()}
      </h1> */}
      <h1 className="text-white font-bold font-josefin text-xl">QuotesAPI</h1>

      <DropdownMenu className="cursor-pointer">
        <DropdownMenuTrigger>
          <Avatar className="w-12 h-12 outline-none">
            <AvatarImage src={user.avatar_url} title={user.name} />
            <AvatarFallback className="text-slate-800 font-semibold text-xl">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-800 border-slate-800 text-slate-50 font-josefin font-medium">
          <DropdownMenuLabel className="text-slate-400">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-600" />
          <DropdownMenuItem className="cursor-pointer hover:bg-slate-700 py-2 px-4">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-slate-700 py-2 px-4">
            API Endpoints
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer bg-red-500 hover:bg-red-600 text-slate-50 font-semibold py-2 px-4"
            onClick={handleLogout}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
