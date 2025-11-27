import React from "react";
import { storyblokEditable } from "@storyblok/react";
import css from "./LeftRightBlock.module.scss";
import { getDefaultStoryBlokImageSet } from "../../../functions/StoryBlokImageHelper";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default function LeftRightBlock({ blok }) {
  let cssDirection = blok.direction === "imageright" ? "--reverse" : "";
  let size = blok.forWithPageNavigator ? "--with-navigator" : "";
  let cssColorBg = "--" + blok.colorcode.content.title;
  let cssColorFont = "--highlighted-" + blok.colorcode.content.title;

  return (
    <section
      {...storyblokEditable(blok)}
      className={[
        css["highlighted-content" + size],
        css["highlighted-content"],
      ].join(" ")}
    >
      {/* LEFT IMAGE / RIGHT TEXT */}
      <div
        className={[
          css["highlighted-content__image-container" + cssDirection + size],
          css["highlighted-content__image-container" + cssColorBg],
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

      {/* RIGHT TEXT SECTION */}
      <div className={css["highlighted-content__text-container" + cssDirection + size]}>

        {/* ⭐ NEW: Title boven de richtext */}
        {blok.title && (
          <h2 className={css["highlighted-content__title"]}>
            {blok.title}
          </h2>
        )}

        {/* Original RichText */}
        {RichTextToHTML({
          document: blok.text,
          textClassName: css["highlighted-content__large-text" + size],
          boldClassName:
            css["highlighted-content__large-text" + cssColorFont + size],
        })}
      </div>
    </section>
  );
}
