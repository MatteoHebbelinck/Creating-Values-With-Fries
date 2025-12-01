import React, { Component } from "react";
import css from "./Contact.module.scss";
import Headermenu from "../../genericComponents/Headermenu/Headermenu";
import Hero from "../../genericComponents/Hero/Hero";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";
import List from "../../genericComponents/List/List";

export default class Contact extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // Veiligheidscheck: als er geen data is, render niets om errors te voorkomen
        if (!this.props.blok) return null;

        return (
            <div {...storyblokEditable(this.props.blok)}>
                {/* Check of menu bestaat */}
                {this.props.menu && <Headermenu blok={this.props.menu.content}></Headermenu>}

                <main>
                    <Hero blok={this.props.blok} contentTypeTag="course" />
                    
                    {/* Let op: Hier gebruiken we de class die matcht met de SCSS hieronder */}
                    <div className={css["contact-page__main-content"]}>
                        <div id="contact-page__short-description" className={css["contact-page__short-description"]}>
                            
                            <section className={css["rich-text-section--with-navigator"]}>
                                <h2 className={css["rich-text-section__title"]}>Location Details</h2>
                                <div className={css["rich-text-section__rich-text"]}>
                                    {RichTextToHTML({ document: this.props.blok.description })}
                                </div>
                            </section>

                            <section className={css["map-section"]}>
                                <h2 className={css["rich-text-section__title"]}>Onze Locatie</h2>

                                {/* Hier laden we de iframe code vanuit Storyblok */}
                                <div className={css["map-wrapper"]}>
                                    {this.props.blok.map_iframe ? (
                                        <div 
                                            className={css["iframe-container"]}
                                            dangerouslySetInnerHTML={{ __html: this.props.blok.map_iframe }} 
                                        />
                                    ) : (
                                        <p>Geen kaart ingesteld in Storyblok.</p>
                                    )}
                                </div>
                            </section>

                        </div>  
                    </div> 
                    
                    {this.props.blok.additionalstuff && this.props.blok.additionalstuff.map((nestedBlok) => (
                        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                    ))}
                </main>
            </div>
        );
    }
}