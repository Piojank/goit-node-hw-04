const service = require("../service/usersService");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const { User } = require('../service/schemas/userSchema');

require("dotenv").config();
const secret = process.env.SECRET;

const listUsers = async (req, res) => {
    try {
        const result = await service.listUsers();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const signUp = async (req, res, next) => {
    const { password, email, subscription, token } = req.body
    const user = await service.findOne({ email });

    if (user) {
        return res.status(409).json({
            status: 'Error',
            message: 'Email is already in use',
            data: 'Conflict',
        });
    }

    try {
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        await User.create({ 
            password: hashPassword, 
            email, 
            subscription, 
            token 
        });
        res.status(201).json({
            status: 'success',
            data: {
                    user: {
                    email,
                    subscription
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

const logIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.validPassword(password)) {
        return res.status(400).json({
            status: 'Error',
            message: 'Incorrect email or password',
            data: 'Bad request',
        });
    }

    if (!user.verify) {
        return res.status(400).json({
            status: 'Error',
            message: 'User not verified!',
        });
    }

    try {
        const payload = {
            id: user._id,
            email: user.email,
        };

        const token = jwt.sign(payload, secret, {
            expiresIn: '1h',
        });

        await User.findByIdAndUpdate(
            { _id: user._id },
            { token }
        );

        res.status(200).json({
            status: 'Success',
            data: {
                token,
                user: {
                email: user.email,
                subscription: user.subscription,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

const logOut = async (req, res, next) => {
    const { _id } = req.user;
    try {
        await User.findOneAndUpdate(
            { _id: _id },
            { token: null }
        );
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

const getCurrent = async (req, res, next) => {
    const { email, subscription } = req.user
    try {
        res.status(200).json({
            status: 'Success',
            data: {
                email: email,
                subscription: subscription,
            },
        });
    } catch (error) {
        next(error);
    }
};


const updateStatusUser = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { subscription } = req.body;
        const result = await User.findByIdAndUpdate({
            _id: _id,
        });
        if (!result) {
            res.status(404).json({ 
                error: 'Not found' 
            });
        }
        result.subscription = subscription;
        await result.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            status: 'Error',
        });
    }
};

module.exports = {
    listUsers,
    signUp,
    logIn,
    logOut,
    getCurrent,
    updateStatusUser,
};