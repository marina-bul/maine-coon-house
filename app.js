const express = require("express");
const path = require("path");
const app = express();

const REVIEWS = [
  {
    id: 12,
    photo: "./img/reviewer-1-desktop@1x.jpg",
    author: "Сережа Попов",
    text: "Я выражаю огромную благодарность вашему питомнику. Мой Феликс невероятно умен и воспитан. Огромным плюсом питомника является возможность консультироваться в любое время",
    date: "24 мая 2018",
    socialLinks: ["https://twitter.com/", "https://vk.com/id29781961"],
  },

  {
    id: 2,
    photo: "./img/reviewer-2-desktop@1x.png",
    author: "Василиса Лазарева",
    text: "Год назад приобрела котенка. Было очень много вопросов, сомнений. Спасибо огромное Вашей команде, что развеяли все мои страхи! Даже не ожидала, что за год котенок так вырастет! Теперь подумываем завести кошечку. И, конечно, обращаться будем только к вам!",
    date: "17 сентября 2018",
    socialLinks: ["https://twitter.com/", "https://vk.com/id29781961"],
  },

  {
    id: 3,
    photo: "",
    author: "Кирилл Егоров",
    text: "Однозначно лучший питомник области! Все коты с прививками и необходимыми документами. Когда мы забирали кота, нам дали много памяток по уходу и пачку корма в подарок.",
    date: "5 марта 2019",
    socialLinks: ["https://twitter.com/", "https://vk.com/id29781961"],
  },
];

app.get("/app/reviews", (req, res) => {
  res.status(200).json(REVIEWS);
});

app.use(express.static(path.resolve(__dirname, "client")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

app.listen("5000", () => console.log("Server has been running..."));
