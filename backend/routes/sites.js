const express = require('express')
const router = express.Router()
const Site = require('../models/site')
const fs = require('fs')

// Getting all
router.get('/', async (req, res) => {
  try {
    const sites = await Site.find()
    res.json(sites)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:name', getSite, (req, res) => {
  res.json(res.site)
})

// Creating one
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = './assets/'+req.body.name;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive:true});
    }
  
    cb(null, './assets/'+req.body.name);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + file.originalname);
  }
})
const upload = multer({ storage:storage })
const cpUpload = upload.fields([{ name: 'img1', maxCount: 1 }, { name: 'img2', maxCount: 1 }, {name: 'img3', maxCount:1}])
router.post('/', cpUpload, async function (req, res) {
   // req.file is the name of your file in the form above, here 'uploaded_file'
   // req.body will hold the text fields, if there were any 
   if(!req.body.name || !req.body.state || !req.body.town || !req.body.year || !req.body.data1 || !req.body.data2 ||
    !req.files.img1 || !req.files.img2 || !req.files.img3) {
      res.send("<h2>Some Data is missing in the form.</h2><h2>Please try again.</h2>")
      return;
    }
   let siteCheck = await Site.find({name:req.body.name})
   if(siteCheck != null){
    res.send("<h2>Site name already exists in the database.</h2>")
    return;
   }
   let img1 = "http://localhost:3000/images/"+req.body.name+'/'+req.files.img1[0].filename;
   let img2 = "http://localhost:3000/images/"+req.body.name+'/'+req.files.img2[0].filename;;
   let img3 = "http://localhost:3000/images/"+req.body.name+'/'+req.files.img3[0].filename;;
   const site = new Site({
    name: req.body.name,
    state: req.body.state,
    town: req.body.town,
    year: req.body.year,
    data1: req.body.data1,
    data2: req.body.data2,
    img1: img1,
    img2: img2,
    img3: img3
    
  })
  try {
    const newSite = await site.save()
    //res.status(201).json(newSite)
    res.send("<script>window.close();</script > ")
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});


// Deleting One
router.delete('/:name', getSite, async (req, res) => {
  try {
    await res.site[0].remove()
    //console.log(res.site[0]);
    let dir = './assets/'+res.site[0].name;
    console.log(dir)
    fs.rm(dir, { recursive: true }, (err) => {
      if (err) {
          throw err;
      }
  
      console.log(`${dir} is deleted!`);
  });
    res.json({ message: 'Deleted Site' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getSite(req, res, next) {
  let site
  try {
    site = await Site.find({name:req.params.name})
    if (site == null) {
      return res.status(404).json({ message: 'Cannot find site' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.site = site
  next()
}

module.exports = router