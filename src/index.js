const express = require("express");
const cors = require("cors");
const { prisma } = require("./GlobalPrismaClient");
const { ensureErrorObject, ensureNumberOrThrow } = require("./utils");
const app = express();

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
    const userName = req.body?.userName;
    const score = ensureNumberOrThrow(req.body?.score);
    const wordCount = ensureNumberOrThrow(req.body?.wordCount);

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
  } catch (e) {
    const error = ensureErrorObject(e);
    return res.send(`there was an error: ${error.message}`);
  }
});

app.listen(3001);
console.log("listening on port 3001...");
