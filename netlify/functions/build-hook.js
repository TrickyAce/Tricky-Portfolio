exports.handler = async (event, context) => {
  // This function can be called by Netlify CMS to trigger a rebuild
  // You can add webhook logic here if needed

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Build triggered" }),
  }
}
