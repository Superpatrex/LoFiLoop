const express = require("express");
const router = express.Router();
const { generateSongText, generateAlbumArt } = require('../models/openai');



router.post('/generateAlbumText', async (req, res) => {
    const { prompt } = req.body;
    
    const result = await generateSongText(prompt);
    res.json(result); 
})
  
router.post('/generateAlbumArt', async (req, res) => {
      const { prompt } = req.body;
      
      const result = await generateAlbumArt(prompt);
      res.json(result); 
})




module.exports = router;