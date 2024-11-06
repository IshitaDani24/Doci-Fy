const DocsModel = require('../models/DocsModel.js');
const User = require('../models/UserModel.js');
const ApiErrorHandler = require('../Utils/ApiErrorHandler.js');

exports.CreateDocs = async (req, res) => {
    try {
        let { title, userId } = req.body;

        console.log("Received request body:", req.body);

        let user = await User.findById(userId);
        if (!user) {
            throw new ApiErrorHandler(404, "User not found");
        }

        console.log("User found:", user);

        let doc = await DocsModel.create({
            userId: userId,
            title: title
        });

        console.log("Created document:", doc);

        return res.status(201).json({
            statusCode: 201,
            data: doc,
            message: "Docs created successfully",
            success: true
        });
    } catch (error) {
        console.error("Error in CreateDocs:", error);

        if (error instanceof ApiErrorHandler) {
            return res.status(error.statusCode).json({
                statusCode: error.statusCode,
                message: error.message,
                success: false,
                data: null,
                errors: error.errors || null
            });
        }

        return res.status(500).json({
            statusCode: 500,
            message: "Error Creating Document",
            success: false,
            data: null,
            errors: error.message
        });
    }
};

exports.updateDocs = async (req, res) => {
    try {
        const { userId, docId, content } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const doc = await DocsModel.findByIdAndUpdate(
            docId,
            { content: content },
            { new: true }
        );

        if (!doc) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        return res.json({
            success: true,
            message: "Document updated successfully",
            document: doc,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the document",
            error: error.message,
        });
    }
};

exports.getDocs = async (req, res) => {
    try {
        const { docId, userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const doc = await DocsModel.findById(docId);
        if (!doc) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Document fetched successfully",
            doc: doc
        });

    } catch (error) {
        console.error("Error in viewDocs:", error);
        if (error instanceof ApiErrorHandler) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error.errors || null
            });
        }

        return res.status(500).json({
            success: false,
            message: "Error retrieving documents",
            error: error.message
        });
    }
};

exports.getAllDocs = async (req, res) => {
    const userId = req.params.id; 

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const docs = await DocsModel.find({ userId });
        return res.status(200).json({
            success: true,
            data: { documents: docs },
        });
    } catch (error) {
        console.error("Error fetching documents:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching documents",
        });
    }
};


exports.deleteDocs = async (req, res) => {
    const { userId, docId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const doc = await DocsModel.findByIdAndDelete(docId);
        if (!doc) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Document deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the document",
        });
    }
};
