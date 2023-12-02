'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return await queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        trailId: 1,
        activityId: 1,
        starsReview: 5,
        comment: 'Just finished this hike today. The snow was tough but beautiful views. Very exhausted by the end of it but hiking sticks would have make things easier.'
      },
      {
        userId: 2,
        trailId: 1,
        starsReview: 4,
        comment: 'beautiful hike, but cloudy at the top minimal views.'
      },
      {
        userId: 1,
        trailId: 3,
        starsReview: 5,
        comment: 'Got here at 8.30am on a Saturday and had the top to myself. Passed about 20 groups of people on the way down. A bit of snow at the top but nothing prohibitive. Gorgeous views up top. Would not attempt if you fear heights.'
      },
      {
        userId: 2,
        trailId: 3,
        starsReview: 5,
        comment: 'Definitely a difficult trail. There’s a bit of a steep climb at the top with some rope. Bring plenty of water! Well maintained otherwise.'
      },
      {
        userId: 1,
        trailId: 5,
        activityId: 2,
        starsReview: 5,
        comment: 'So cool. We went down about 2.6 miles and then turned around, for total of a little over 5 miles, just for timing. Views are amazing. Such a great hike, we want to come back for the whole thing. Lots of sun.'
      },
      {
        userId: 2,
        trailId: 5,
        activityId: 3,
        starsReview: 4,
        comment: 'Any exposed skin will get burned when the sun is out. Dress accordingly. You"ll need more water than you think you will.'
      },
      {
        userId: 1,
        trailId: 6,
        activityId: 4,
        starsReview: 5,
        comment: 'Cannot beat the sunset views'
      },
      {
        userId: 2,
        trailId: 6,
        starsReview: 4,
        comment: 'Great morning workout. Very steep in places and stopped a few times on the way up. Beautiful 360 degree view at the top. Going down took us much longer because my wife was nervous about falling. We didn’t see anyone else with hiking poles and we were glad that we had them. Several other hikers commented that they wished they had theirs.'
      },
      {
        userId: 2,
        trailId: 7,
        starsReview: 5,
        comment: 'The trail was nice and well maintained, but way too crowded. Go in the morning to avoid the high heat. The views were great and going through the bunker was an interesting experience.'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      userId: {
        [Op.in]: [1, 2]
      }
    }, {});
  }
};


/*
npx sequelize seed:generate --name parks-seeder
dotenv npx sequelize db:seed:all
*/
