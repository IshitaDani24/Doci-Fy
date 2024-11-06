import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Docs from "../components/Docs";
import Snackbar from "../components/Snackbar";
import { createDoc, deleteDocs, getAllDocs } from "../Api/api";

const Home = () => {
  const [isCreateDocsModalOpen, setIsCreateDocsModalOpen] = useState(false);
  const [docs, setDocs] = useState([]);
  const [docTitle, setDocTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem("id");
        const result = await getAllDocs(userId);

        if (result.success) {
          setDocs(result.data.documents);
        } else {
          setError(result.message);
        }
      } catch (error) {
        console.error("Error fetching docs:", error);
        setError("Failed to fetch documents.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  const handleDeleteDocs = async (id) => {
    const data = {
      userId: localStorage.getItem("id"),
      docId: id,
    };

    try {
      const response = await deleteDocs(data);
      if (response.success) {
        setDocs((prevDocs) => prevDocs.filter((doc) => doc._id !== id));
        setSnackbarMessage("Docs deleted successfully");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage("Failed to delete document");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      setSnackbarMessage("An unexpected error occurred. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const toggleModal = () => {
    setIsCreateDocsModalOpen(!isCreateDocsModalOpen);
    setDocTitle("");
    setError(null);
  };

  const handleCreateDoc = async (e) => {
    if (e) e.preventDefault();

    if (!docTitle.trim()) {
      setError("Title is required");
      return;
    }

    try {
      const userId = localStorage.getItem("id");
      if (!userId) {
        setError("User not logged in");
        return;
      }

      setLoading(true);
      const result = await createDoc({ title: docTitle.trim(), userId });

      if (result.success) {
        toggleModal();
        navigate(`/createDocs/${result.data._id}`);
      } else {
        setError(result.message || "Failed to create document");
      }
    } catch (error) {
      setError("Failed to create document. Please try again.");
      console.error("Error creating document:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  

  useEffect(() => {
    if (snackbarOpen) {
      const timer = setTimeout(() => {
        setSnackbarOpen(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [snackbarOpen]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-between px-4 md:px-20 lg:px-32">
        <div className="flex items-center justify-between w-full">
          <h3 className="mt-7 mb-3 text-3xl">All Documents</h3>
          <button
            type="button"
            className="btn flex items-center justify-center bg-blue-600 p-2 rounded-lg text-white gap-2 transition-transform transform hover:scale-105"
            onClick={toggleModal}
          >
            <IoMdAdd /> Create new document
          </button>
        </div>

        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : docs.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No documents found
          </div>
        ) : (
          docs.map((doc) => (
            <Docs
              key={doc.id}
              docsId={doc._id}
              title={doc.title}
              createdAt={doc.createdAt}
              updatedAt={doc.updatedAt}
              timeAgo={doc.timeAgo}
              onDelete={handleDeleteDocs}
            />
          ))
        )}
      </div>

      <AnimatePresence>
        {isCreateDocsModalOpen && (
          <motion.div
            className="createModal fixed inset-0 bg-[rgb(0,0,0,.3)] flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="createDocsModel bg-white w-[90vw] md:w-[30vw] p-5 rounded-lg"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-[20px] font-semibold">Create Document</h1>
              {error && (
                <div className="text-red-600 mb-2 text-sm bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}
              <form
                className="p-3 flex flex-col gap-2"
                onSubmit={handleCreateDoc}
              >
                <label htmlFor="title" className="font-medium">
                  Enter a title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter the document title"
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  autoFocus
                />
                <div className="flex items-center justify-center w-full gap-2">
                  <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white p-2 rounded flex flex-row items-center justify-center gap-3 flex-1 hover:bg-blue-600 transition-colors"
                  >
                    <IoMdAdd /> Create Document
                  </button>

                  <button
                    type="button"
                    onClick={toggleModal}
                    className="mt-4 bg-red-600 text-white p-2 rounded flex-1 hover:bg-red-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Snackbar
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        handleSnackbarClose={handleSnackbarClose}
      />
    </>
  );
};

export default Home;
