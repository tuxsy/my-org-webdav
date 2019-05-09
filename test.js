const { createClient } = require("webdav");
 
const client = createClient(
    "http://localhost:1900/org"
);

// Get directory contents
async function main () {
  try {
    const directoryItems = await client.getDirectoryContents("/");

    console.log(directoryItems)
  } catch (error) {
    console.error(error)
  }
}

main()