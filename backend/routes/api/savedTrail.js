const express = require('express');
const router = express.Router();

const { User, Trail, SavedTrail } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

/*GET all saved trails with userId */
router.get('/users/:userId', async (req, res, next) => {
    let savedTrails = await SavedTrail.findAll({
        where: {
            userId: req.params.userId,
            saved: true
        },
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName']
            },
            {
                model: Trail
            },
        ],
    });
    res.json(savedTrails);
});


/*GET all completed users with trailId */

router.get('/trails/:trailId', requireAuth, async (req, res, next) => {
    let usersList = await SavedTrail.findAll({
        where: {
            trailId: req.params.trailId,
            saved: true
        },
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName']
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
    let savedTrail = await SavedTrail.findOne({
        where: {
            trailId: req.params.trailId,
            userId: userId
        },
    }
    );
    if (savedTrail) { //if the entry for the trail and user already exist - update the entry
        await SavedTrail.update({ saved: !savedTrail.saved }, {
            where: {
                trailId: req.params.trailId,
                userId: userId
            }
        }
        );
        let updatedData = await SavedTrail.findOne({
            where: {
                trailId: req.params.trailId,
                userId: userId
            },
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName']
                },
                {
                    model: Trail
                }
            ]
        });
        res.json(updatedData);
    } else { //when not found, create a new entry
        let data = {
            UserId: userId,
            TrailId: req.params.trailId,
            saved: true
        }
        const result = await SavedTrail.create(data);
        res.json(result);
    }
});

module.exports = router;
