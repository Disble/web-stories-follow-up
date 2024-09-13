import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import type {
  FieldValues,
  UseControllerProps,
  UseFormReturn,
} from "react-hook-form";

import { FormTextarea } from "./form-textarea";

type IntructionsModalProps<FormData extends FieldValues> = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  control: UseFormReturn<FormData>["control"];
  name: UseControllerProps<FormData>["name"];
  title?: string;
};

export default function FormTextareaModal<TFieldValues extends FieldValues>({
  isOpen,
  onOpenChange,
  control,
  name,
  title,
}: IntructionsModalProps<TFieldValues>): JSX.Element {
  return (
    <Modal
      size="2xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        <>
          {title && (
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          )}
          <ModalBody>
            <FormTextarea
              control={control}
              name={name}
              placeholder="Ingrese instrucciones"
              classNames={{
                input: "resize-y min-h-[40vh]",
              }}
            />
          </ModalBody>
          <ModalFooter />
        </>
      </ModalContent>
    </Modal>
  );
}
