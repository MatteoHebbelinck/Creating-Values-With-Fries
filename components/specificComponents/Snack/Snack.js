import React from "react";
import css from "./Snack.module.scss";
import { storyblokEditable } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default function Snack({ blok }) {
  return (
    <div {...storyblokEditable(blok)} className={css["snack-page"]}>

      {/* Titel */}
      <h1 className={css["snack-page__title"]}>{blok.title}</h1>

      {/* Tagline */}
      {blok.tagline && (
        <p className={css["snack-page__tagline"]}>{blok.tagline}</p>
      )}

      {/* Afbeelding */}
      {blok.image && (
        <img 
          src={blok.image.filename} 
          alt={blok.image.alt || blok.title} 
          className={css["snack-page__image"]}
        />
      )}

      {/* Description */}
      <div className={css["snack-page__description"]}>
        {RichTextToHTML({ document: blok.description })}
      </div>

      {/* Colorcode badge */}
      {blok.colorcode && (
        <div className={css["snack-page__colorcode"]}>
          Color: {blok.colorcode}
        </div>
      )}
    </div>
  );
}
