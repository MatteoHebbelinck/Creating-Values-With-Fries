import React, { Component } from "react";
import { storyblokEditable } from "@storyblok/react"; 
// Deze import is nodig om in de Storyblok editor te kunnen werken.
export default class Contact extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        // Gebruik storyblokEditable om de component klikbaar/bewerkbaar te maken
        return (
            <div {...this.props.blok ? storyblokEditable(this.props.blok) : {}}>
                {/* Gebruik this.props.blok.titel (kleine letters) volgens je Storyblok veldnamen */}
                <h1>Contact: {this.props.blok.titel}</h1>
            </div>
        );
    }
}

