const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

const filePath = path.join(__dirname, "file.json");

app.get("/todos", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    res.status(200).send(data);
  });
});

app.post("/todos", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    }

    let updatedData = JSON.parse(data);
    const inputData = {
      id: Math.floor(Math.random() * 1000),
      title: req.body.title,
      description: req.body.description,
    };
    updatedData.push(inputData);
    fs.writeFile(filePath, JSON.stringify(updatedData), (error) => {
      if (error) {
        console.error(error);
      }
    });
    res.status(200).send(updatedData);
  });
});

app.delete("/todos/:id", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    }
    let files = JSON.parse(data);
    let index = files.findIndex((f) => f.id == req.params.id);
    files.splice(index, 1);

    fs.writeFile(filePath, JSON.stringify(files), (error) => {
      if (error) {
        console.error(error);
      }
      res.status(200).send();
    });
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

// function appearMe(){
//     let main = document.getElementById("main")

// let childMain = document.createElement("div");
// childMain.innerHTML= "bro look i am here";
// main.appendChild(childMain);
// }
