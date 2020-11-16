const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const PORT = process.env.PORT || 9000;

//middleware
app.use(cors());
app.use(express.json()); // allows access to req.body

// routes
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
