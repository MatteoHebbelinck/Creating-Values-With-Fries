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

        "snack.colorcode",
        "snackcatalog.snackcategories",
        "snackcategory.snacks",
        "contact.colorcode",
        "contact.location",

        "artist.colorcode",
        "song.colorcode",
        "person.colorcode",
        "product.colorcode",
        "location.colorcode",
        "contact.colorcode",
        "artist.songs",
        "song.artist",
        "list.elements",
      ],
    },
    preview
  );

  return (
    <>
      <HeadComponent socialTags={socialtags} />

      {/* ✅ RUIMTE TUSSEN LOGO/MENU EN HERO FOTO */}
      <div style={{ paddingTop: "30px" }}>
        <StoryblokComponent menu={menu} blok={story?.content} />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const slug = params.slug ? params.slug.join("/") : "home";
  const storyblokApi = getStoryblokApi();

  const sbParams = {
    version: "draft",
    resolve_relations: [
      "hero.colorcode",
      "leftrightblock.colorcode",

      "snack.colorcode",
      "snackcatalog.snackcategories",
      "snackcategory.snacks",
      "contact.colorcode",
      "contact.location",

      "artist.colorcode",
      "song.colorcode",
      "person.colorcode",
      "product.colorcode",
      "location.colorcode",
      "contact.colorcode",
      "artist.songs",
      "song.artist",
      "list.elements",
    ],
  };

  // ✅ SAFE fetch met try/catch
  let data = null;
  try {
    const res = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    data = res.data;
  } catch (err) {
    return { notFound: true };
  }

  // fetch menu (zelfde safe pattern)
  let menudata = null;
  try {
    const resMenu = await storyblokApi.get("cdn/stories/reusable/headermenu", sbParams);
    menudata = resMenu.data;
  } catch (err) {
    return { notFound: true };
  }

  const menu = menudata.story;

  const title = data.story.name;
  const description = data.story.content.tagline ?? `${title}`;

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
      menu,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get("cdn/links/");

  const paths = [];

  Object.keys(data.links).forEach((key) => {
    const link = data.links[key];

    if (link.is_folder) return;
    if (link.slug.startsWith("reusable")) return;
    if (!link.slug || link.slug === "") return;

    paths.push({
      params: {
        slug: link.slug.split("/"),
      },
    });
  });

  return {
    paths,
    fallback: "blocking",
  };
}
