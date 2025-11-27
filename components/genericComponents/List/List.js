import React from "react";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react";
import css from "./List.module.scss";

export default function List({ blok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className={css["list"]}
    >
      {/* Titel boven de lijst (zoals "These are our types of snacks:") */}
      {blok.title && (
        <h2 className={css["list__title"]}>{blok.title}</h2>
      )}

      <ul className={css["list__items"]}>
        {blok.elements?.map((story) => {
          // bij resolve_relations zit de echte story in dit object
          const content = story.content || story;

          // URL opbouwen: full_slug is het veiligst (/pages/snackcatalog/...)
          const href = `/${story.full_slug || story.slug || ""}`;

          return (
            <li
              key={story.uuid || story._uid}
              className={css["list__item"]}
            >
              <Link href={href}>
                <a className={css["list__link"]}>
                  {content.title || story.name}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
