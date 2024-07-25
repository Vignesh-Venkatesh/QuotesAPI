// ==============================================================================
// Generating Timestamp
const generateTimestamp = () => {
  // Getting timestamp
  const UNIXTimestamp = Date.now();
  const date = new Date(UNIXTimestamp);
  // Format the date in PostgreSQL timestamp format
  const postgresTimestamp = date.toISOString().replace("T", " ").slice(0, -1);

  return postgresTimestamp;
};
// ==============================================================================

module.exports = {
  generateTimestamp,
};
