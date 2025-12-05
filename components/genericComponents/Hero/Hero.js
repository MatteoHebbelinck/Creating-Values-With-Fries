import { storyblokEditable } from "@storyblok/react";
import React from "react";
import css from "./Hero.module.scss";
import PropTypes from "prop-types";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default function Hero({ blok }) {

  /* ---------------------------
     TEXT FIELDS
  --------------------------- */
  const titleString =
    typeof blok.title === "string" ? blok.title : undefined;

  const taglineString =
    typeof blok.tagline === "string" ? blok.tagline : undefined;

  const colorCssName = "--" + (blok.colorcode?.[0]?.content?.title || "");


  /* ---------------------------
     BACKGROUND IMAGE
  --------------------------- */
  const backgroundImage = blok.image?.filename
    ? `url(${blok.image.filename})`
    : "none";


  /* ---------------------------
     OVERLAY SETTINGS
  --------------------------- */

  // Convert % to 0–1
  const overlayOpacity = (blok.overlay_opacity ?? 40) / 100;

  // Storyblok single-option → hex map
  const overlayColorMap = {
    black: "#000000",
    darkblue: "#001a33",
  };

  const overlayColor = overlayColorMap[blok.overlay_color] || "#000000";


  /* ---------------------------
     COMPONENT RENDER
  --------------------------- */
  return (
    <section
      {...storyblokEditable(blok)}
      className={css["hero" + colorCssName]}
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        "--overlay-opacity": overlayOpacity,
        "--overlay-color": overlayColor
      }}
    >

      {/* GRADIENT OVERLAY (CSS handles gradient + opacity) */}
      <div className={css["hero__overlay"]}></div>

      {/* TEXT CONTENT */}
      <div className={css["hero__container"]}>
        <div className={css["hero__title-group"]}>

          {blok.supertitle && (
            <p className={css["hero__tag"]}>{blok.supertitle}</p>
          )}

          <h1 className={css["hero__title"]}>
            {titleString ||
              RichTextToHTML({
                document: blok.title,
                textClassName: css["hero__title"],
                boldClassName:
                  css["hero__title--highlighted" + colorCssName]
              })}
          </h1>

          {taglineString && (
            <div className={css["hero__subtitle"]}>{taglineString}</div>
          )}
        </div>
      </div>

    </section>
  );
}

Hero.propTypes = {
  blok: PropTypes.object,
};
