const express = require('express');
const router = express.Router();

const { Activity, Review, Trail, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

/*
PUT - UPDATE an activity by Id. First Review is updated and then activity
DELETE -by activityId
PATCH - UPDATE the likes array when a user likes an activity. ActivityId in req.params and the user who likes the activity will be added to the likes array

*/

/*
GET request - activities by users
*/

router.get("/users/:userId", async (req, res, next) => {

    const activities = await Activity.findAll({
        include: [{
            model: Review,
            include: [{
                model: Trail
            }],
            where: {
                userId: req.params.userId
            }
        }
        ]
    });
    if (activities.length === 0) {
        res.json({
            "data": [],
            "message": "No activities posted by this user",
            "status": "success"
        })
    } else {
        res.json(activities);
    }

});

/*
GET request - activities by trail
*/

router.get("/trails/:trailId", async (req, res, next) => {

    const activities = await Activity.findAll({
        include: [
            {
                model: Review,
                include: [{
                    model: User,
                    attributes: ['firstName', 'lastName']
                }],
                where: {
                    trailId: req.params.trailId
                }
            }
        ]
    });

    if (activities.length === 0) {
        res.json({
            "data": [],
            "message": "No activities posted for this trail",
            "status": "success"
        })
    } else {
        res.json(activities);
    }
});

/*
GET - request - activities by activity time - this will be displayed as a feed in the community page under Local
*/

router.get("/local", requireAuth, async (req, res, next) => {

    const activities = await Activity.findAll({
        limit: 2,
        order: [
            ['updatedAt', 'DESC']
        ],
        include: [
            {
                model: Review,
                include: [
                    {
                        model: User,
                        attributes: ['firstName', 'lastName']
                    },
                    {
                        model: Trail
                    }
                ]
            }
        ]
    });
    res.json(activities);
});

/*
GET request - activities based on the followers
*/

router.get("/following", requireAuth, async (req, res, next) => {

    const userInfo = await User.findByPk(req.user.id); //getting the following list of the currently logged in user
    const activities = await Activity.findAll({
        include: [
            {
                model: Review,
                where: {
                    userId: JSON.parse(userInfo.following)
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
            }
        ]
    })
    res.json(activities);
});

/*
POST request
Req Body format:
{
    title:
    trailId:
    rating:
    comment:
}
1. From the req body- create an entry in Activity table
2. Using the Activity Id created and the remaining information from the body- create a review
3. return the newly created Activity by including the review and trail information
*/

router.post("/", requireAuth, async (req, res, next) => {
    //We should make use of transaction to ensure atomicity when inserting into two tables - TO BE DONE
    const title = req.body.title;
    const newActivity = await Activity.create({
        title: title
    });

    const newReview = await Review.create({
        UserId: req.user.id,
        TrailId: req.body.trailId,
        ActivityId: newActivity.id,
        starsReview: req.body.rating,
        comment: req.body.comment
    });

    const activity = await Activity.findOne({
        where: { id: newActivity.id },
        include: [
            {
                model: Review,
                include: [
                    {
                        model: User,
                        attributes: ['firstName', 'lastName']
                    },
                    {
                        model: Trail
                    }
                ]
            }
        ]

    });

    res.json(activity);

});

/*
PUT request
Update an activity given an id
1.First ensure if the given actitivty is created by the loggedin user
2.Update Review based on the request body
3.Update Activity
4.Return the updated Activity
*/

router.put("/:activityId", requireAuth, async (req, res, next) => {

});

/*PATCH request
Update the likes array when a user likes an activity
1.Check for authentuication
2.Update the userId to the array and update likes array
3.Return the activity
*/

router.patch("/:activityId", requireAuth, async (req, res, next) => {

});

/*
DELETE request
Delete an activity by id
1.First ensure if the given actitivty is created by the loggedin user
2.Delete Review for the given activity
3.Delete Activity
4.Return success message
*/

router.delete("/:activityId", requireAuth, async (req, res, next) => {

});


module.exports = router;
