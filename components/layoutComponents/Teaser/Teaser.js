import React from "react";
import { storyblokEditable } from "@storyblok/react";
import css from "./Teaser.module.scss";

export default function Teaser({ blok }) {
  return (
    <div {...storyblokEditable(blok)} className={css["teaser"]}>
      <h2 className={css["teaser__title"]}>{blok.headline}</h2>
    </div>
  );
}
