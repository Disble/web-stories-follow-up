"use client";

import { Card, CardBody, CardHeader, Divider, Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";

export default function VerifyUser(): JSX.Element {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary via-teal-500 to-amber-200">
      <Card className="max-w-md" isBlurred>
        <CardHeader className="flex justify-center">
          <h1 className="text-2xl font-bold text-center text-primary">
            Verificación de cuenta
          </h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="text-center text-foreground mb-4">
            Un administrador debe verificar su cuenta antes de que pueda
            ingresar.
          </p>
          <p className="text-center text-foreground/70 text-sm mb-6">
            Por favor, intente iniciar sesión más tarde para comprobar si su
            cuenta ha sido verificada.
          </p>
          <Button
            color="secondary"
            variant="flat"
            onClick={() => signOut()}
            fullWidth
          >
            Regresar a la página de inicio
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
