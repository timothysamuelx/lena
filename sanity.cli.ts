/**
 * Config for the Sanity CLI (`npx sanity …`), e.g. deploying the GraphQL API,
 * importing the sample dataset, or managing CORS origins.
 */
import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineCliConfig({ api: { projectId, dataset } });
