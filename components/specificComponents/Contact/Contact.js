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
		return (
			<div {...storyblokEditable(this.props.blok)}>
				<Headermenu blok={this.props.menu.content}></Headermenu>

				<main>
					<Hero blok={this.props.blok} contentTypeTag="course" />
					<div className={css["contact-page__main-content"]}>
						<div id="contact-page__short-description" key="contact-page__short-description" className={css["contact-page__short-description"]}>
							<section className={css["rich-text-section--with-navigator"]}>
								<h2 className={css["rich-text-section__title"]}>Location Details</h2>
								<div className={css["rich-text-section__rich-text"]}>{RichTextToHTML({ document: this.props.blok.description })}</div>
							</section>

                            <section className={css["map-section"]}>
    <h2 className={css["rich-text-section__title"]}>Onze Locatie</h2>

    <div className={css["map-wrapper"]}>
        {/* Hardcoded iframe */}
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5017.11723708637!2d3.7247649765242845!3d51.04277234453954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c37150c174667b%3A0x8f31c1404ab55e14!2sTweekerkenstraat%202%2C%209000%20Gent!5e0!3m2!1snl!2sbe!4v1764596695336!5m2!1snl!2sbe"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
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