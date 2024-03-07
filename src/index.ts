import express from "express";
import userRouter from "./routes/user-router";
import chartRouter from "./routes/chart-router";


const PORT = process.env.PORT || 3434;
const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
    res.json({
        name: 'Astro DB',
        description: 'API for Astrological Charts Database',
        version: '1.0.0',
    });
});


app.use('/api/charts', chartRouter);
app.use('/api/users', userRouter);


app.use("*", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
