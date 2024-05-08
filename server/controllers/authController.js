const passport = require("passport");

// Callback function for Google authentication
exports.googleCallback = (req, res, next) => {
    passport.authenticate("google", (err, user) => {
        if (err) {
            console.error('Error during Google authentication:', err);
            return res.status(500).json({ error: 'Internal server error. Failed to authenticate.' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed. User not authorized.' });
        }
        req.login(user, (err) => {
            if (err) {
                console.error('Error during login:', err);
                return res.status(500).json({ error: 'Internal server error. Failed to log in.' });
            }
            res.redirect("http://localhost:3000/dashboard");
        });
    })(req, res, next);
};

// Logic for handling successful login
exports.loginSuccess = async (req, res) => {
    if (req.user) {
        res.status(200).json({ message: "User logged in successfully", user: req.user });
    } else {
        res.status(400).json({ message: "Not authorized" });
    }
};

// Logout function
exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.error('Error during logout:', err);
            res.status(500).json({ error: 'Internal server error. Failed to logout.' });
        } else {
            // Redirect to http://localhost:3000 after logout
            res.redirect("http://localhost:3000");
        }
    });
};
