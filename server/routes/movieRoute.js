const express=require("express");
const { getAllMovies , getMovieDetails, createMovieReview, getAllReviewsForSingleMovie} = require("../controllers/moviesController");
const { isAuthenticatedUser, autherizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/movies").get(getAllMovies) ;
router.route("/admin/movie/new").post(isAuthenticatedUser ,autherizeRoles("admin") ,createMovie) ;
router.route("/admin/movie/:id").put(isAuthenticatedUser,autherizeRoles("admin") , updateMovie);
router.route("/admin/movie/:id").delete(isAuthenticatedUser,autherizeRoles("admin")  , deleteMovie);
router.route("/movie/:id").get(getMovieDetails);
router.route("/review").put(isAuthenticatedUser , createMovieReview)
router.route("/allreviews").get(getAllReviewsForSingleMovie)
router.route("/review/delete").put(isAuthenticatedUser , autherizeRoles("admin") , deleteSingleReviewOfTheSearchedMovie)



module.exports = router