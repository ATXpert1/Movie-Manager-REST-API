const membersModel = require('./membersModel');
const subscriptionBl = require('./subscriptionsBL');
const apiMembersDAL = require('../DALs/apiMembersDAL');

const loadMembersToMongoDb = async () => {
    membersModel.count(async function (err, count) {
        if (!err && count === 0) {
            let resp = await apiMembersDAL.getMembers();
            let members = resp.data;
            members = members.map((member) => {
                return { name: member.name, email: member.email, city: member.address.city }
            })
            membersModel.insertMany(members, function (err, docs) {
                if (err) {
                    throw err;
                }
                else {
                    return console.log("members added");
                }
            })
        }
    })
}
const getMembers = () => {
    return new Promise((resovle, reject) => {
        membersModel.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resovle(data);
            }
        })
    })
}
const addMember = (obj) => {
    console.log(obj, "addMember, API")
    return new Promise((resolve, reject) => {
        let member = new membersModel({
            name: obj.name,
            email: obj.email,
            city: obj.city
        })
        member.save(function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}
const updateMember = (id, obj) => {
    return new Promise((resolve, reject) => {
        membersModel.findByIdAndUpdate(id, obj, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}
const deleteMember = (id) => {
    return new Promise((resolve, reject) => {
        subscriptionBl.deleteSubscription(id)
            .then(resp => resolve(resp))
            .catch(err => reject(err));
        membersModel.findByIdAndDelete(id, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}

module.exports = { loadMembersToMongoDb, getMembers, addMember, updateMember, deleteMember };
