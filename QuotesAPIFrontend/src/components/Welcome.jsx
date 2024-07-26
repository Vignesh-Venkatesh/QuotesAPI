import React from "react";
import { Card, CardTitle } from "./ui/card";

export const Welcome = ({ user }) => {
  return (
    <Card className="bg-slate-900 border-none p-2 text-slate-200 font-josefin  mt-4 flex items-center ">
      <CardTitle>
        <p className="ml-4 text-base">Welcome {user}</p>
      </CardTitle>
    </Card>
  );
};
