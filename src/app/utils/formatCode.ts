'use client';
import * as prettier from 'prettier/standalone';
import parserGraphql from "prettier/plugins/graphql";
import parserBabel from "prettier/plugins/babel";

export const formatCode = async (code: string, type: string) => {
  try {
    let parser;
    if (type === "graphql") {
      parser = "graphql";
    } else if (type === "rest") {
      parser = "babel";
    } else return;

    const prettierVersion = prettier.format(code, {
      parser: parser,
      plugins: [parserGraphql, parserBabel],
      trailingComma: "es5",
      tabWidth: 2,
      semi: true,
      singleQuote: true,
      printWidth: 120
    });
    return prettierVersion;
  } catch (error) {
    console.error("Formatting error:", error);
  }
};
