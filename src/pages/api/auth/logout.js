export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  // Clear the access and refresh tokens by setting them to expired
  res.setHeader("Set-Cookie", [
    "accessToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict",
    "refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict"
  ]);

  // If you store refresh tokens in DB, you should also remove/revoke them here

  return res.status(200).json({ success: true, message: "Logged out successfully" });
}