import { typeModal } from "pages/Directory/Vendors/Components/OperationModal";

export const useDisabled = (mode: string) => {
  if (mode === typeModal.add) {
    return false;
  }
  return true;
};
