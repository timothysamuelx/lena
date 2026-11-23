import { ImagesIcon } from "../../icons";
import { defineArrayMember, defineField, defineType } from "sanity";

/** Singleton: the photos on the /photography page. */
export const photography = defineType({
  name: "photography",
  title: "Photography",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      description: "Drop several images at once to upload them. Drag to reorder — the page shows them in this order.",
      options: { layout: "grid" },
      of: [
        defineArrayMember({
          name: "photo",
          title: "Photo",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "location", title: "Location", type: "string", description: "e.g. Ella, Sri Lanka" }),
            defineField({ name: "year", title: "Year", type: "string" }),
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              description: "Describe the photo for screen readers.",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { media: "photos.0" },
    prepare: ({ media }) => ({ title: "Photography", media }),
  },
});
