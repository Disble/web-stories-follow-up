"use server";

import { JSDOM } from "jsdom";

export async function scrapeNovel(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const stories = document.querySelectorAll(".story-parts__part .part-title");
    const allChapters = Array.from(stories).map((story) => story.textContent);
    return allChapters;
  } catch (error) {
    return {
      error: "Error al obtener el contenido de la novela",
    };
  }
}
