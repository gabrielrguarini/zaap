export const generateRandomId = (existingIds: string[]): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  const generateId = (): string =>
    Array.from({ length: 6 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length)),
    ).join("");

  const generateUniqueId = (existingIds: string[]): string => {
    const id = generateId();
    if (existingIds.includes(id)) {
      return generateUniqueId(existingIds);
    }
    return id;
  };

  return generateUniqueId(existingIds);
};
