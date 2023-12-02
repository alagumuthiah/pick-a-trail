const express = require('express');
const router = express.Router();

const { Comment, Activity } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');


/*
GET request to retrieve all comments for a specific activity by ID
*/
router.get('/activities/:activityId', requireAuth, async (req, res, next) => {
    const comments = await Comment.findAll({
        where: {
            activityId: req.params.activityId
        },
        attributes: ['id', 'userId', 'activityId', 'comments', 'updatedAt']
    });

    res.json(comments);
});

/*
POST - Create request in comments table
1. Req body format:
{
    ActivityId:
    comments:
}
2. Create an entry in comments table with req body
3. Return the created comment
*/

router.post('/', requireAuth, async (req, res, next) => {
    console.log(req.body); // Request body has to be validated - TO BE DONE
    const reqBody = req.body;
    reqBody.UserId = req.user.id; //get the userId from the loggedin user
    const newComment = await Comment.create(reqBody);
    res.json(newComment);
});

/*
PUT - Update request based on the req body
1. Get the request body - update the comment, the activity and userId remains the same
2.Req body format:
{
    Comments:
}
*/

router.put('/:commentId', requireAuth, async (req, res, next) => {

    const commentId = req.params.commentId;
    const comment = await Comment.findOne({
        where: {
            id: commentId
        },
        attributes: ['userId']
    });
    if (comment.dataValues.userId === req.user.id) {
        await Comment.update(req.body,
            {
                where: {
                    id: commentId,
                }
            });
        const updatedComment = await Comment.findByPk(commentId);

        res.json(updatedComment);
    } else {
        res.json({ "message": "You can edit only the comments created by you" })
    }
});

/*
DELETE - given the comment Id
*/

router.delete('/:commentId', requireAuth, async (req, res, next) => {

    const commentId = req.params.commentId;

    const rowsAffected = await Comment.destroy({
        where: {
            id: commentId
        }
    });

    if (rowsAffected > 0) {
        res.json({ "message": "Successfully deleted" });
    } else {
        res.json({ "message": "No Deletion operation" });
    }
})

module.exports = router;
