import { CaseIcon } from "./icons";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Portfolio")
    .items([
      // Drag & drop to set the order projects appear on the home page.
      orderableDocumentListDeskItem({ type: "project", title: "Projects", icon: CaseIcon, S, context }),
    ]);
