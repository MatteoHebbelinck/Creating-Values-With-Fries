import React, { Component } from "react";
import css from "./Location.module.scss";
import Headermenu from "../../genericComponents/Headermenu/Headermenu";
import Hero from "../../genericComponents/Hero/Hero";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default class Location extends Component {

  constructor(props) {
    super(props);
  }

  // 🧠 Dit maakt automatisch een embed URL van een gewoon adres
  generateEmbedFromAddress(address) {
    if (!address) return null;

    const encoded = encodeURIComponent(address);
    return `https://www.google.com/maps?q=${encoded}&output=embed`;
  }

  render() {
    const blok = this.props.blok;

    // 3 mogelijkheden:
    // 1. mapUrl aanwezig → gebruik dat
    // 2. address aanwezig → maak embed URL
    // 3. geen van beide → toon geen map
    const embedUrl = blok.mapUrl
      ? blok.mapUrl
      : blok.address
        ? this.generateEmbedFromAddress(blok.address)
        : null;

    return (
      <div {...storyblokEditable(blok)}>
        <Headermenu blok={this.props.menu.content}></Headermenu>

        <main>
          <Hero blok={blok} contentTypeTag="course" />

          <div className={css["location-page__main-content"]}>
            <div
              id="location-page__short-description"
              key="location-page__short-description"
              className={css["location-page__short-description"]}
            >
              <section className={css["rich-text-section--with-navigator"]}>
                <h2 className={css["rich-text-section__title"]}>Location Details</h2>
                <div className={css["rich-text-section__rich-text"]}>
                  {RichTextToHTML({ document: blok.description })}
                </div>
              </section>
            </div>

            {/* ✅ GOOGLE MAP sectie die beide methodes ondersteunt */}
            {embedUrl && (
              <div className={css["location-page__map"]} style={{ marginTop: "40px", textAlign: "center" }}>
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="450"
                  style={{ border: 0, maxWidth: "800px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}
          </div>

          {blok.additionalstuff &&
            blok.additionalstuff.map((nestedBlok) => (
              <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
        </main>
      </div>
    );
  }
}
