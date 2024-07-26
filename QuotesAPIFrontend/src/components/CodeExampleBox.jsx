import React from "react";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarkdownPreview from "@uiw/react-markdown-preview";

const websiteLink = "quotes-api.com";

export const CodeExampleBox = ({ apiKey, apiEndpoint }) => {
  const sampleCodePython = `
\`\`\`python
import requests

url = "https://${websiteLink}${apiEndpoint}"

headers = {
    "accept": "application/json",
    "Authorization": "Bearer ${apiKey}"
}

response = requests.get(url, headers=headers)

print(response.text)
\`\`\`
`;

  const sampleCodeJS = `
\`\`\`javascript
fetch("https://${websiteLink}${apiEndpoint}", {
  method: "GET",
  headers: {
    "accept": "application/json",
    "Authorization": "Bearer ${apiKey}"
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
\`\`\`
`;

  return (
    <Card className="bg-slate-900 border-none p-1 text-slate-50 font-josefin w-full max-w-2xl mt-4 mx-auto">
      <CardContent className="p-6">
        <h2 className="text-lg font-bold mb-4">API Request Examples</h2>
        <Tabs defaultValue="python" className="w-full">
          <TabsList className="w-full bg-slate-700 ">
            <TabsTrigger
              value="python"
              className="w-1/2 text-center py-2 data-[state=active]:bg-slate-600 data-[state=active]:text-slate-50"
            >
              Python
            </TabsTrigger>
            <TabsTrigger
              value="javascript"
              className="w-1/2 text-center py-2 data-[state=active]:bg-slate-600 data-[state=active]:text-slate-50"
            >
              JavaScript
            </TabsTrigger>
          </TabsList>
          <TabsContent value="python" className="mt-4">
            <MarkdownPreview source={sampleCodePython} />
          </TabsContent>
          <TabsContent value="javascript" className="mt-4">
            <MarkdownPreview source={sampleCodeJS} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
