"use server";

import puppeteer from "puppeteer";

export async function scrapeNovel(url: string) {
  try {
    let allChapters: Array<string | null> = [];

    await (async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(url, {
        waitUntil: "networkidle0",
        timeout: 50000,
      });

      allChapters = await page.evaluate(() => {
        const elements = document.querySelectorAll(
          ".story-parts__part .part-title"
        );
        return Array.from(elements).map((el) => el.textContent);
      });

      await browser.close();
    })();

    return allChapters;
  } catch (error) {
    return {
      error: "Error al obtener el contenido de la novela",
    };
  }
}
