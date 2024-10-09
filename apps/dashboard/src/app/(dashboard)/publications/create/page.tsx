import CreatePublication from "#components/publications/create/create-publication";

export default async function Page(): Promise<JSX.Element> {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <CreatePublication />
    </div>
  );
}
