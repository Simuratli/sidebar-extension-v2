export function areUrlsSame(url1: string, url2: string) {
  if (url1 && url2) {
    // Parse the URLs using the URL constructor
    const parsedUrl1 = new URL(url1);
    const parsedUrl2 = new URL(url2);

    // Compare the origin (e.g., https://www.linkedin.com)
    if (parsedUrl1.origin !== parsedUrl2.origin) {
      return false;
    }

    // Compare the pathname up to the part you care about (e.g., /in/ilahas/)
    // This will compare only the first three parts of the pathname
    const path1 = parsedUrl1.pathname.split("/").slice(0, 3).join("/");
    const path2 = parsedUrl2.pathname.split("/").slice(0, 3).join("/");

    return path1 !== path2;
  } else {
    return false;
  }
}

export function removeUnnecessaryIcons(input: string) {
  // Define a regex pattern to match emojis and special characters
  const regexPattern =
    /[\p{Emoji_Presentation}\p{Emoji}\p{Punctuation}\p{Symbol}&$@#%^*()+=\-\\\/<>|~`{}\[\]]+/gu;

  // Replace matched characters with an empty string
  const cleanedInput = input.replace(regexPattern, "");

  // Trim whitespace and return the cleaned result
  return cleanedInput.trim();
}



export const fixUrlWithPathnameAndOrigin = (url: string) => {
  const parsedUrl = new URL(url);
  const cleanedUrl = `${parsedUrl.origin}${parsedUrl.pathname}`;
  return cleanedUrl
}