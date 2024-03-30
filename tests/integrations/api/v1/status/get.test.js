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
