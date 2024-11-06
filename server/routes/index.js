var express = require('express');
var router = express.Router();
var { signUp, login, logout, verifyAuth } = require('../Controllers/User.Controller.js');
const { CreateDocs, getDocs ,updateDocs, deleteDocs, getAllDocs } = require('../Controllers/Docs.Controller.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/signUp', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.post('/createDocs', CreateDocs);
router.post('/getDocs', getDocs);
router.post('/verifyAuth', verifyAuth);
router.post('/updateDocs', updateDocs);
router.post('/deleteDocs', deleteDocs);
router.get('/getAllDocs/:id', getAllDocs);

router.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error"
  });
});


module.exports = router;
