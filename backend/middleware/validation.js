const { body, validationResult } = require('express-validator');

const validateRequest = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      await validation.run(req);
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  };
};

const chatValidation = [
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message cannot be empty')
    .isLength({ max: 500 })
    .withMessage('Message must be under 500 characters')
    .escape(),
  body('language')
    .optional()
    .isIn(['en', 'hi', 'mr', 'gu', 'bn', 'te', 'ta', 'bho'])
    .withMessage('Invalid language')
];

const electionValidation = [
  body('state')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('State name too long'),
  body('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  body('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];

const notificationValidation = [
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\d{10}$/)
    .withMessage('Phone must be exactly 10 digits')
];

const candidateValidation = [
  body('search')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search query too long'),
  body('party')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Party name too long')
];

module.exports = {
  validateRequest,
  chatValidation,
  electionValidation,
  notificationValidation,
  candidateValidation
};