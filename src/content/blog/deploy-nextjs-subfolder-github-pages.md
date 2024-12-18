---
title: "How to Deploy a Next.js Subfolder to GitHub Pages"
pubDate: "18.12.2024"
heroImage: "/blog/nextjs-subfolder-github-pages.webp"
description: "Deploy a Next.js project located in a subfolder to GitHub Pages using pnpm"
---

When working on a project with a multi-repo structure, such as in my [Attachment Lyrics Matcher](https://maxzirps.github.io/attachment-lyrics-matcher/), you might encounter challenges deploying the Next.js frontend to GitHub Pages.

For instance, your project structure might look like this:

```
project
│   README.md
└───backend
│   │   ...
└───frontend
    │   package.json
    |   ...
```

Deploying the `frontend` folder to GitHub Pages doesn’t work out of the box. However, with the steps below, you’ll have it up and running in no time.

## Step 1: Adjust Your `next.config.ts`

The `next.config.ts` file needs to specify the correct `basePath` for GitHub Pages, but only when in production mode.

- Replace `<YOUR_REPO_NAME>` with the name of your GitHub repository.
- The `basePath` is only required in production. During development, this should remain unset to avoid issues.

```ts
// next.config.ts
import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  basePath: isProduction ? "/<YOUR_REPO_NAME>" : "",
  output: "export",
};

export default nextConfig;
```

## Step 2: Configure GitHub Actions

To deploy your Next.js frontend using GitHub Actions, the key is setting the correct `working-directory`.

Other configurations here account for using <span class="font-mono">pnpm</span>.

:::caution

If you use npm or yarn instead, refer to the [default GitHub Action YAML](https://github.com/actions/starter-workflows/blob/main/pages/nextjs.yml) for their configurations.

:::

```yaml
# .github/workflows/nextjs.yaml
name: Deploy Frontend

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20]
    defaults:
      run:
        working-directory: <NAME_OF_SUBFOLDER> # Set working directory to subfolder

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Detect package manager
        id: detect-package-manager
        run: |
          if [ -f "pnpm-lock.yaml" ]; then
            echo "manager=pnpm" >> $GITHUB_OUTPUT
            echo "command=install" >> $GITHUB_OUTPUT
            echo "runner=pnpm" >> $GITHUB_OUTPUT
            exit 0
          else
            echo "Unable to determine package manager"
            exit 1
          fi

      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          cache-dependency-path: frontend/pnpm-lock.yaml
          node-version: ${{ matrix.node-version }}
          cache: "pnpm"

      - name: Setup Pages
        uses: actions/configure-pages@v5
        with:
          static_site_generator: next

      - name: Restore cache
        uses: actions/cache@v4
        with:
          path: .next/cache
          key: ${{ runner.os }}-nextjs-${{ hashFiles('pnpm-lock.yaml', 'yarn.lock', 'package-lock.json') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx') }}
          restore-keys: |
            ${{ runner.os }}-nextjs-${{ hashFiles('pnpm-lock.yaml', 'yarn.lock', 'package-lock.json') }}-

      - name: Install dependencies
        run: pnpm install

      - name: Build with Next.js
        run: pnpm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: frontend/out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## That’s It!

After completing these steps, your Next.js project should successfully deploy to GitHub Pages.
