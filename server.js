const express = require("express")
const cors = require('cors');
const app = express()
let comments = []
app.use(express.json())
app.use(cors());
app.post("/comments", (req, res) => {
    if (req.body) {
        comments.push({
            id: req.body.id,
            author: req.body.author,
            text: req.body.text,
            avatar: req.body.avatar,
            commId: req.body.commId,
            date: req.body.date
        })
        res.status(201).json({ message: "Comment added" });
    } else {
        res.status(201).json({message: "error"})
    }
})
app.get("/comments", (req, res) => {
    if (Object.keys(req.query).length === 0) {
        res.json(comments)
    }
})


const server = app.listen(8000, () => {
    console.log("server start")
})

app.use((err) => {
    console.error(err.statusMessage)
})

server.setTimeout(90000)