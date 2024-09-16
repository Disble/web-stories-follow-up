import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@repo/ui/nextui";
import { type JSX, useState } from "react";
import toast from "react-hot-toast";

import type { CrudDataTableProps } from "#crud-data-table";
import type { DataTableRow, DataTableSearchParams } from "#data-table";
import { SolarTrashBinTrashOutline } from "#icons";

type UseCDTModalProps<
  Row extends DataTableRow,
  SearchParams extends DataTableSearchParams,
> = Pick<
  CrudDataTableProps<Row, SearchParams>,
  "renderDeleteModalBody" | "onDeleteRow"
>;

export default function useCDTModal<
  Row extends DataTableRow,
  SearchParams extends DataTableSearchParams,
>({ renderDeleteModalBody, onDeleteRow }: UseCDTModalProps<Row, SearchParams>) {
  const [selectedRow, setSelectedRow] = useState<null | Row>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const openDeleteModal = (row: Row) => {
    setSelectedRow(row);
    onOpen();
  };

  const handleOnCloseModal = (onClose: () => void) => {
    if (!selectedRow) {
      toast.error("Debe seleccionar un registro para eliminarlo");
      return;
    }
    if (onDeleteRow) onDeleteRow(selectedRow.id);
    onClose();
  };

  const modal = (): JSX.Element => (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            {renderDeleteModalBody &&
            selectedRow &&
            !!renderDeleteModalBody(selectedRow).header ? (
              renderDeleteModalBody(selectedRow).header
            ) : (
              <ModalHeader className="flex flex-col gap-1">
                ¿Eliminar registro?
              </ModalHeader>
            )}
            {renderDeleteModalBody &&
            selectedRow &&
            !!renderDeleteModalBody(selectedRow).body ? (
              renderDeleteModalBody(selectedRow).body
            ) : (
              <ModalBody className="flex flex-col items-center">
                <SolarTrashBinTrashOutline className="h-16 w-16 stroke-secondary stroke-[1.5]" />
                <p className="font-serif">
                  Esta acción no se puede deshacer. Esto borrará este registro
                  de forma permanente de nuestros servidores.
                </p>
              </ModalBody>
            )}
            <ModalFooter>
              <Button color="default" variant="bordered" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="secondary"
                onPress={() => handleOnCloseModal(onClose)}
              >
                Sí, eliminar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );

  return { Modal: modal, openDeleteModal, onOpen };
}
