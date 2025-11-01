import { body, validationResult } from "express-validator";

async function validation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const registerUserValidationRules = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be atleast 6 characters long"),

    body("fullName.firstName").notEmpty().withMessage("FirstName is required."),

    body("fullName.lastName").notEmpty().withMessage("LastName is required"),

    validation,
];
