const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

let data = [{ id: 0, name: 'express', age: 30, gender: 'male' }, { id: 1, name: 'kiwi', age: 20, gender: 'female' }]
let count = 2
app.get('/', (req, res) => {
    res.send(data)
})

app.post('/', (req, res) => {
    if (req.body.name && typeof req.body.age === 'number' && req.body.gender.toLowerCase() === "male" || req.body.gender.toLowerCase() === "female") {
        let body = req.body
        body.id = count
        data.push(body)
        count++
        res.send(data)
    }
    else {
        res.status(406).send("Unvalid")
    }
})

app.put('/', (req, res) => {
    if (req.body.id <= count && req.body.id >= 0) {
        if (req.body.name) {
            data.forEach((element) => {
                if (req.body.id === element.id) element.name = req.body.name
            })
        }
        if (req.body?.gender?.toLowerCase() === "male" || req.body?.gender?.toLowerCase() === "female") {
            data.forEach((element) => {
                if (req.body.id === element.id) element.gender = req.body.gender
            })
        }
        if (req.body.age && typeof req.body.age === 'number') {
            data.forEach((element) => {
                if (req.body.id === element.id) element.age = req.body.age
            })
        }
    }
    else {
        res.status(406).send("Unvalid ID")
    }
    res.send(data)
})

app.delete('/', (req, res) => {
    if (req.body.id <= count && req.body.id >= 0) {
        data.splice(req.body.id, 1)
        res.send(data)
        count--;
    }
    else {
        res.status(406).send("Unvalid")
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})