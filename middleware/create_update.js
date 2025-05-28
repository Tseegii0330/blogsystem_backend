import { body } from "express-validator";

//id , title , content , tags , author_id , created_at , updated_at , is_published
const createArticleVal = () => {
  return [
    body("Title").not().isEmpty(),
    body("content").not().isEmpty().withMessage("content empty!"),
  ];
};

const userValidator = () => {
  return [
    body("name").not().isEmpty(),
    body("email").not().isEmpty().withMessage("email is not empty"),
    body("password").not().isEmpty(),
    body("role").not().isEmpty().withMessage("fill the role"),
  ];
};

export { userValidator, createArticleVal };
