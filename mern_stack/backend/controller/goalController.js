const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @description     Get goals
// @route           GET /api/goals
// @access          Private
const getGoal = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @description     Set goals
// @route           POST /api/goals
// @access          Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// @description     Update goals
// @route           PUT /api/goals/:id
// @access          Private
const updateGoal = asyncHandler(async (req, res) => {
  // get the goal from the client side request id
  const goal = await Goal.findById(req.params.id);
  // check for the goal
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  // get user from the server
  const user = await User.findById(req.user.id);

  // Check for user already existing
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the goal user matches the logged in user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// @description     Delete goals
// @route           DELETE /api/goals/:id
// @access          Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // get user from the server
  const user = await User.findById(req.user.id);

  // Check for user already existing
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the goal user matches the logged in user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await Goal.findByIdAndRemove(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};
