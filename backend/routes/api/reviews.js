const express = require('express');
const router = express.Router();

const { Review, Trail, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// GET /reviews/:userId - Returns all the reviews by the user - Done
// GET /reviews/:trailId - Returns all the reviews for a specific trail - Done
// GET /reviews/:userId/:trailId - Is this needed?
// POST /reviews/:trailId - User has to be loggedin to post a review
// PUT /reviews/:trailId - Only the user created the review can update/delete
// DELETE /reviews/:trailId - Only the user created the review can update/delete

// Returns all the reviews by the user
router.get('/users/:userId', async (req, res, next) => {
    const userId = req.params.userId;
    const reviews = await Review.findAll({
        where: {
            userId: userId
        },
        include: [{
            model: Trail
        }]
    });
    res.json(reviews);
});

// Returns all the reviews for a trail - CAN USE LIMIT to load the reviews
router.get('/trails/:trailId', async (req, res, next) => {
    const trailId = req.params.trailId;
    const reviews = await Review.findAll({
        where: {
            trailId: trailId
        },
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName']
            }
        ]
    });
    res.json(reviews);
});

//create a review for a trail
router.post('/trails/:trailId', requireAuth, async (req, res, next) => {
    const { rating, comment } = req.body;
    const data = {
        UserId: parseInt(req.user.id),
        TrailId: parseInt(req.params.trailId),
        starsReview: rating,
        comment: comment
    };
    const createdReview = await Review.create(data);
    res.json(createdReview);
});

//update a review based on the reviewId
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const { rating, comment } = req.body;
    const dataTobeUpdated = {
        starsReview: rating,
        comment: comment
    };
    const [rowsUpdated] = await Review.update(dataTobeUpdated,
        {
            where: {
                id: req.params.reviewId
            }
        });
    console.log(rowsUpdated);
    if (rowsUpdated > 0) {
        const updatedReview = await Review.findOne({
            where: {
                id: req.params.reviewId
            }
        });
        res.json(updatedReview);
    } else {
        res.json({ "message": "No rows updated" });
    }

});

//delete a review based on the review Id
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const rowsDeleted = await Review.destroy({
        where: {
            id: req.params.reviewId
        }
    });
    if (rowsDeleted > 0) {
        res.json({ "message": "Deletion successful" });
    } else {
        res.json({ "message": "No deletion" })
    }
});

module.exports = router;
