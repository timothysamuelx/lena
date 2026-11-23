import type { SchemaTypeDefinition } from "sanity";

import { blockTypes } from "./blocks";
import { photography } from "./documents/photography";
import { profile } from "./documents/profile";
import { project } from "./documents/project";
import { blockSettings } from "./objects/blockSettings";
import { media } from "./objects/media";
import { richText } from "./objects/richText";

export const schemaTypes: SchemaTypeDefinition[] = [project, photography, profile, blockSettings, media, richText, ...blockTypes];

/** Document types with exactly one document, edited in place (fixed IDs). */
export const singletonTypes = new Set(["photography", "profile"]);
