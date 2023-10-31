const express = require('express');
const router = express.Router();

const { Park } = require('../../db/models');
const { requireAuth, requireAdmin } = require('../../utils/auth');

router.get('/', async (req, res) => {
    const parks = await Park.getParkInfo();
    res.json(parks);
});

router.post('/', requireAuth, requireAdmin, async (req, res) => {
    let newPark = req.body;
    let createdPark = await Park.createPark(newPark);
    res.json(createdPark);
});

router.get('/:parkId', async (req, res) => {
    console.log(req.params.parkId);
    const parkId = req.params.parkId;
    const park = await Park.getParkById(parkId);
    res.json(park);
});

router.put('/:parkId', requireAuth, requireAdmin, async (req, res, next) => {
    const parkInfo = req.body;
    const parkId = req.params.parkId;
    if (parseInt(parkInfo.id) === parseInt(parkId)) {
        const updatedPark = await Park.updateParkById(parkId, parkInfo);
        return res.json(updatedPark);
    }
    const err = new Error('Bad Request');
    err.title = 'Bad Request';
    err.errors = ["The park ids doesn't match the body and the request parameter"];
    err.status = 401;
    return next(err);

});

router.delete('/:parkId', requireAuth, requireAdmin, async (req, res, next) => {
    const parkId = req.params.parkId;
    let isDeleted = await Park.deleteParkById(parkId);
    if (isDeleted) {
        res.json({ "message": "Deletion successful" });
    } else {
        res.json({ "message": "No rows were deleted" });
    }
});


module.exports = router;
