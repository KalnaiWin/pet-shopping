"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export function HeroPage() {
  return (
    <div className="w-full px-25 py-10 my-5">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Category Products</h1>
        <p className="opacity-40 text-md mb-10">
          A lot of products for you to choose that can make your pets healthier,
          cleaner and GET FAT.
        </p>
      </div>
      <div className="w-full h-screen">
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full h-full "
        >
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={40} className="mb-2 shadow-md">
                <div className="flex h-full items-center justify-center p-6 ">
                  <span className="font-semibold">Two</span>
                </div>
              </ResizablePanel>
              <ResizablePanel defaultSize={60} className="mt-2 shadow-md">
                <div className="flex h-full items-center justify-center p-6 ">
                  <span className="font-semibold">Three</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizablePanel defaultSize={60} className="shadow-md mx-5">
            <div className="flex h-full items-center justify-center p-6 ">
              <span className="font-semibold">One</span>
            </div>
          </ResizablePanel>

          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60} className="mb-2 shadow-md">
                <div className="flex h-full items-center justify-center p-6 ">
                  <span className="font-semibold">Two</span>
                </div>
              </ResizablePanel>
              <ResizablePanel defaultSize={40} className="mt-2 shadow-md">
                <div className="flex h-full items-center justify-center p-6 ">
                  <span className="font-semibold">Three</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
