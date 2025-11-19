import {
  Transition,
  Dialog as HeadlessDialog,
  TransitionChild,
} from "@headlessui/react";
import { PropsWithChildren } from "react";
import { Fragment } from "react/jsx-runtime";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
};
function Dialog({ isOpen, onClose, children }: PropsWithChildren<DialogProps>) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-50" onClose={onClose}>
        {/* BACKDROP */}
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </TransitionChild>
        {children}
      </HeadlessDialog>
    </Transition>
  );
}

export default Dialog;
