import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const endpoints = [
  {
    endpoint: "/api/v1/quotes/",
    method: "GET",
    description: "Retrieve a list of all quotes",
    query: [
      {
        key: "page",
        description: "The page number",
      },
    ],
  },
  {
    endpoint: "/api/v1/authors/",
    method: "GET",
    description: "Retrieve a list of all authors",
    query: [
      {
        key: "page",
        description: "The page number",
      },
    ],
  },
  {
    endpoint: "/api/v1/quotes/:id",
    method: "GET",
    description: "Retrieve a specific quote by its unique identifier",
    param: [
      {
        key: "id",
        description: "The quote id",
      },
    ],
  },
  {
    endpoint: "/api/v1/quotes/author/:authorId",
    method: "GET",
    description: "Retrieve all quotes by a specific author",
    param: [
      {
        key: "id",
        description: "The author id",
      },
    ],
    query: [
      {
        key: "page",
        description: "The page number",
      },
    ],
  },
  {
    endpoint: "/api/v1/quotes/random",
    method: "GET",
    description: "Retrieve a random quote from the collection",
  },
  {
    endpoint: "/api/v1/quotes/keyword/:keyword",
    method: "GET",
    description: "Retrieve quotes that contain a specific keyword",
    param: [
      {
        key: "keyword",
        description: "The specific keyword",
      },
    ],
    query: [
      {
        key: "page",
        description: "The page number",
      },
    ],
  },
  {
    endpoint: "/api/v1/authors/:id",
    method: "GET",
    description: "Retrieve details about a specific author",
    param: [
      {
        key: "id",
        description: "The author id",
      },
    ],
  },
];

export const Endpoints = ({ setApiEndpoint }) => {
  const handleAPIEndpointInCodeBlock = (endpoint) => {
    setApiEndpoint(endpoint);
    toast.success("Updated Code Block with new API Endpoint");
  };

  return (
    <div className="mt-3 overflow-y-auto pr-3 h-[535px]">
      {endpoints.map((endpoint, index) => (
        <Card
          onClick={() => handleAPIEndpointInCodeBlock(endpoint.endpoint)}
          key={index}
          className="cursor-pointer bg-slate-900 border-none my-4 shadow-lg hover:bg-slate-800 "
        >
          <CardHeader className="pt-4 border-b border-slate-700">
            <CardTitle className="flex items-center space-x-2">
              <Badge
                variant="secondary"
                className="bg-green-700 font-bold text-slate-50 text-sm px-2 py-1 rounded-lg hover:bg-green-600 transition-colors duration-300 ease-in-out"
              >
                {endpoint.method}
              </Badge>
              <pre className="mt-1">
                <code className="text-slate-50">{endpoint.endpoint}</code>
              </pre>
            </CardTitle>
            <CardDescription className="text-slate-300 mt-2 text-sm">
              {endpoint.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-slate-200">
              {endpoint.param && (
                <div>
                  <strong className="text-green-200">Path Parameters:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    {endpoint.param.map((param, id) => (
                      <li key={id}>
                        <strong>{param.key}:</strong> {param.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {endpoint.query && (
                <div className="mt-2">
                  <strong className="text-green-200">Query Parameters:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    {endpoint.query.map((param, id) => (
                      <li key={id}>
                        <strong>{param.key}:</strong> {param.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
