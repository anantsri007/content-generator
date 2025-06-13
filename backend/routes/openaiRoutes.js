import express from 'express';
import { generateContent } from '../controllers/openaiController.js';

const router = express.Router();

router.post('/', generateContent);

export default router;


// import express from 'express';
// import { generateContent } from '../controllers/openaiController.js';

// const router = express.Router();
// router.post('/', generateContent);

// export default router;
