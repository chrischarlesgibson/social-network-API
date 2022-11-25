const router = require("express").Router();
const {
  getSingleThought,
  getThoughts,
  updateThought,
  createThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

///api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought).put(updateThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction);

// /api/thoughts/:thoughtId/reactions/reactionId
router.route("/:thoughtId/reactions").delete(deleteReaction);
module.exports = router;
