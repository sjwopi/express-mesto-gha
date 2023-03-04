const { getAllCards } = require("./getAllCards");
const { createCard } = require("./createCard");
const { deleteCard } = require("./deleteCard");
const { putLike } = require("./putLike");
const { deleteLike } = require("./deleteLike");

module.exports = { getAllCards, createCard, deleteCard, putLike, deleteLike };
