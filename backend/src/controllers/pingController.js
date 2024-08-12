const getPing = (req, res) => {
    res.json({ ping: 'pong' });
  };
  
  module.exports = {
    getPing,
  };
  