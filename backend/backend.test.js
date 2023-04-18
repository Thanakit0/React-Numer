const request = require("supertest");
const app = require("./index.js");
const jwt = require("jsonwebtoken");

const secretKeys = "test";

describe("GET /gettoken/:name", () => {
  test("should return a JWT token", async () => {
    const res = await request(app).get("/gettoken/arm").expect(200);
    console.log(res.text);
    const decoded = jwt.verify(res.text, secretKeys);
    expect(decoded.user).toBe("arm");
  });
});

test("Querry", async () => {
  const response = await request(app).get("/rootofequation");
  expect(response.statusCode).toBe(200);
  expect(response.text).toBe(
    "[{\"ID\":1,\"Equation\":\"2x^3-2x-5\",\"Xl\":0,\"Xr\":2,\"X_point\":4,\"N\":5},{\"ID\":2,\"Equation\":\"4/(2x-1)\",\"Xl\":0,\"Xr\":2,\"X_point\":4,\"N\":5},{\"ID\":3,\"Equation\":\"x * log10(x) - 1.2\",\"Xl\":2,\"Xr\":4,\"X_point\":4,\"N\":5},{\"ID\":4,\"Equation\":\"x-cos(x)\",\"Xl\":0,\"Xr\":2,\"X_point\":4,\"N\":5},{\"ID\":5,\"Equation\":\"x^3+3*x^2+12*x+8\",\"Xl\":-1,\"Xr\":2,\"X_point\":4,\"N\":5},{\"ID\":6,\"Equation\":\"x^3-x-1\",\"Xl\":0,\"Xr\":2,\"X_point\":4,\"N\":5},{\"ID\":7,\"Equation\":\"x^3+2x^2+x-1\",\"Xl\":0,\"Xr\":2,\"X_point\":4,\"N\":5},{\"ID\":8,\"Equation\":\"x^3-2x-5\",\"Xl\":0,\"Xr\":3,\"X_point\":4,\"N\":5},{\"ID\":9,\"Equation\":\"x^3-x+1\",\"Xl\":-2,\"Xr\":3,\"X_point\":4,\"N\":5},{\"ID\":10,\"Equation\":\"2^x-x-1.7\",\"Xl\":1,\"Xr\":3,\"X_point\":4,\"N\":5}]"
    );
});

test("Querry2", async () => {
  const response = await request(app).get("/rootofequation/1");
  expect(response.statusCode).toBe(200);
  expect(response.text).toBe(
    "[{\"ID\":1,\"Equation\":\"2x^3-2x-5\",\"Xl\":0,\"Xr\":2,\"X_point\":4,\"N\":5}]"
    );
});