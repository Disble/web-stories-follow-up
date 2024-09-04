"use client";;
import { LogosDiscordIcon } from "#components/icons/auth/logos-discord-icon";
import { Button } from "@repo/ui/nextui";
import { authenticateWithDiscord } from "./login.action";

export default function Login() {

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-orange-500 via-fuchsia-700 to-teal-500 p-2 sm:p-4 lg:p-8">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-background/60 px-8 pb-10 pt-6 shadow-small backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
        <p className="pb-2 text-xl font-medium">Iniciar sesión</p>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<LogosDiscordIcon className="size-6" />}
            variant="flat"
            onPress={() => authenticateWithDiscord()}
          >
            Continuar con Discord
          </Button>
        </div>
      </div>
    </div>
  );
}
