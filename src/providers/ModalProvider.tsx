"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ModalId = "new-folder" | null;
type ModalContextValue = {
  activeModal: ModalId;
  openModal: (id: NonNullable<ModalId>) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalId>(null);

  const openModal = (id: NonNullable<ModalId>) => setActiveModal(id);
  const closeModal = () => setActiveModal(null);

  const value = {
    activeModal,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
}
