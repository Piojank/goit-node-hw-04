const User = require('./schemas/userSchema');

const listUsers = async () => {
    return User.find();
};

const userSignUp = async ({ email }) => {
    return User.findOne({ email });
};

const userLogIn = async ({ email }) => {
    return User.findOne({ email });
};

const userLogOut = async (id) => {
    return User.findOne({ _id: id });
};

const updateStatusUser = async (id, body) => {
    return User.findByIdAndUpdate({ _id: id }, body, { new: true });
};

module.exports = {
    listUsers,
    userSignUp,
    userLogIn,
    userLogOut,
    updateStatusUser,
};