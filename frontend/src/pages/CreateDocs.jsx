import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import JoditEditor from "jodit-pro-react";
import { updateDocs as updateDocsApi, getDocs } from "../Api/api";
import Snackbar from "../components/Snackbar";

const CreateDocs = () => {
  const editor = useRef();
  let { docsId } = useParams();
  let [content, setContent] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleUpdateDocs = async () => {
    try {
      let userId = localStorage.getItem("id");
      let data = {
        userId: userId,
        docId: docsId,
        content: content,
      };

      const result = await updateDocsApi(data);
      if (result.success) {
        setSnackbarMessage(result.message);
        setSnackbarOpen(true);
      }
    } catch (error) {
      if (error.response) {
        setSnackbarMessage(error.response.data.message);
      } else {
        setSnackbarMessage("An unexpected error occurred. Please try again.");
      }
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleGetDocs = async () => {
    try {
      let userId = localStorage.getItem("id");
      let data = {
        userId: userId,
        docId: docsId,
      };

      let result = await getDocs(data);
      if (result.success) {        
        setContent(result.doc.content); 
      }
    } catch (error) {
      
      console.error("Error fetching document:", error);
    }
  };

  useEffect(() => {
    handleGetDocs(); 
  }, []); 

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

      <div className="px-[50px] pt-[50px]">
        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          
        />
      </div>

      <button
        className="btn bg-orange-500 p-3 mt-3 ml-[50px] mb-5 rounded-lg text-white text-center"
        onClick={handleUpdateDocs}
      >
        Update Document
      </button>

      <Snackbar
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        handleSnackbarClose={handleSnackbarClose}
      />
    </>
  );
};

export default CreateDocs;
