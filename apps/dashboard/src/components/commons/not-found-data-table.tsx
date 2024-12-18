import { Card, CardBody } from "@nextui-org/react";

export default function NotFoundDataTable(): JSX.Element {
  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md mx-4" shadow="none">
        <CardBody className="p-6">
          <div className="flex flex-col items-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-4 text-secondary"
            >
              <title>Sin datos</title>
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                fill="currentColor"
              />
            </svg>
            <h1 className="text-center text-xl font-semibold text-gray-700">
              Sin datos que mostrar
            </h1>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
