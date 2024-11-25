import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<Props> = ({
  open,
  onOpenChange,
  title,
  children,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#181818]  text-white border-none w-96 md:w-[950px]">
        <DialogHeader>
          <DialogTitle className="text-title-small">{title}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-auto p-2">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
