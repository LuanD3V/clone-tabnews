import database from "infra/database";

async function status(request, response) {
  const updateAt = new Date().toISOString();
  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const databaseName = process.env.POSTGRES_DB;
  const usedConnectionsResult = await database.query({
    text: `SELECT COUNT(*)::int AS count FROM pg_stat_activity WHERE datname = $1;`,
    values: [databaseName],
  });
  const versionDatabaseResult = await database.query("SHOW server_version;");

  const maxConnections = parseInt(maxConnectionsResult.rows[0].max_connections);
  const usedConnections = usedConnectionsResult.rows[0].count;
  const versionDatabase = versionDatabaseResult.rows[0].server_version;

  response.status(200).json({
    status: "OK",
    update_at: updateAt,
    dependencies: {
      database: {
        max_connections: maxConnections,
        used_connections: usedConnections,
        version: versionDatabase,
      },
    },
  });
}

export default status;
