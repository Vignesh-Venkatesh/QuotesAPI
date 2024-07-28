import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

const server_link = "http://localhost:3000";

export const Statistics = () => {
  const [data, setData] = useState({ count: 0, data: [] });

  useEffect(() => {
    const fetchUserAPIUsage = async () => {
      try {
        const response = await fetch(
          `${server_link}/api/v1/auth/getAPIUsageStats`,
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const userData = await response.json();
          const stats = userData.data;

          // Sort data by date
          const dateCounts = stats.reduce((acc, stat) => {
            const date = new Date(stat.timestamp).toISOString().split("T")[0];
            if (!acc[date]) {
              acc[date] = 0;
            }
            acc[date]++;
            return acc;
          }, {});

          const chartData = Object.keys(dateCounts).map((date) => ({
            date,
            apiCalls: dateCounts[date],
          }));

          // Sort chartData by date
          chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

          setData({ count: stats.length, data: chartData });
          console.log(chartData);
        } else {
          console.error("Error fetching API usage stats:", response.statusText);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUserAPIUsage();
  }, []);

  return (
    <Card className="bg-slate-900 border-none">
      <CardHeader>
        <CardTitle className="text-slate-50 font-josefin">
          API Statistics
        </CardTitle>
        <CardDescription className="text-slate-400">
          The stats below are a view of your API key activity.
        </CardDescription>
      </CardHeader>
      <CardContent style={{ height: 440 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#888" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                borderColor: "#555",
                fontFamily: "Josefin-Sans",
                borderRadius: "12px",
              }}
              labelStyle={{ color: "#fff", fontFamily: "Josefin-Sans" }}
            />
            <Legend />
            <Area
              dataKey="apiCalls"
              name="API Calls"
              type="monotone"
              stroke="#8884d8"
              fill="#8884d8"
              strokeWidth={2}
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
