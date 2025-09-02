import React from "react";
import HeaderChat from "./header-chat";
import SearchChat from "./search-chat";
import List from "./list";

export default function ChatLists() {
  return (
    <div className="max-h-screen flex flex-col ">
      <HeaderChat />
      <SearchChat />
      <List />
    </div>
  );
}
