"use client";
import { FormSection } from "@repo/ui/form";
import { Button, TimeInput, type TimeInputValue } from "@repo/ui/nextui";
import { useState } from "react";
import { parseAbsoluteToLocal } from "@internationalized/date";

export default function PublicationSettings(): JSX.Element {
  const [date, setDate] = useState<TimeInputValue>(
    parseAbsoluteToLocal("2021-04-07T18:45:22Z")
  );

  return (
    <div className="max-w-4xl mx-auto">
      <FormSection
        title="Hora recurrente de publicación"
        description="La hora de publicación será la misma para todas las novelas. Esta se realizará una vez al día. Si por algún motivo no se publica, se reintentará automáticamente al día siguiente."
      >
        <TimeInput
          label="Hora de publicación"
          value={date}
          onChange={setDate}
        />
        <Button color="primary">Guardar</Button>
      </FormSection>
    </div>
  );
}
