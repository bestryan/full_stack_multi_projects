const asyncHandler = require("asyncHandler");

// @description     Get goals
// @route           GET /api/goals
// @access          Private
const getGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get goals" });
});

// @description     Set goals
// @route           POST /api/goals
// @access          Private
const setGoal = asyncHandler(async (req, res) => {
  if (req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  res.status(200).json({ message: "Set goals" });
});

// @description     Update goals
// @route           PUT /api/goals/:id
// @access          Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goals ${req.params.id}` });
});

// @description     Delete goals
// @route           DELETE /api/goals/:id
// @access          Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete goals ${req.params.id}` });
});

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};