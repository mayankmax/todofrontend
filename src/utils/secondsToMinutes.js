import React from "react";
import { zeroLeft } from "./zeroLeft";

export function secondsToMinutes(seconds) {
  const min = zeroLeft((seconds / 60) % 60);
  const sec = zeroLeft((seconds % 60) % 60);
  return `${min}:${sec}`;
}