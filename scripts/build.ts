import pkg from "@/../package.json";
import languageEn from "@/i18n/languages/en.json";
import languageJa from "@/i18n/languages/ja.json";
import { build } from "esbuild";
import { type Metadata, stringify } from "userscript-metadata";

const url = pkg.repository.url.replaceAll(/^git\+|\.git$/g, "");

const fileName = pkg.name.replace(/^userscript-/, "");

const metadata = {
  name: languageEn.translation["userscript.metadata.name"],
  "name:ja": languageJa.translation["userscript.metadata.name"],
  description: languageEn.translation["userscript.metadata.description"],
  "description:ja": languageJa.translation["userscript.metadata.description"],
  version: pkg.version,
  match: "https://www.nicovideo.jp/watch/sm*",
  namespace: url,
  author: pkg.author,
  license: pkg.license,
  grant: "none",
} satisfies Metadata;

await build({
  target: "esnext",
  platform: "browser",
  charset: "utf8",
  entryPoints: ["src/index.ts"],
  bundle: true,
  outfile: `dist/${fileName}.user.js`,
  format: "esm",
  legalComments: "inline",
  banner: {
    js: `
    ${stringify(metadata)}

    // NOTE:
    //   This file was built from ${url}
    //
    //   このスクリプトはこれらのスクリプトにインスパイアされました。先駆者の方々に感謝と敬意を表します。
    //   This script was inspired by the following scripts. I express my gratitude and respect to the pioneers.
    //
    //      - https://github.com/takusan23/NicoruCountFix
    //      - https://greasyfork.org/ja/scripts/482598

    (async () => {
      "use strict";
    `,
  },
  footer: {
    js: "})();",
  },
});
