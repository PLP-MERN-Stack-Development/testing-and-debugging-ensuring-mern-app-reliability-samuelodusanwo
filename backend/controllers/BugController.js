const express = require('express');
const mongoose = require('mongoose');
const Bug = require('../model/Bug');


// Get all bugs
const getAllBugs = async (req, res) => {
    try {
        const bugs = await Bug.find().sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            data: bugs,
            message: "Successfully fetched all data"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}


// Create bug
const createBug = async (req, res) => {
    try {
        const { title, description, status, priority, reporter, assignee } = req.body;

        // Validate required fields
        if (!title || !description || !reporter) {
            return res.status(400).json({
                success: false,
                error: "Title, description, and reporter are required fields"
            });
        }

        const createdBug = await Bug.create({
            title, 
            description, 
            status: status || 'open', 
            priority: priority || 'medium', 
            reporter, 
            assignee: assignee || ''
        })

        return res.status(201).json({
            success: true,
            message: "bug created successfully",
            data: createdBug
        })

    } catch (err) {
        console.log('Error creating bugs', err)
        res.status(500).json({
            success: false,
            error: err.message,
        })
    }
}


// Update bug
const updateBug = async (req, res) => {
    try {
        // verifying if the id is mongodb type of id
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                error: "Id not valid"
            })
        }

        const bug = await Bug.findByIdAndUpdate(id, {...req.body, updatedAt: Date.now()}, { new: true })

        if (!bug){
            return res.status(404).json({
                success: false,
                error: "Bug not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Bug updated successfully",
            data: bug
        })

    } catch(err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}


// Delete bug
const deleteBug = async (req, res) => {
    try {
        // verifying if the id is mongodb type of id
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                error: "Id not valid"
            })
        }

        const bug = await Bug.findByIdAndDelete(id)

        if (!bug) {
            return res.status(404).json({
                success: false,
                error: "Bug not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Bug deleted successfully"
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message,
            message: "Error deleting bug"
        })
    }
}


module.exports = { getAllBugs, createBug, updateBug, deleteBug }