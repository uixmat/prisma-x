import React from "react";
import type { Metadata } from "next";

// Components
import Modal from "./modal";

export const metadata: Metadata = {
  title: "Add user",
};

export default function AddUser() {
  return <Modal />;
}
