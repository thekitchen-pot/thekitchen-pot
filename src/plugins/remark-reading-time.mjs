import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

/**
 * @description This plugin uses the mdast-util-to-string package to get the Markdown file’s text.
 * This text is then passed to the reading-time package to calculate the reading time in minutes.
 */
export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}