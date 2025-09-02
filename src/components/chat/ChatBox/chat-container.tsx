import React from "react";

export default function ChatContainer() {
  return (
    <div className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar">
      {/* background */}
      <div className="bg-[#091a23] h-full w-full fixed opacity-5 left-0 top-0 "></div>

      <div className="flex w-full">
        <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
          
        </div>
      </div>
    </div>
  );
}
