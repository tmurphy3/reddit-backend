const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");

//middleware
app.use(cors());
app.use(express.json()); // allows access to req.body

// routes
app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
