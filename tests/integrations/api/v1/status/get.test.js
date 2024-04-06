test("Get to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});

test("Get to /api/v1/status should return update date", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const json = await response.json();
  const parseUpdateAt = new Date(json.update_at).toISOString();
  expect(json.update_at).toEqual(parseUpdateAt);
});

test("Get to /api/v1/status should return max connections", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const json = await response.json();
  expect(json.dependencies.database.max_connections).toEqual(100);
});

test("Get to /api/v1/status should return used connections", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const json = await response.json();
  expect(json.dependencies.database.used_connections).toEqual(1);
});

test("Get to /api/v1/status should return database version", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const json = await response.json();
  expect(json.dependencies.database.version).toEqual("16.0");
});
