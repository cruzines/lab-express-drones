const express = require('express');
const router = express.Router();

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
  .then((allDrones)=>{
    res.render('drones/list.hbs', {allDrones})
  })
  .catch(()=>console.log('error'))
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form.hbs')
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const id=req.params
  const {name, propellers, maxSpeed}= req.body

  Drone.create(id, {name, propellers, maxSpeed})
  .then((data)=>{
    res.redirect('/drones')
  })
  .catch((data)=>{
    console.log(err)
  })

});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const id = req.params

  Drone.findById(id)
  .then((data)=>res.render('../views/drones/update-form.hbs',{data}))
});


router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const id= req.params
  const {name, propellers, maxSpeed}= req.body

  Drone.findByIdAndUpdate(id,{name, propellers, maxSpeed})
  .then((data)=>{res.redirect('/drones'),{data}})
  .catch((err)=>console.log(err))
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const id= req.params

  Drone.findByIdAndDelete(id)
  .then(()=>res.redirect('/drones'))
  .catch((err)=>console.log(err))
});

module.exports = router;
