import express from "express";
import cors from "cors";
import { prisma } from "./GlobalPrismaClient";
const app = express();

app.use(cors());

app.get("/scores", async function (req, res) {
  const scores = await prisma.score.findMany({
    orderBy: {
      score: "desc",
    },
  });
  res.send(scores);
});

app.post("/score", function (req, res) {
  res.send("This is the score");
});

app.listen(3001);
