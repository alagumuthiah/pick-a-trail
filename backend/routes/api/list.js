const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');

const { Trail, List } = require('../../db/models');

router.get('/', requireAuth, async (req, res, next) => {

    let lists = await List.scope('displayList').findAll({
        where: {
            userId: req.user.id
        }
    });
    res.json(lists);
});

router.post('/', requireAuth, async (req, res, next) => {
    /*Req body format:
    {
        "name":"newList",
        "privacy":"Public"
    }
    */
    let newList = req.body; //body has to be validated
    newList.trailList = null;
    newList.userId = req.user.id;
    let createdList = await List.create(newList);
    res.json(createdList);
});

router.get('/:listId', requireAuth, async (req, res, next) => {
    /*lazy loading to load the trail details in the trailList
        1. Query List with ListId
        2 .Get the list of trails from trailList, then use Lazy loading to
        query each Trail and get trail details
        3. Combine the result and return the response
    */
    let listId = req.params.listId;
    let selectedList = await List.findByPk(listId);

    if (selectedList && selectedList.trailList) {
        let trails = selectedList.trailList;
        const result = JSON.parse(trails);
        console.log(result.length);
        trails = [];
        //Lazy loading of the trails info
        for (let index = 0; index < result.length; index++) {
            const trailInfo = await Trail.findByPk(result[index]);
            trails.push(trailInfo);
        }
        res.json({
            selectedList,
            trails
        });
    } else {
        res.json(selectedList);
    }


});

/*To add trail to a list*/
router.put('/:listId', requireAuth, async (req, res, next) => {
    /*
        1.Find the List by Id
        2.If the userID in the List and req.user is same then allow to add the trail
        3.Else throw forbidden error
        4.To add a trail- first retrive the array from trailList and push the trailId from the body, update the instance with the new array of trailList
    */
    let { trailId } = req.body;
    let listId = req.params.listId;
    let listTobeUpdated = await List.findByPk(listId);
    if (listTobeUpdated) {
        if (listTobeUpdated.userId === req.user.id) {
            let trailList = JSON.parse(listTobeUpdated.trailList);
            if (!trailList) {
                trailList = [trailId];
            } else {
                trailList.push(trailId);
            }
            await listTobeUpdated.update({ trailList: JSON.stringify(trailList) });
            res.json(listTobeUpdated);
        } else {
            const err = new Error('Access Forbidden');
            err.title = "Forbidden";
            err.errors = ["You don't have necessary permission to access the requested resource"];
            err.status = 403;
            return next(err);
        }
    }
});

//TO DO - to delete trail from a  list

router.delete('/:listId', requireAuth, async (req, res, next) => {
    let listId = req.params.listId;
    const rowsDeleted = await List.destroy({
        where: {
            id: listId,
            userId: req.user.id //deletion can be done only to the lists that they created and cannot delete list created by others
        }
    });
    if (rowsDeleted > 0) {
        res.json({ "message": "Deletion successful" });
    } else {
        res.json({ "message": "No rows were deleted" });
    }
});

module.exports = router;
