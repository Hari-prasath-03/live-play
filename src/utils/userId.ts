export function getOrCreateUserId() {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("userId", userId);
  }
  return userId;
}

export function genRandomId(count: number) {
  return Array.from({ length: count }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
}
