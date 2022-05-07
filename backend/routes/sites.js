const express = require('express')
const router = express.Router()
const Site = require('../models/site')

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
router.post('/', async (req, res) => {
  console.log(req.body)
  // const site = new Site({
  //   name: req.body.name,
  //   state: req.body.state,
  //   town: req.body.town,
  //   year: req.body.year,
  //   data1: req.body.data1,
  //   data2: req.body.data2,
  //   img1: req.body.img1,
  //   img2: req.body.img2,
  //   img3: req.body.img3
    
  // })
  // try {
  //   const newSite = await site.save()
  //   res.status(201).json(newSite)
  // } catch (err) {
  //   res.status(400).json({ message: err.message })
  // }
})


// Deleting One
router.delete('/:name', getSite, async (req, res) => {
  try {
    await res.site[0].remove()
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