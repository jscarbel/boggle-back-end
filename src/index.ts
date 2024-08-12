import express from "express";
import cors from "cors";
import { prisma } from "./GlobalPrismaClient";
import { ensureErrorObject, ensureNumberOrThrow } from "./utils";
const app = express();
const PORT = process.env.PORT !== undefined ? Number(process.env.POR) : 10000;
app.use(cors());
app.use(express.json());
app.use(require("body-parser").urlencoded({ extended: false }));

app.get("/scores", async function (req, res) {
  const scores = await prisma.score.findMany({
    take: 10,
    orderBy: {
      score: "desc",
    },
  });
  res.send(scores);
});

app.post("/score", async function (req, res) {
  try {
    const userName: string = req.body?.userName;
    const score: number = ensureNumberOrThrow(req.body?.score);
    const wordCount: number = ensureNumberOrThrow(req.body?.wordCount);

    if (
      userName === undefined ||
      score === undefined ||
      wordCount === undefined
    ) {
      return res
        .status(400)
        .send(
          "Faulty request body. Please include userName, score, and wordCount!"
        );
    }

    const newScore = await prisma.score.create({
      data: {
        userName,
        score,
        wordCount,
      },
    });

    return res.send(newScore);
  } catch (e: unknown) {
    const error: Error = ensureErrorObject(e);
    return res.send(`there was an error: ${error.message}`);
  }
});

app.listen(PORT);
console.log(`listening on port ${PORT}...`);
