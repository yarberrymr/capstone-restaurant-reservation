const notFound = require('../errors/notFound')

/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const {list, post} = require("./reservations.controller");

router.route("/").get(list).post(post).all(notFound);

module.exports = router;