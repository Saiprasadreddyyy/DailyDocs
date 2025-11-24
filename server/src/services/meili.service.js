import { MeiliSearch } from "meilisearch";

const meiliClient = new MeiliSearch({
  host: "http://localhost:7700",     // FIXED
  apiKey: "WEAREUSINGMEILI"          // Your chosen key
});

const docsIndex = meiliClient.index("documents");

async function initMeili() {
  await docsIndex.updateSettings({
    searchableAttributes: ["title", "content"],
    displayedAttributes: ["id", "title", "content", "type"]
  });

  console.log("MeiliSearch index ready");
}

initMeili();

export { meiliClient, docsIndex, initMeili};
