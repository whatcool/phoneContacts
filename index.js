const express = require("express")
const app = express();
const mongoose = require('mongoose');

const Contact = require('./models/contacts')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())



mongoose.connect('mongodb://127.0.0.1:27017/contact')
    .then(() => console.log("Database connected"))
    .catch(error => console.log(error));


app.get("/", (req, res) => {
    Contact.find().then(c => res.send(c))
})

app.post("/new", async(req, res) => {
    try {
        const { name, cell } = req.body;
        const user = new Contact({
            name: name,
            cell: cell
        })
        await user.save();
        console.log("contact saved");
        res.send("Contact Saved")
    } catch (error) {
        res.status(401).send(error);
    }
})

app.post("/search", (req, res) => {
    const part = req.body.name;
    Contact.find({ name: { $regex: `^${part}`, $options: "i" } }).then(names => res.send(names));
    //this is regex which is used to find all those words which contains that specific string in it
})
app.listen(5000, () => {
    console.log("Server started at port 5000");
})