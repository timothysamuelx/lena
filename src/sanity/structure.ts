import { CaseIcon, ImagesIcon, UserIcon } from "./icons";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Portfolio")
    .items([
      // Drag & drop to set the order projects appear on the home page.
      orderableDocumentListDeskItem({ type: "project", title: "Projects", icon: CaseIcon, S, context }),
      S.divider(),
      // Singletons: one document each, opened directly.
      S.listItem()
        .title("Photography")
        .icon(ImagesIcon)
        .child(S.document().schemaType("photography").documentId("photography").title("Photography")),
      S.listItem()
        .title("Profile")
        .icon(UserIcon)
        .child(S.document().schemaType("profile").documentId("profile").title("Profile")),
    ]);
