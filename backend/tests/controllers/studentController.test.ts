import request from "supertest";
import app from "../../src/app";
import config from "../../src/config/config";
import jwt from "jsonwebtoken";

describe("StudentController", () => {
  it("should create a new student", async () => {
    const token = jwt.sign({ userId: 1, role: "USER" }, config.app.jwtSecret);
    const response = await request(app)
      .post("/api/students")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "John",
        lastName: "Doe",
        rollNumber: "12345",
        classId: 1,
        schoolId: 1,
        dateOfBirth: "2005-01-01",
        gender: "Male",
        address: "123 Main St",
        contactNumber: "1234567890",
        email: "john.doe@example.com",
      });

    // expect(response.status).toBe(201);
    // expect(response.body).toHaveProperty("id");
  });

  // it("should get all students for a specific school", async () => {
  //   const token = jwt.sign({ userId: 1, role: "USER" }, config.app.jwtSecret);
  //   const response = await request(app)
  //     .get("/api/students/school/1")
  //     .set("Authorization", `Bearer ${token}`);
  //   expect(response.status).toBe(200);
  //   expect(response.body).toBeInstanceOf(Array);
  // });

  // it("should get a student by ID", async () => {
  //   const token = jwt.sign({ userId: 1, role: "USER" }, config.app.jwtSecret);
  //   const response = await request(app)
  //     .get("/api/students/1")
  //     .set("Authorization", `Bearer ${token}`);
  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty("id", 1);
  // });

  // it("should update a student", async () => {
  //   const token = jwt.sign({ userId: 1, role: "USER" }, config.app.jwtSecret);
  //   const response = await request(app)
  //     .put("/api/students/1")
  //     .set("Authorization", `Bearer ${token}`)
  //     .send({ firstName: "Jane" });

  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty("firstName", "Jane");
  // });

  // it("should delete a student", async () => {
  //   const token = jwt.sign({ userId: 1, role: "USER" }, config.app.jwtSecret);
  //   const response = await request(app)
  //     .delete("/api/students/1")
  //     .set("Authorization", `Bearer ${token}`);
  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty(
  //     "message",
  //     "Student deleted successfully"
  //   );
  // });
});
