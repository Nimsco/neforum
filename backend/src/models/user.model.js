import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 50,
            trim: true,
            index: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        isBlocked: {
            type: Boolean,
            default: false,
        },

        refreshToken: {
            type: String,
            default: null,
        },
        recoveryKey: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const bcrypt = await import('bcryptjs');
        this.password = await bcrypt.hash(
            this.password,
            10
        );
    }
    next();
});

userSchema.pre('save', async function (next) {
    if (this.isModified('recoveryKey')) {
        const bcrypt = await import('bcryptjs');
        this.recoveryKey = await bcrypt.hash(
            this.recoveryKey,
            10
        );
    }
    next();
});

userSchema.methods.comparePassword = async function (
    candidatePassword
) {
    const bcrypt = await import('bcryptjs');
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
