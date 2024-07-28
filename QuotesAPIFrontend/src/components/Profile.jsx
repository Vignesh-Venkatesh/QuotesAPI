import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
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

const server_link = "http://localhost:3000";

export const Profile = ({ user }) => {
  const [confirmationText, setConfirmationText] = useState("");
  const isConfirmed = confirmationText === user;
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`${server_link}/api/v1/auth/deleteAccount`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        // Redirect to the homepage
        navigate("/");
      } else {
        console.error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Card className="bg-slate-900 border-none text-slate-50 font-josefin ">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>

        <CardContent className="h-[440px]">
          <Card className="bg-slate-800 border-none text-slate-50 mt-4">
            <CardContent className="pt-4">
              <CardTitle>API Documentation</CardTitle>
              <CardDescription className="text-slate-400 mt-4">
                Discover detailed information about the QuotesAPI. The
                documentation includes guidelines on how to get started,
                available endpoints, request and response formats, and examples.
                Whether you're a beginner or an experienced developer, you'll
                find all the information you need to effectively integrate the
                API into your application.
                <br />
                <br />
                <a
                  href="https://github.com/Vignesh-Venkatesh/QuotesAPI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View API Documentation
                </a>
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-none text-slate-50 mt-4">
            <CardContent className="pt-4">
              Delete your account?
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full mt-4 font-semibold bg-slate-900 border-red-500 text-red-500 hover:bg-red-500 transition-colors duration-200"
                  >
                    Delete Account
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="bg-slate-900 border-none">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-slate-100 font-josefin">
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-400 font-josefin">
                      This action is irreversible. By proceeding, you will
                      permanently delete your account, including all your data.
                      Once deleted, your account cannot be recovered. If you are
                      sure, please type{" "}
                      <strong className="text-red-400 font-roboto">
                        {user}
                      </strong>{" "}
                      to confirm deletion.
                    </AlertDialogDescription>
                    <Input
                      type="text"
                      className=" bg-slate-800 border-none mt-4 text-slate-50"
                      value={confirmationText}
                      onChange={(e) => setConfirmationText(e.target.value)}
                      placeholder={`Type ${user} to confirm`}
                    />
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="font-josefin">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      disabled={!isConfirmed}
                      onClick={handleDeleteAccount}
                      className={`font-josefin bg-slate-700 ${
                        isConfirmed
                          ? "bg-red-500 hover:bg-red-600"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
};
