const express=require("express");
const { getAllMovies , getMovieDetails, createMovieReview , getAllReviewsForSingleMovie, createMovie} = require("../controllers/moviesController");
const { isAuthenticatedUser, autherizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/movies").get(getAllMovies) ;
router.route("/movie/:id").get(getMovieDetails);
router.route("/review").put(isAuthenticatedUser , createMovieReview)
router.route("/createmovie").post(isAuthenticatedUser , createMovie) ;
router.route("/allreviews").get(getAllReviewsForSingleMovie)



module.exports = router