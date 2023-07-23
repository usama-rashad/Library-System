import app from "../../main";
import request from "supertest";
import mongoose from "mongoose";

describe("Login system status", () => {
  test("Login system should return status code 200", async () => {
    const response = await request(app).get("/api/users/status");
    expect(response.statusCode).toBe(200);
  });
  test("Login system should return status key", async () => {
    const response = await request(app).get("/api/users/status");
    expect(response.body.status).toBeDefined();
  });
  test("Login system should return message key", async () => {
    const response = await request(app).get("/api/users/status");
    expect(response.body.message).toBeDefined();
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
});

describe("Signup user test", () => {
  beforeAll(() => {
    console.log("Create a dummy users table");
  });
  test("Add a test user", async () => {
    const response = await request(app).put("/api/users/signup");
    expect(response.statusCode).toBe(200);
    done();
  }),
    afterAll(async () => {
      await mongoose.disconnect();
    });
});
