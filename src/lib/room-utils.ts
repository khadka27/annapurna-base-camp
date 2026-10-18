export interface RoomSlugInput {
  name: string;
}

export function getRoomSlug(room: RoomSlugInput): string {
  return room.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
