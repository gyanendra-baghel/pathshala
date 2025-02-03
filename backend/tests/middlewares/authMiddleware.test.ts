import app from "../../src/app";
import jwt from "jsonwebtoken";
import request from "supertest";
import config from "../../src/config/config";

describe("authMiddleware", () => {
  it("should return 401 if no token is provided", async () => {
    const response = await request(app).get("/api/auth/");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized access. Token missing."
    );
  });

  it("should return 401 if an invalid token is provided", async () => {
    const response = await request(app)
      .get("/api/auth/")
      .set("Authorization", "Bearer invalidtoken");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized access. Invalid token."
    );
  });

  it("should return 200 if a valid token is provided", async () => {
    const token = jwt.sign({ userId: 1, role: "USER" }, config.app.jwtSecret);
    const response = await request(app)
      .get("/api/auth/")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Authenticated");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("userId", 1);
    expect(response.body.user).toHaveProperty("role", "USER");
  });
});
