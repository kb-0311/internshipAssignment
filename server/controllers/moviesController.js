const Movie = require("../models/movieModels") ;
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require ("../middleware/catchAsyncErros.js") ;
const ApiFeatures = require ("../utils/apifeatures");

// Getting all Movies 
exports.getAllMovies = catchAsyncErrors( async (req , res) =>{
    const resultPerPage = 5;
    const MovieCount = await Movie.countDocuments();


    //used for searching specific queries
    const apiFeature    =   new ApiFeatures (Movie.find() , req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

    const Movies = await apiFeature.query
    res.status(200).json({
        message : "route is ok" ,
        MovieCount ,
        Movies})

})

// Getting a single Movie 
exports.getMovieDetails = catchAsyncErrors( async (req , res , next) =>{

    let Movie = await Movie.findById(req.params.id);

    if (!Movie) {
        return  next(new ErrorHandler("Movie not found" , 404));
    } else {
        res.status(200).json({
            success : true ,
            
            Movie
        })
            

    }

})





// Create tool review or Update tool review 

exports.createMovieReview = catchAsyncErrors( async (req , res , next) =>{

    const { rating , comment , MovieId } = req.body ;

    const review = {
        user : req.user._id ,
        name : req.user.name ,
        rating : Number(rating) ,
        comment : comment ,


    }

    const Movie = await Movie.findById(MovieId);

    const isReviewed = Movie.reviews.find(rev=>rev.user.toString()===req.user._id.toString());
    let message = ""
    if (isReviewed) {
        Movie.reviews.forEach(rev =>{
            if(rev.user.toString()===req.user._id.toString()) {
                rev.rating=rating ,
                rev.comment=comment
            }
        })
        message = "review updated successfully"
        
    } else {
        Movie.reviews.push(review);
        
        message = "review added successfully"
    }
    Movie.numOfReviews = Movie.reviews.length;

    let avgerageRating = 0 ;

    Movie.reviews.forEach(rev =>{
        avgerageRating+=rev.rating
    })

    Movie.ratings = Number (avgerageRating/Movie.reviews.length);

     await Movie.save({validateBeforeSave : false});

     res.status(200).json({
         success : true ,
         message : message
     })
        
})

// Get all reviews 

exports.getAllReviewsForSingleMovie = catchAsyncErrors ( async (req ,res , next)=>{

    const Movie = await Movie.findById(req.query.id) ;
    if (!Movie) {
        return  next(new ErrorHandler("Movie not found" , 404));
    }

    const reviewsForTheSearchedUtility = Movie.reviews ;

    res.status(200).json({
        success : true ,
        message : `here are all the reviews for the tool id: ${Movie._id} ` ,
        reviewsForTheSearchedUtility
    })
})
