import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

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
      <DialogContent className="w-[calc(100%-2rem)] max-w-3xl">
        <DialogHeader>
          <DialogTitle className={title ? "" : "sr-only"}>
            {title ?? "Detalhes"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {title ?? "Detalhes"}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
