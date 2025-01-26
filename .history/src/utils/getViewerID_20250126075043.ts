// utils/getViewerId.js
import { v4 as uuidv4 } from "uuid";

export function getViewerId() {
  // Cek apakah viewerId sudah ada di localStorage
  let viewerId = localStorage.getItem("viewerId");

  if (!viewerId) {
    // Jika belum ada, buat viewerId baru
    viewerId = uuidv4();

    // Simpan viewerId ke localStorage
    localStorage.setItem("viewerId", viewerId);
  }

  return viewerId;
}
