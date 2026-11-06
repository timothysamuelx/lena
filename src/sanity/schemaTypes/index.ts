import type { SchemaTypeDefinition } from "sanity";

import { blockTypes } from "./blocks";
import { project } from "./documents/project";
import { blockSettings } from "./objects/blockSettings";
import { media } from "./objects/media";
import { richText } from "./objects/richText";

export const schemaTypes: SchemaTypeDefinition[] = [project, blockSettings, media, richText, ...blockTypes];
