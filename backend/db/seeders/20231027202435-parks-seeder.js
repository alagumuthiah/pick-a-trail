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
    return await queryInterface.bulkInsert('Parks', [
      {
        name: 'Mount Rainier National Park',
        description: 'Mount Rainier National Park is located in west-central Washington and is ideal for hiking, mountain climbing and scenic drives.',
        area: 236381
      },
      {
        name: 'Olympic National Park',
        description: 'Situated on the Olympic Peninsula, Olympic National Park has a diverse landscape ranging from rugged Pacific shoreline with tide pools to temperate rainforests as the land expands to Mount Olympus.',
        area: 922650
      },
      {
        name: 'North Cascades National Park',
        description: 'North Cascades National Park is a rugged, wilderness of conifer trees. The park features hiking trails along tree covered mountains that seem to stretch on forever, alpine meadows, impressive glaciers, the Skagit River, and stunning views of alpine lakes like Lake Ann or Diablo Lake.',
        area: 504781
      },
      {
        name: 'Denali National Park',
        description: 'Denali National Park features the highest mountain in North America. Forests, tundra, and glaciers cover the 6 million acres. Visitors can experience dog sledding, cross country skiing, backpacking and camping.',
        area: 6000000
      },
      {
        name: 'Haleakala National Park',
        description: 'Explore cinder cones and old lava flows from within Haleakala, possibly the largest dormant volcano on the planet. Formed by erosion rather than volcanic activity, the valley at the summit of Haleakala boasts much to marvel at and the packed cinder and soil underfoot makes for a relatively easy hike.',
        area: 29093
      },
      {
        name: 'Yosemite National Park',
        description: 'With over 3.5 million yearly visitors from throughout the world, the iconic Yosemite National Park is known for some of the most beautiful hikes and landscapes in the United States.',
        area: 759620
      },
      {
        name: 'Rocky Mountain National Park',
        description: "Rocky Mountain National Park is one of the most popular natural parks featuring incredible mountain scenery. It is known for its alpine and subalpine lakes, peak hikes, and wildlife. You'll often catch a glimpse of an elk, moose, or marmot driving or hiking in the park.",
        area: 265807
      },
      {
        name: 'Yellowstone National Park',
        description: "Yellowstone National Park is America's first national park. Its landscape is vast spanning three states: Wyoming, Montana and Idaho. The park is home to a variety of wildlife including grizzly bears, wolves, bison, and elk.",
        area: 2219790
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Parks', {
      name: {
        [Op.in]: [
          'Mount Rainier National Park',
          'Olympic National Park',
          'North Cascades National Park',
          'Denali National Park',
          'Haleakala National Park',
          'Yosemite National Park',
          'Rocky Mountain National Park',
          'Yellowstone National Park'
        ]
      }
    }, {});
  }
};

/*
npx sequelize seed:generate --name parks-seeder
dotenv npx sequelize db:seed:all
*/
