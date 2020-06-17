const express = require("express")
const db = require("../data/config")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        // SELECT * FROM "messages";
        const messages = await db.select("*").from("messages")
        res.json(messages)
    } catch (err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const message = await db.select("*").from("messages").where("id", req.params.id).limit(1)
        res.json(message)
    } catch (error) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const payload = {
            title: req.body.title,
            contents: req.body.contents
        }
        const [messageID] = await db.insert(payload).into("messages")
        const message= await db.first("*").from("messages").where("id", messageID)
        res.status(201).json(message)
    } catch (error) {
        next(err)
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const payload = {
            title: req.body.title,
            contents: req.body.contents
        }
        await db("messages").update(payload).where("id", req.params.id)
        const message= await db.first("*").from("messages").where("id", req.params.id)
        res.json(message)
    } catch (error) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        await db("messages").where("id", req.params.id).del()
        res.status(204).json({message: "message deleted"})
    } catch (error) {
        next(err)
    }
})

module.exports = router