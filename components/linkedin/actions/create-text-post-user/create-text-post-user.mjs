import linkedin from "../../linkedin.app.mjs";

export default {
  key: "linkedin-create-text-share-user",
  name: "Create a Simple Post (User)",
  description:
    "Create post on LinkedIn using text, URL or article. [See the docs](https://docs.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/ugc-post-api?tabs=http#create-ugc-posts) for more information",
  version: "0.0.6",
  type: "action",
  props: {
    linkedin,
    type: {
      propDefinition: [
        linkedin,
        "type",
      ],
      reloadProps: true,
    },
    visibility: {
      propDefinition: [
        linkedin,
        "visibility",
      ],
    },
    text: {
      propDefinition: [
        linkedin,
        "text",
      ],
    },
  },
  async additionalProps() {
    if (this.type === "ARTICLE") {
      return {
        originalUrl: {
          type: "string",
          label: "Article Url",
          description:
            "URL whose content is summarized. content may not have a corresponding url for some entities. Maximum length is 8192 characters.",
        },
        thumbnail: {
          type: "string",
          label: "Thumbnail Url",
          description: "The thumbnail saved from the ingestion of this article",
        },
        title: {
          type: "string",
          label: "Title",
          description: "The title of this article",
        },
      };
    } else {
      return {
        text: {
          type: "string",
          label: "Text",
          description: "Text to be posted on LinkedIn timeline",
        },
        originalUrl: {
          type: "string",
          label: "Media URL",
          description:
            "URL for some media, such as an image",
        },
      };
    }
  },
  async run({ $ }) {
    const response = await this.linkedin.createPost({
      $,
      type: this.type,
      text: this.text,
      originalUrl: this.originalUrl,
      thumbnail: this.thumbnail,
      title: this.title,
      visibility: this.visibility,
    });
    $.export("$summary", "Successfully created a new Post as User");
    return response;
  },
};
