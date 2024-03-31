const express = require("express");
const Joi = require("joi");

const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

app.get("/", (req, res) => {
  res.send();
});

app.get("/api/genres", (req, res) => {``1111``
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const course = genres.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given id was not found");
  res.send(course);
});

app.post("/api/genres", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(result.error.details[0].message);

  //   if (!req.body.name || req.body.name.length < 3) {
  //     res.status(400).send("Name is required and should be minimum 3 character");
  //     return;
  //   }
  const course = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(course);
  res.send(course);
});

app.put("/api/genres/:id", (req, res) => {
  const course = genres.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with given id was not found");
    return;
  }

  //   const schema = Joi.object({
  //     name: Joi.string().min(3).required(),
  //   });
  //   const result = schema.validate(req.body);

  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  course.name = req.body.name; // Update course details here

  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

app.delete("/api/genres/:id", (req, res) => {
  const course = genres.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given id was not found");

  const index = genres.indexOf(course);
  genres.splice(index, 1);

  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
