"use client";

import React, { useEffect } from "react";
import Hotjar from "@hotjar/browser";

const HotjarTracker = () => {
  useEffect(() => {
    const siteId = 5327964;
    const hotjarVersion = 6;
    Hotjar.init(siteId, hotjarVersion);
  }, []);
  return <></>;
};

export default HotjarTracker;
