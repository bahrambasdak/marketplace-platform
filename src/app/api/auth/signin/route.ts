export async function POST() {
  return fetch(`${process.env.NEXT_PUBLIC_CLASSBON_URL}/identity/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
