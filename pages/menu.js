import React from "react";
import { useRouter } from "next/router";

const menu = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Menu goes here!</h1>
    </div>
  );
};

export default menu;
