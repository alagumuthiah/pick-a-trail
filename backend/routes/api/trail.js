const express = require('express');
const router = express.Router();

const { Trail, Park } = require('../../db/models');
const { requireAuth, requireAdmin } = require('../../utils/auth');

//get all trails
router.get('/', async (req, res, next) => {
    const trails = await Trail.findAll(
        {
            include: [{
                model: Park,
                attributes: ['name']
            }]
        });
    res.json(trails);
});

router.post('/', requireAuth, requireAdmin, async (req, res, next) => {
    let newTrail = req.body;
    let createdTrail = await Trail.create(newTrail);
    res.json(createdTrail);
});

//get all trails in a park
router.get('/parks/:parkId', async (req, res, next) => {
    const parkId = req.params.parkId;
    const trails = await Trail.findAll(
        {
            where: {
                parkId: parkId
            },
            include: [{
                model: Park,
                attributes: ['name']
            }]
        },
    );
    res.json(trails);
});


router.get('/:trailId', async (req, res, next) => {
    const trailId = req.params.trailId;
    const trail = await Trail.findByPk(trailId);
    res.json(trail);
});

router.put('/:trailId', requireAuth, requireAdmin, async (req, res, next) => {
    const trailInfo = req.body;
    const trailId = req.params.trailId;
    if (parseInt(trailInfo.id) === parseInt(trailId)) {
        const [rowsAffected] = await Trail.update(trailInfo,
            {
                where: { id: trailId }
            });
        if (rowsAffected > 0) {
            const updatedTrail = await Trail.findByPk(trailId);
            res.json(updatedTrail);
        } else {
            const err = new Error('Resource Not Found');
            err.title = 'Update - Resource Not found';
            err.errors = ["No matching resource found for update"];
            err.status = 400;
            return next(err);
        }
    }
    const err = new Error('Bad Request');
    err.title = 'Bad Request';
    err.errors = ["The trail ids doesn't match the body and the request parameter"];
    err.status = 401;
    return next(err);

});

router.delete('/:trailId', async (req, res, next) => {
    const trailId = req.params.trailId;
    const rowsDeleted = await Trail.destroy({
        where: {
            id: trailId,
        }
    });
    if (rowsDeleted > 0) {
        res.json({ "message": "Deletion successful" });
    } else {
        res.json({ "message": "No rows were deleted" });
    }
});






module.exports = router;
