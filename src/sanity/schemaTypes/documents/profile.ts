import { UserIcon } from "../../icons";
import { defineField, defineType } from "sanity";

/** Singleton: Nandun's portrait (shown in the home page hero). */
export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      description: "Shown in the home page hero, cropped to 4:5. Set the hotspot on the face so it stays in frame.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Defaults to “Portrait of Nandun Nethanga Perera”.",
        }),
      ],
    }),
  ],
  preview: {
    select: { media: "portrait" },
    prepare: ({ media }) => ({ title: "Profile", media }),
  },
});
