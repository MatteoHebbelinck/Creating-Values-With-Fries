
import { storyblokEditable } from "@storyblok/react"; 
// Deze import is nodig om in de Storyblok editor te kunnen werken.

export default function Contact({ blok }) {
  return (
    <div {...(blok ? storyblokEditable(blok) : {})}>
      {/* Gebruik blok.titel (kleine letters) volgens je Storyblok veldnamen */}
      <h1>Contact: {blok?.titel}</h1>
    </div>
  );
}
