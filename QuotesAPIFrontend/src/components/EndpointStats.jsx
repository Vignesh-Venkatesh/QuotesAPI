import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Endpoints } from "./Endpoints";
import { Statistics } from "./Statistics";

export const EndpointStats = ({ setApiEndpoint }) => {
  return (
    <>
      <Tabs defaultValue="endpoints" className="w-full mt-2 custom-scrollbar">
        <TabsList className="w-full bg-slate-900 ">
          <TabsTrigger
            value="endpoints"
            className="w-1/2 text-center py-2 hover:bg-slate-800 data-[state=active]:bg-slate-700 data-[state=active]:text-slate-50 "
          >
            Endpoints
          </TabsTrigger>
          <TabsTrigger
            value="statistics"
            className="w-1/2 text-center py-2 hover:bg-slate-800 data-[state=active]:bg-slate-700 data-[state=active]:text-slate-50"
          >
            Statistics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="endpoints">
          <Endpoints setApiEndpoint={setApiEndpoint} />
        </TabsContent>
        <TabsContent value="statistics">
          <Statistics />
        </TabsContent>
      </Tabs>
    </>
  );
};
