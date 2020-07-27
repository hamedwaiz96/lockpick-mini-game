const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const DIFFICULTY_LEVELS = ['Novice', 'Apprentice', 'Adept', 'Expert', 'Master']

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    level: {
        type: String,
        enum: DIFFICULTY_LEVELS,
        required: true,
        default: 'Novice'
    },
    exp: {
        type: Number,
        required: true,
        minimum: 0,
        default: 0
    },
    unlocks: {
        type: Number,
        required: true,
        minimum: 0,
        default: 0
    },
    money: {
        type: Number,
        required: true,
        minimum: 0,
        default: 0
    },
    lockpicks: {
        type: Number,
        required: true,
        minimum: 0,
        default: 0
    },
    profilePicUrl: {
        type: String,
        required: true,
        default: 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
    },
}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    const user = this;

    if(!user.isModified('password')) {return next()};

    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {return next(err)};

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {return next(err)};
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {return callback(err)}
        callback(null, isMatch)
    });
};

module.exports = mongoose.model('User', userSchema);