// Fields
const express = require("express")
const path = require("path")
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, "assets")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.listen(port, () => {
    console.log('\x1b[34m%s\x1b[0m\x1b[35m%s\x1b[0m', `Express http server running on port ${port}.\nLocal server address: `, `http://localhost:${port}`)
})