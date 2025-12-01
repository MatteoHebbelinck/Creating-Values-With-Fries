import React from "react";
import { storyblokEditable } from "@storyblok/react";

export default function Colorcode({ blok }) {
  // Dit component moet nooit visueel getoond worden.
  return <div {...storyblokEditable(blok)} style={{ display: "none" }} />;
}
