const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const database = require("./configs/database");
const { swaggerUi, swaggerDocs } = require("./docs/swagger");

require("dotenv").config();

const routesApiVer1 = require("./routes/index.route");
const app = express();
const port = process.env.PORT;

database.connect();

// Enable cors
app.use(cors());
app.options("*", cors());

// Parse application/json
app.use(express.json());

// Routes Version 1
routesApiVer1(app);

// Use swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Cookie parser
app.use(cookieParser());

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
