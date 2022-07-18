const res = require('express/lib/response');
const subscriptionsModel = require('./subscriptionsModel');

const getSubscriptions = () => {
    return new Promise((resolve, reject) => {
        subscriptionsModel.find({}, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}
const addSubscription = (memberId, movieInfo) => {
    return new Promise((resolve, reject) => {
        // check if subscription exists
        subscriptionsModel.findOne({ memberId: memberId }, function (err, subscription) {
            if (err) {
                reject(err);
            }
            else {
                if (subscription) {
                    console.log(subscription)
                    subscription.movies.push({ movieId: movieInfo.movieId, date: movieInfo.date })
                    subscription.save((err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(err);
                        }
                    });
                }
                // if subscription is yet to exist
                else {
                    let subscription = new subscriptionsModel({
                        memberId: memberId,
                        movies: [{ movieId: movieInfo.movieId, date: movieInfo.date }]
                    })
                    subscription.save((err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve("success");
                        }
                    })
                }
            }
        })

    })
}
const deleteMovieFromSubscriptions = (movieId) => {
    return new Promise((resolve, reject) => {
        subscriptionsModel.find({}, function (err, subscriptions) {
            if (err) {
                reject(err);
            }
            else {
                subscriptions.forEach((subscription) => {
                    let index = subscription.movies.findIndex(movie => movie.movieId == movieId);
                    let removedMovie = subscription.movies.splice(index, 1);
                    subscription.save((err) => {
                        if (err) {
                            reject(err);
                        }
                    })
                })
                resolve("success");
            }
        })
    })
}
const deleteSubscription = (id) => {
    return new Promise((resolve, reject) => {
        subscriptionsModel.deleteOne({memberId: id}, function (err, data) {
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        })
    })
}
module.exports = { getSubscriptions, addSubscription, deleteMovieFromSubscriptions, deleteSubscription };
