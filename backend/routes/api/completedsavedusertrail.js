const express = require('express');
const router = express.Router();
const { User, Trail, CompletedSavedUserTrail } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
/*

POST - Insert a row if the entry doesn't exists, if not edit the exists row. (Body:completed:true - then update completed to true else false)

//Create an entry if not present and then add the boolean values to saved or completed based on the query parameter
// TO BE CHECKED ON DELETION / UPDATION
// Update/ delete scenarios - when saved is removed, completed is removed, Both are added, both are removed.


*/

/*
    If you want to use Eager loading in a through relation, then the association has to be setup in the through model.
    Eg:
    CompletedSavedUserTrail.belongsTo(models.User);
    CompletedSavedUserTrail.belongsTo(models.Trail);
*/

/*
    GET the completed trails by user - getting user id from the request - the user who has currently logged in.
*/
router.get('/completed/user/:userId', requireAuth, async (req, res, next) => {

    let completedTrails = await
        CompletedSavedUserTrail.findAll({
            where: {
                userId: req.params.userId,
                completed: true
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
            attributes: [
                "saved",
                "completed"
            ]
        });
    res.json(completedTrails);
});

/*
GET request - display the users who have completed a specifc trail- USE LIMIT to load the users completed- 10 users at a time
*/
router.post('/completed/trail/:trailId', requireAuth, async (req, res, next) => {
    let completedTrail = await CompletedSavedUserTrail.findOne({
        where: {
            trailId: req.params.trailId,
            userId: req.user.id
        },
    }
    );
    if (completedTrail) { //if the entry for the trail and user already exist - update the entry
        await CompletedSavedUserTrail.update({ completed: !completedTrail.completed }, {
            where: {
                trailId: req.params.trailId,
                userId: req.user.id
            }
        }
        );
        let updatedData = await CompletedSavedUserTrail.findOne({
            where: {
                trailId: req.params.trailId,
                userId: req.user.id
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
            UserId: req.user.id,
            TrailId: req.params.trailId,
            saved: false,
            completed: true
        }
        const result = await CompletedSavedUserTrail.create(data);
        res.json(result);
    }
});

/* returns the saved trails filtered by userid */

router.get('/saved', requireAuth, async (req, res, next) => {
    let savedTrails = await CompletedSavedUserTrail.findAll({
        where: {
            userId: req.user.id,
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
        attributes: [
            "saved",
            "completed"
        ]
    });

    res.json(savedTrails);
});

router.post('/saved/:trailId', requireAuth, async (req, res, next) => {
    let savedTrail = await CompletedSavedUserTrail.findOne({
        where: {
            trailId: req.params.trailId,
            userId: req.user.id
        },
    }
    );
    if (savedTrail) { //if the entry for the trail and user already exist - update the entry
        await CompletedSavedUserTrail.update({ saved: !savedTrail.saved }, {
            where: {
                trailId: req.params.trailId,
                userId: req.user.id
            }
        }
        );
        let updatedData = await CompletedSavedUserTrail.findOne({
            where: {
                trailId: req.params.trailId,
                userId: req.user.id
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
            UserId: req.user.id,
            TrailId: req.params.trailId,
            saved: true,
            completed: false
        }
        const result = await CompletedSavedUserTrail.create(data);
        res.json(result);
    }
})
module.exports = router;
