// functions/StoryBlokImageHelper.js

// url: storyblok image url (bv. https://a.storyblok.com/....)
// options: { width, height, smart, fit, filters }
export function modifyStoryBlokImage(
  url,
  { width, height, smart, fit, filters } = {}
) {
  // Niks? Dan kunnen we niets verbeteren, gewoon teruggeven
  if (!url || typeof url !== "string") {
    return url;
  }

  let originalUrl;

  // Probeer de URL te parsen. Als dit mislukt, niets aanpassen.
  try {
    originalUrl = new URL(url);
  } catch (e) {
    console.error("modifyStoryBlokImage: invalid URL:", url, e);
    return url;
  }

  const originalPath = originalUrl.pathname;

  // Alleen Storyblok-afbeeldingen aanpassen
  if (originalUrl.hostname !== "a.storyblok.com") {
    return originalUrl.href;
  }

  // SVG's niet resizen via de image-service
  if (originalPath.endsWith(".svg")) {
    return originalUrl.href;
  }

  const originalDimensions = GetOriginalDimensions(url);
  let resultUrl = "https://img2.storyblok.com";

  const widthSpecified = typeof width === "number";
  const heightSpecified = typeof height === "number";

  let newWidth = 0,
    newHeight = 0;
  const ratioSpecified =
    widthSpecified && heightSpecified ? width / height : undefined;

  if (!widthSpecified && !heightSpecified) {
    newWidth = originalDimensions.width;
    newHeight = originalDimensions.height;
  } else {
    if (widthSpecified && width > originalDimensions.width) {
      newWidth = originalDimensions.width;
      height = ratioSpecified ? Math.round(newWidth / ratioSpecified) : height;
    }
    if (widthSpecified && !(width > originalDimensions.width)) {
      newWidth = width;
    }
    if (heightSpecified && height > originalDimensions.height) {
      newHeight = originalDimensions.height;
      newWidth = ratioSpecified
        ? Math.round(newHeight * ratioSpecified)
        : newWidth;
    }
    if (heightSpecified && !(height > originalDimensions.height)) {
      newHeight = height;
    }
  }

  if (fit) {
    resultUrl += "/fit-in";
  }

  if (widthSpecified || heightSpecified) {
    resultUrl += `/${newWidth}x${newHeight}`;
  }

  if (smart) {
    resultUrl += "/smart";
  }
  if (filters) {
    resultUrl += `/filters:${filters}`;
  }

  resultUrl += originalPath;
  return resultUrl;
}

export function GetOriginalDimensions(storyBlokUrl) {
  if (!storyBlokUrl || typeof storyBlokUrl !== "string") {
    return { width: 0, height: 0 };
  }

  let storyBlokPath;
  try {
    storyBlokPath = new URL(storyBlokUrl).pathname;
  } catch (e) {
    console.error("GetOriginalDimensions: invalid URL:", storyBlokUrl, e);
    return { width: 0, height: 0 };
  }

  const parts = storyBlokPath.split("/");
  if (parts.length < 4) {
    return { width: 0, height: 0 };
  }

  const dimensionPart = parts[3]; // bv. "427x640"
  const subParts = dimensionPart.split("x");

  return {
    width: Number(subParts[0]) || 0,
    height: Number(subParts[1]) || 0,
  };
}

// imageSizes is an array of objects {width: int, height: int, smart: bool, fit: bool, filters: string}
// breakpoints is an array of int
// a width is needed!
export function getResponsiveStoryBlokImageSet(
  url,
  alt,
  imageSizes,
  breakpoints,
  className
) {
  // Geen url? Geen afbeelding renderen, voorkomt crashes.
  if (!url) {
    console.warn("getResponsiveStoryBlokImageSet: no url provided");
    return null;
  }

  const lastImageSize = imageSizes[imageSizes.length - 1];
  const src = modifyStoryBlokImage(url, {
    width: lastImageSize.width,
    height: lastImageSize.height,
    smart: lastImageSize.smart,
    fit: lastImageSize.fit,
    filters: lastImageSize.filters,
  });

  let srcset = "";
  imageSizes.forEach((image, i) => {
    if (i !== 0) {
      srcset += ", ";
    }
    srcset +=
      modifyStoryBlokImage(url, {
        width: image.width,
        height: image.height,
        smart: image.smart,
        fit: image.fit,
        filters: image.filters,
      }) +
      " " +
      image.width +
      "w";
  });

  let sizes = "";
  if (!breakpoints || !breakpoints.length) {
    sizes = "(min-width: 850px) 50vw, 100vw";
  } else {
    sizes = imageSizes[0].width + "px" || "100vw";

    breakpoints.forEach((bp, i) => {
      sizes =
        "(min-width: " +
        (bp || 0) +
        "px) " +
        (imageSizes[i + 1].width + "px" || "100vw") +
        ", " +
        sizes;
    });
  }

  return (
    <>
      <img
        className={[className, "lazyload"].join(" ")}
        sizes={sizes}
        data-srcset={srcset}
        data-src={src}
        src={modifyStoryBlokImage(url, { width: 32, height: 32 })}
        alt={alt}
      />
    </>
  );
}

export function getDefaultStoryBlokImageSet(
  url,
  alt,
  { largestImageWidth, largestImageHeigth, smart, fit, filters },
  breakpoint,
  className
) {
  if (!url) {
    console.warn("getDefaultStoryBlokImageSet: no url provided");
    return null;
  }

  const imageSizes = [
    {
      width: largestImageWidth * 0.5,
      height: largestImageHeigth * 0.5,
      smart: smart,
      fit: fit,
      filters: filters,
    },
    {
      width: largestImageWidth,
      height: largestImageHeigth,
      smart: smart,
      fit: fit,
      filters: filters,
    },
  ];
  const breakpoints = [breakpoint];
  return getResponsiveStoryBlokImageSet(
    url,
    alt,
    imageSizes,
    breakpoints,
    className
  );
}
