import React from "react";
import { storyblokEditable } from "@storyblok/react";   // ⭐ TERUG TOEVOEGEN
import css from "./LeftRightBlock.module.scss";
import { getDefaultStoryBlokImageSet } from "../../../functions/StoryBlokImageHelper";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default function LeftRightBlock({ blok }) {
  const cssDirection = blok.direction === "imageright" ? "--reverse" : "";
  const size = blok.forWithPageNavigator ? "--with-navigator" : "";

  const colorEntry = Array.isArray(blok.colorcode)
    ? blok.colorcode[0]
    : blok.colorcode;

  const colorName = colorEntry?.content?.title || "default";

  return (
  <section
    {...storyblokEditable(blok)}
    className={[
      css["highlighted-section"],
      css[`highlighted-section--${colorName}`], // ⭐ kleur op wrapper
    ].join(" ")}
  >
    <div
      className={[
        css["highlighted-content"],
        css["highlighted-content" + size],
      ].join(" ")}
    >
      {/* LEFT IMAGE / RIGHT TEXT */}
      <div
        className={[
          css["highlighted-content__image-container"],
          css[`highlighted-content__image-container${cssDirection}`],
          css[`highlighted-content__image-container${size}`],
        ].join(" ")}
      >
        <div className={css["highlighted-content__image-responsive-wrapper"]}>
          {getDefaultStoryBlokImageSet(
            blok.image.filename,
            blok.image.alt,
            { largestImageWidth: 870, largestImageHeigth: 870 },
            850,
            css["highlighted-content__image"]
          )}
        </div>
      </div>

      {/* TEXT */}
      <div
        className={[
          css["highlighted-content__text-container"],
          css[`highlighted-content__text-container${cssDirection}`],
          css[`highlighted-content__text-container${size}`],
        ].join(" ")}
      >
        {blok.title && (
          <h2 className={css["highlighted-content__title"]}>{blok.title}</h2>
        )}

        {RichTextToHTML({
          document: blok.text,
          textClassName: css[`highlighted-content__large-text${size}`],
          boldClassName: css["highlighted-content__large-text-bold"], // optioneel
        })}
      </div>
    </div>
  </section>
);
}
