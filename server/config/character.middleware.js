const hotelMiddleware = (req, res, next) => {
  if (req.method === 'POST') {
    req.body = {
      ...req.body,
    };
  }
  next();
};

module.exports = (req, res, next) => {
  if (req.path === '/characters') {
    hotelMiddleware(req, res, next);
  } else {
    next();
  }
};
