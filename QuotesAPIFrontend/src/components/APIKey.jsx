import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import CopyIcon from "../assets/Icons/copy.svg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const server_link = "http://localhost:3000";

export const APIKey = ({ user, setApiKey, apiKey }) => {
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Function to fetch API key from the server
    const fetchAPIKey = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${server_link}/api/v1/auth/getAPIkey?userID=${user.id}`,
          {
            credentials: "include", // Ensure cookies are sent with the request
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch API key");
        }
        const data = await response.json();
        if (data.apiKey) {
          setApiKey(data.apiKey);
        }
      } catch (error) {
        toast.error("Failed to fetch API key");
        setError("Failed to fetch API key");
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchAPIKey();
    }
  }, [user, apiKey]);

  const handleGenerateNewAPIkey = async (user) => {
    setIsLoading(true);
    setError("");

    const url = `${server_link}/api/v1/auth/getNewAPIkey?userID=${user.id}`;

    const options = {
      method: "PATCH",
      credentials: "include",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch API key");
      }
      setApiKey(data.apiKey);
      toast.success("Generated a new API key");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate new API key");
      setError("Failed to generate new API key");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle copying API key to clipboard
  const handleCopyToClipboard = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value).then(() => {
        toast.success("API Key copied to clipboard!");
      });
    }
  };

  return (
    <>
      <Card className="bg-slate-900 border-none p-1 text-slate-50 font-josefin w-[400px] mt-4">
        <CardContent>
          <h2 className="text-lg font-bold mt-2">Authorization</h2>
          <div className="input flex justify-center items-center">
            <Input
              ref={inputRef}
              disabled
              className="bg-slate-800 border-none mt-4"
              style={{ cursor: "default" }}
              placeholder="API Key"
              value={apiKey}
            />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <img
                    src={CopyIcon}
                    alt="Copy"
                    className="h-8 w-8 mt-4 ml-1 cursor-pointer"
                    onClick={handleCopyToClipboard} // Handle copy action
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-slate-700 text-slate-50 border-none">
                  <p>Copy API Key</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {/* Show loading state */}
          {isLoading && <p className="mt-2">Loading...</p>}
          {/* Show error message */}
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full mt-4">
                Generate new API key
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-slate-800 border-none">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-slate-100 font-josefin">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-slate-400 font-josefin">
                  This action is irreversible. By proceeding, you will
                  permanently delete your current API key and generate a new
                  one. Please ensure that you update any applications or
                  services using the old key.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="font-josefin">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="hover:bg-red-500 font-josefin"
                  onClick={() => handleGenerateNewAPIkey(user)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </>
  );
};
