import { useStoryblokState, getStoryblokApi, StoryblokComponent } from "@storyblok/react";
import HeadComponent from "../components/technicalComponents/HeadComponent/HeadComponent";
import { getTags } from "../functions/services/metaTagService";

export default function Page({ story, preview, socialtags, menu }) {

  story = useStoryblokState(
    story,
    {
      resolveRelations: [
        "hero.colorcode",
        "leftrightblock.colorcode",

        // SNACK STRUCTURE
        "snack.colorcode",
        "snackcatalog.snackcategories",
        "snackcategory.snacks",

        // OTHER
        "artist.colorcode",
        "song.colorcode",
        "person.colorcode",
        "product.colorcode",
        "location.colorcode",
        "artist.songs",
        "song.artist",
        "list.elements"
      ]
    },
    preview
  );

  return (
    <>
      <HeadComponent socialTags={socialtags} />
      <StoryblokComponent menu={menu} blok={story.content} />
    </>
  );
}

export async function getStaticProps({ params }) {
  let slug = params.slug ? params.slug.join("/") : "home";

  const sbParams = {
    version: "draft",
    resolve_relations: [
      "hero.colorcode",
      "leftrightblock.colorcode",

      "snack.colorcode",
      "snackcatalog.snackcategories",
      "snackcategory.snacks",

      "artist.colorcode",
      "song.colorcode",
      "person.colorcode",
      "product.colorcode",
      "location.colorcode",
      "artist.songs",
      "song.artist",
      "list.elements"
    ]
  };

  const storyblokApi = getStoryblokApi();

  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  if (!data) return { notFound: true };

  let menudata = await storyblokApi.get(`cdn/stories/reusable/headermenu`, sbParams);
  if (!menudata) return { notFound: true };

  const menu = menudata.data.story;

  const title = data.story.name;
  const description =
    data.story.content.tagline ?? `${title}`;

  const socialtags = getTags({
    storyblokSocialTag: data.story.content.socialtag,
    pageDefaults: {
      "og:title": title,
      "og:description": description,
      "og:url": `${process.env.NEXT_PUBLIC_DEPLOY_URL}${slug}`,
    },
  });

  return {
    props: {
      story: data.story,
      key: data.story.id,
      socialtags,
      menu
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get("cdn/links/");

  let paths = [];

  Object.keys(data.links).forEach((key) => {
    const link = data.links[key];
    if (link.is_folder) return;

    const slug = link.slug.split("/");
    paths.push({ params: { slug } });
  });

  return {
    paths,
    fallback: "blocking",
  };
}
