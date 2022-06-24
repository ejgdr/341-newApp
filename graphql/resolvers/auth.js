const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const User = require('../../models/user');

module.exports = {
    createUser: async (args) => {
        try {
            const existingUser = await User.findOne({email: args.userInput.email})
            if(existingUser) {
                throw new Error ('User already exists.');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        
            const user = new User({
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                dateBirth: args.userInput.dateBirth,
                age: args.userInput.age,
                originallyFrom: args.userInput.originallyFrom,
                email: args.userInput.email,
                password: hashedPassword
            });

            const result = await user.save();
        
            return { ...result._doc, password: null, _id: result.id }; //to make it even more secure we will retrieve password as null
        } catch(err) {
            throw err;
        };                
    },
    login: async ({ email, password }) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }
        const token = jwt.sign({userId: user.id, email: user.email}, process.env.SECRET, {expiresIn: '1h'});
        return { userId: user.id, token: token, tokenExpiration: 1 };
    }
};