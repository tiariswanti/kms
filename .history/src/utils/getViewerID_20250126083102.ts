import { v4 as uuidv4 } from "uuid";

export function getViewerId() {
  let viewerId = localStorage.getItem("viewerId");

  if (!viewerId) {
    viewerId = uuidv4();

    // Simpan viewerId ke localStorage
    localStorage.setItem("viewerId", viewerId);
  }

  return viewerId;
}
