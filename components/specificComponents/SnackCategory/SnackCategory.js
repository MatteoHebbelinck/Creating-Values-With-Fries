import React from "react";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import css from "./SnackCategory.module.scss";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default function SnackCategory({ blok }) {
  return (
    <div {...storyblokEditable(blok)} className={css["category"]}>
      <h1 className={css["category__title"]}>{blok.title}</h1>

      {blok.description && (
        <div className={css["category__description"]}>
          {RichTextToHTML({ document: blok.description })}
        </div>
      )}

      <div className={css["category__snacks"]}>
        {blok.snacks?.map((snack) => (
          <StoryblokComponent blok={snack} key={snack._uid} />
        ))}
      </div>
    </div>
  );
}
