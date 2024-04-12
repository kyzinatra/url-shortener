import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import mongoose from "./src/libs/integrations/db.integration";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [mongoose()],
  adapter: vercel()
});