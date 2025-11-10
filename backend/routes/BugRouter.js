const express = require('express');
const router = express.Router();
const { getAllBugs, createBug, updateBug, deleteBug } = require("../controllers/BugController");


router.get('/', getAllBugs);
router.post('/', createBug);
router.put('/:id', updateBug);
router.delete('/:id', deleteBug);


module.exports = router;