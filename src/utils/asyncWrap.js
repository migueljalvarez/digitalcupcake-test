// Helper function that wraps express routes to handle rejected promises

module.exports = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((err) => {
    const e = {
      name: err.name,
      status: err.status || 500,
      message: err.message,
    }
    res.status(e.status).json(e)
  })
