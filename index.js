const app = require("./server/app");

const port = process.env.PORT || 3004;

app.listen(port, () => {
  console.info("Listening to", port, process.env.NODE_ENV);
});
