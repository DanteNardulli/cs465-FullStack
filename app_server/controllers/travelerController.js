class TravelerController {
  static getIndex(req, res) {
    const model = {
      title: 'Travlr — Explore the World',
      hero: {
        heading: 'Find your next great escape',
        subheading: 'Search, compare, and book the best trips.'
      },
      featured: [
        { id: 1, name: 'Santorini, Greece', price: '$1299', days: 5 },
        { id: 2, name: 'Kyoto, Japan', price: '$1799', days: 7 },
        { id: 3, name: 'Reykjavík, Iceland', price: '$1499', days: 4 }
      ]
    };
    res.render('travelers/index', model);
  }
}

module.exports = TravelerController;
