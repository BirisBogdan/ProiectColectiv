// Set when a room is opened from the list, so closing its sheet can go back in history
// (the browser's Back then does the same thing) instead of pushing /rooms again.
export const sheetHistory = { openedFromList: false };

/** The room id for /rooms/<id>, or null for /rooms and for pages that are not a room's detail. */
export function selectedRoomId(pathname: string): string | null {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length !== 2 || parts[0] !== "rooms" || parts[1] === "plan") return null;
  return decodeURIComponent(parts[1]);
}
