const express = require('express');
const router = express.Router();

const { User, Trail, CompletedTrail } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

/*GET all completed trails with userId */
router.get('/users/:userId', async (req, res, next) => {
    console.log('Inside GET completed trail');
    let completedTrails = await CompletedTrail.findAll({
        where: {
            userId: req.params.userId,
            completed: true
        },
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName', 'id']
            },
            {
                model: Trail
            },
        ],
    });
    res.json(completedTrails);
});

/*GET all completed users with trailId */

router.get('/trails/:trailId', requireAuth, async (req, res, next) => {
    console.log('Inside GET completed users for a specific trail');
    let usersList = await CompletedTrail.findAll({
        where: {
            trailId: req.params.trailId,
            completed: true
        },
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName', 'id']
            },
            {
                model: Trail
            },
        ],
    });
    res.json(usersList);
});
/* UPDATE the entry if it already exist / CREATE an entry in the table */

router.post('/trails/:trailId', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    let completedTrail = await CompletedTrail.findOne({
        where: {
            trailId: req.params.trailId,
            userId: userId
        },
    }
    );
    if (completedTrail) { //if the entry for the trail and user already exist - update the entry
        await CompletedTrail.update({ completed: !completedTrail.completed }, {
            where: {
                trailId: req.params.trailId,
                userId: userId
            }
        }
        );
    } else { //when not found, create a new entry
        let data = {
            UserId: userId,
            TrailId: req.params.trailId,
            completed: true
        }
        const result = await CompletedTrail.create(data);
    }
    let updatedData = await CompletedTrail.findOne({
        where: {
            trailId: req.params.trailId,
            userId: userId
        },
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName', 'id']
            },
            {
                model: Trail
            }
        ]
    });
    res.json(updatedData);
});


module.exports = router;

/*
Use node-cron to clean up the saved trails and completed trails table based on the entry of the completed and saved field when false at scheduled time.
*/
