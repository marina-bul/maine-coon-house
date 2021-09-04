const express = require("express");
const path = require("path");
const { v4 } = require("uuid");
const app = express();

const REVIEWS = [
  {
    id: v4(),
    photo: "./img/reviewer-1-desktop@1x.jpg",
    author: "Сережа Попов",
    text: "Я выражаю огромную благодарность вашему питомнику. Мой Феликс невероятно умен и воспитан. Огромным плюсом питомника является возможность консультироваться в любое время",
    date: "2018-05-24",
    socialLinks: ["https://twitter.com/", "https://vk.com/id29781961"],
  },

  {
    id: v4(),
    photo: "./img/reviewer-2-desktop@1x.png",
    author: "Василиса Лазарева",
    text: "Год назад приобрела котенка. Было очень много вопросов, сомнений. Спасибо огромное Вашей команде, что развеяли все мои страхи! Даже не ожидала, что за год котенок так вырастет! Теперь подумываем завести кошечку. И, конечно, обращаться будем только к вам!",
    date: "2018-09-17",
    socialLinks: ["https://twitter.com/", "https://vk.com/id29781961"],
  },

  {
    id: v4(),
    photo: "",
    author: "Кирилл Егоров",
    text: "Однозначно лучший питомник области! Все коты с прививками и необходимыми документами. Когда мы забирали кота, нам дали много памяток по уходу и пачку корма в подарок.",
    date: "2019-10-05",
    socialLinks: ["https://twitter.com/", "https://vk.com/id29781961"],
  },
];

app.use(express.json());

app.get("/app/reviews", (req, res) => {
  res.status(200).json(REVIEWS);
});

app.post("/app/reviews", (req, res) => {
  const generateDate = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const newDate = `${currentYear}-${currentMonth}-${currentDay}`;
    return newDate;
  };
  const newReview = { ...req.body, id: v4(), date: generateDate() };
  REVIEWS.push(newReview);
  res.status(201).json(newReview);
});

app.use(express.static(path.resolve(__dirname, "client")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

app.listen(process.env.PORT || 5000, () =>
  console.log("Server has been running...")
);
