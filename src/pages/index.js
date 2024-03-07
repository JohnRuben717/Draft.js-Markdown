import React from "react";
import Title from "../components/Title";
import MyEditor from "../components/MyEditor";

export default function Home() {
  return (
    <div className="bg-[#172554]  min-h-screen flex justify-center items-center relative overflow-hidden">
      <div className=" w-full max-w-screen-md mx-auto  backdrop-blur-sm bg-[#60a5fa]/70 p-8 shadow-lg rounded-lg relative z-10">
        <Title />
        <div className="mt-8">
          <MyEditor />
        </div>
      </div>
      <div className="gradient absolute inset-0 z-0 flex justify-center items-center">
        <div className="w-full max-w-screen-md h-full bg-transparent"></div>
      </div>
    </div>
  );
}
