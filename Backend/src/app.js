import express from "express";
import cors from "cors"

const app = express();

app.use(cors())

// Enable JSON parsing middleware for all routes
app.use(express.json({limit: "16kb"}));

// app.get('/', (req, res) => {
//     res.send('Hello World!');
//   });
// router main point
import transactionRoute from "./routes/transaction.route.js";
import budgetRoutes from "./routes/bedget.route.js"; 
app.use("/api", transactionRoute)
app.use("/api",budgetRoutes);

export default app;