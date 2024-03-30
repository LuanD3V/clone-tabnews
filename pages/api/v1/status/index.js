function status(request, response) {
  const updateAt = new Date().toISOString();
  response.status(200).json({ status: "OK", update_at: updateAt });
}

export default status;
