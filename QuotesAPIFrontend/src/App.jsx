import { Button } from "./components/ui/button";
import GithubIcon from "./assets/Icons/github.svg";
import { useEffect } from "react";

function App() {
  return (
    <>
      <main className="bg-slate-950 h-screen flex">
        <div className="left w-1/2 bg-slate-200 flex flex-col justify-center items-center h-screen">
          <blockquote className="font-typewriting m-auto text-slate-900 text-5xl  w-4/5">
            <p>
              Happiness does not depend on what you have or who you are. It
              solely relies on what you think.
            </p>
            <p className="text-end leading-loose">- Buddha</p>
          </blockquote>
        </div>

        <div className="right w-1/2">
          <h1 className="text-slate-50 font-bold text-5xl text-center p-10">
            QuotesAPI
          </h1>
          <Button variant="secondary" className="flex justify-evenly w-[180px]">
            <img src={GithubIcon} alt="" className="w-[20px]" />
            Login with GitHub
          </Button>
        </div>
      </main>
    </>
  );
}

export default App;
