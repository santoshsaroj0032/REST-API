const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");



const app = express();
const PORT = 7000;

mongoose.connect('mongodb+srv://santoshsaroj0032:dTlE2ZNxnWhQPALr@cluster0.mkmko1i.mongodb.net/RESTAPI', { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err )=> console.log("Mongo Error" , err)); 

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobtitle: {
        type: String,
    },
    gender: {
        type: String,
    },

});

const User = mongoose.model("user", userSchema);


// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});

// START REST API 

app.get("/api/users", (req, res) => {
    return res.json(users);
});

app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);

        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    })
    .patch((req, res) => {
        return res.json({ status: "Pending" });
    })
    .delete((req, res) => {
        return res.json({ status: "Pending" });
    });

app.post("/api/users", (req, res) => {
    const body = req.body;
    const newUser = { ...body, id: users.length + 1 };
    users.push(newUser);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: "success", id: users.length });
        }

        return res.status(201).json(newUser);
    });
});

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));
