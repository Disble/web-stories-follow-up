"use client";
import DataTable, {
  type DataTableColumns,
  type DataTableRenderCell,
} from "@repo/ui/data-table";
import { useQueryStates } from "nuqs";
import { authorSearchParams } from "#components/authors/search-params";
import type { PageNumberPaginationMeta } from "@repo/layer-prisma/utils";
import type { UserListPayload } from "@repo/layer-prisma/model/user/user.interface";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Tooltip,
  useDisclosure,
  User,
} from "@repo/ui/nextui";
import { SolarTrashBinTrashOutline } from "@repo/ui/icons";
import toast from "react-hot-toast";
import { useState } from "react";
import { toggleUserActivation } from "#components/user/user.action";
import { useSession } from "next-auth/react";

const RoleEnum = {
  ADMIN: "Administrador",
  SUPER_ADMIN: "Super Administrador",
};

const isRole = (role: string | null): role is keyof typeof RoleEnum => {
  if (role === null) return false;

  return role in RoleEnum;
};

type UserListPayloadWithSettings = UserListPayload & { actions: number };

const columns: DataTableColumns<UserListPayloadWithSettings> = [
  { key: "name", label: "Nombre" },
  { key: "role", label: "Rol" },
  { key: "active", label: "Activo" },
  { key: "actions", label: "Acciones" },
];

type ListUsersProps = {
  users: UserListPayload[];
  pagination: PageNumberPaginationMeta<true>;
};

export default function ListUsers({
  users,
  pagination,
}: ListUsersProps): JSX.Element {
  const [searchParams] = useQueryStates(authorSearchParams);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userToggle, setUserToggle] = useState<{
    id: string;
    active: boolean;
  } | null>(null);
  const { data: session } = useSession();

  const usersWithSettings = users.map((user) => ({
    ...user,
    actions: 0,
  }));

  const renderCell: DataTableRenderCell<UserListPayloadWithSettings> = (
    user,
    columnKey
  ) => {
    const userKey = columnKey as keyof UserListPayloadWithSettings;

    switch (userKey) {
      case "name":
        return (
          <User
            avatarProps={{ src: user.image ?? undefined }}
            name={user[userKey]}
            description={user.email}
          >
            {user[userKey]}
          </User>
        );
      case "role":
        return (
          <span>{isRole(user[userKey]) ? RoleEnum[user[userKey]] : "-"}</span>
        );
      case "active":
        return (
          <Tooltip
            color="warning"
            content="No puedes desactivar tu propio usuario"
            isDisabled={user.email !== session?.user.email}
          >
            <div>
              <Switch
                size="sm"
                isSelected={user[userKey]}
                onValueChange={(value) => {
                  setUserToggle({ id: user.id, active: value });
                  onOpen();
                }}
                isDisabled={user.email === session?.user.email}
              >
                {user[userKey] ? "Activo" : "Inactivo"}
              </Switch>
            </div>
          </Tooltip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="danger" content="Eliminar usuario">
              <span className="text-lg text-danger cursor-not-allowed opacity-50">
                <SolarTrashBinTrashOutline className="size-5" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return <span>{user[userKey]}</span>;
    }
  };

  const handleToggleUser = async (onClose: () => void) => {
    if (!userToggle) {
      toast.error("No se seleccionó ningún usuario");
      return;
    }

    const res = await toggleUserActivation(userToggle.id, userToggle.active);

    if ("error" in res) {
      toast.error(res.error);
      return;
    }

    toast.success(
      `Usuario ${userToggle.active ? "activado" : "desactivado"} correctamente`
    );

    onClose();
  };

  return (
    <>
      <DataTable
        rows={usersWithSettings}
        columns={columns}
        totalCount={pagination.totalCount}
        totalPages={pagination.pageCount}
        searchParams={searchParams}
        renderCell={renderCell}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {userToggle?.active
                  ? "¿Activar usuario?"
                  : "¿Desactivar usuario?"}
              </ModalHeader>
              <ModalBody>
                <p>
                  {userToggle?.active
                    ? "Una vez activado, el usuario podrá acceder a la plataforma."
                    : "Una vez desactivado, el usuario no podrá acceder a la plataforma."}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleToggleUser(onClose)}
                >
                  {userToggle?.active ? "Sí, activar" : "Sí, desactivar"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
