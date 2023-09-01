const express = require("express");
const { auth } = require("../middlewares");
const router = express.Router();
const contactsTasks = require("../controller/contactsController");

router.get("/", auth, contactsTasks.listContacts);

router.get("/:contactId", contactsTasks.getContactById);

router.post("/", auth, contactsTasks.createContact);

router.put("/:contactId", contactsTasks.updateContact);

router.delete("/:contactId", contactsTasks.removeContact);

router.patch("/:contactId/favorite", contactsTasks.updateStatusContact);

module.exports = router;
