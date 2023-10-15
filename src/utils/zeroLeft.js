
import React from "react";

export function zeroLeft(n) {
    return Math.floor(n).toString().padStart(2, '0');
  }