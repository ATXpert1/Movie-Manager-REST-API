const moviesModel = require('./moviesModel');
const apiMoviesDAL = require('../DALs/apiMoviesDAL');
const subscriptionsBL = require('../models/subscriptionsBL');

const LoadMoviesToMongoDb = async () => {
    moviesModel.count(async function (err, count) {
        if (!err && count === 0) {
            const resp = await apiMoviesDAL.getMovies();
            let movies = resp.data;
            movies = movies.map((movie) => {
                return { name: movie.name, genres: movie.genres, image: movie.image.medium, premiered: movie.premiered }
            })
            moviesModel.insertMany(movies, function (err, docs) {
                if (err) {
                    console.log(err);
                }
                else {
                    return "movies added";
                }
            })
        }
    })
}
const getMovies = () => {
    return new Promise((resolve, reject) => {
        moviesModel.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}
const addMovie = (obj) => {
    return new Promise((resolve, reject) => {
        let movie = new moviesModel({
            name: obj.name,
            genres: obj.genres,
            image: obj.image,
            premiered: obj.premiered
        })
        movie.save(function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}
const updateMovie = (id, obj) => {
    return new Promise((resolve, reject) => {
        moviesModel.findByIdAndUpdate(id, obj, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}
const deleteMovie = (id) => {
    return new Promise((resolve, reject) => {
        moviesModel.findByIdAndDelete(id, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                subscriptionsBL.deleteMovieFromSubscriptions(id)
                    .then(x => resolve(x))
                    .catch(err => reject(err))
            }
        })
    })
}
module.exports = { LoadMoviesToMongoDb, getMovies, addMovie, updateMovie, deleteMovie };
