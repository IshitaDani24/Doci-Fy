import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import DocsIcons from "../images/DocsIcon.png";
import Delete from "../images/delete.png";
import { useNavigate } from "react-router-dom";

const Docs = ({ docsId, title, createdAt, timeAgo, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDelete = () => {
    onDelete(docsId);
    setIsDeleteModalOpen(false);
  };

  const handleNavigate = () => {
    navigate(`/createDocs/${docsId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <div
        className="bg-[#F0F0F0] flex mb-5 items-center justify-between w-full p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onClick={handleNavigate}
      >
        <div className="details flex items-center gap-3">
          <div className="logo">
            <img
              src={DocsIcons}
              alt="Document Icon"
              className="rounded-full w-10 h-10 object-cover"
            />
          </div>
          <div className="about flex flex-col">
            <div className="heading text-[21px] font-medium text-gray-800">
              {title}
            </div>
            <div className="sub text-[14px] text-gray-600 flex flex-wrap gap-1">
              <span>Created on {formatDate(createdAt)}</span> |
              <span>Last updated {timeAgo}</span>
            </div>
          </div>
        </div>

        <div
          className="deletebtn cursor-pointer p-2 hover:bg-white rounded-full transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation();
            toggleDeleteModal();
          }}
        >
          <MdDelete className="text-red-600 text-xl" />
        </div>
      </div>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-[90vw] md:w-[30vw] p-6 rounded-lg"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-semibold mb-4">Confirm Deletion</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="image flex-shrink-0">
                  <img
                    src={Delete}
                    alt="Delete Icon"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-lg text-gray-700">
                    Are you sure you want to delete this document?
                  </p>
                  <p className="text-sm text-gray-500">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={toggleDeleteModal}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                >
                  Delete Document
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Docs;
