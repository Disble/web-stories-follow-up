"use client";

import { LogosDiscordIcon } from "@repo/ui/icons";
import { Button, Card, CardHeader, CardBody } from "@repo/ui/nextui";
import { authenticateWithDiscord } from "./login.action";

export default function Login({ error }: { error?: string }) {
  return (
    <div className="flex flex-col gap-3 h-svh w-screen items-center justify-center bg-gradient-to-br from-primary via-teal-500 to-amber-200 p-2 sm:p-4 lg:p-8">
      <Card className="w-full max-w-sm bg-background/60 shadow-small backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
        <CardHeader className="pb-2">
          <h2 className="text-xl font-medium">Iniciar sesión</h2>
        </CardHeader>
        <CardBody className="py-4">
          <Button
            startContent={<LogosDiscordIcon className="size-6" />}
            variant="flat"
            onPress={() => authenticateWithDiscord()}
            className="text-foreground font-medium"
          >
            Continuar con Discord
          </Button>
        </CardBody>
      </Card>
      {error && (
        <Card className="max-w-sm" isBlurred>
          <CardBody>
            <p className="text-danger text-sm">
              Tuvimos un error al iniciar sesión, por favor intenta de nuevo más
              tarde.
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
