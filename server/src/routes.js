import { Router } from "express";
import { homeController } from "./controllers/homeController.js";
import { userController } from "./controllers/userController.js";
import { blogController } from "./controllers/blogController.js";

export const routes = Router();

routes.use(homeController);
routes.use(userController);
routes.use(blogController);

routes.get('/*splat', (req, res) => {
    res.status(404).render('404', { pageTitle: '404 Page not found' });
});