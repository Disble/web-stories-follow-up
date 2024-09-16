"use client";

import { scrapeNovel } from "#actions/scrape-novel";
import { Button, Input } from "@repo/ui/nextui";
import { useState } from "react";

export default function Publications(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [dataNovel, setDataNovel] = useState<Array<string | null>>();

  const getNovelLink = async () => {
    const response = await scrapeNovel(search);

    if (typeof response === "object" && "error" in response) {
      alert(response.error);
      return;
    }

    setDataNovel(response);
  };

  return (
    <>
      <Input label="Buscar" value={search} onValueChange={setSearch} />
      <Button onClick={getNovelLink}>Buscar</Button>
      {dataNovel?.map((novel) => (
        <div key={novel}>
          <h1>{novel}</h1>
        </div>
      ))}
    </>
  );
}
