"use client";

import ModalNewFolder from "@/components/modals/new-folder";
import { useModal } from "@/providers/ModalProvider";

const Modals = () => {
  const { activeModal, closeModal } = useModal();
  return (
    <div className="modals-list z-50">
      {activeModal === "new-folder" && <ModalNewFolder onClose={closeModal} />}
    </div>
  );
};

export default Modals;
