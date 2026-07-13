import TurndownService from "turndown";

export const turndownService = new TurndownService({
  headingStyle: "atx",
  hr: "---",
  bulletListMarker: "*",
});

turndownService.escape = text => text;
