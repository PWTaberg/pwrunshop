const path = require('path');
const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/');
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

function checkFileType(file, cb) {
	console.log('uploadRoutes.checkFileType');

	const filetypes = /jpg|jpeg|png/;

	// true or false
	const extname = filetypes.test(
		path.extname(file.originalname).toLowerCase()
	);

	// true or false
	const mimetype = filetypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb('Images only!');
	}
}

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});

router.post('/', upload.single('image'), (req, res) => {
	//console.log('uploadRoutes.post', `/${req.file.path}`);

	let fileUrl = req.file.path.replace(/\\/g, '/');
	//console.log('file', fileUrl);

	res.send(`/${fileUrl}`);
});
// export default Router;
module.exports = router;