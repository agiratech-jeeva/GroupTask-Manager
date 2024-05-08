require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn.js")
const PORT = 5005;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./model/userSchema");
const taskdb = require("./model/Task.js");
const taskRoutes = require("./routes/taskRoutes.js")
const clientid = "345643699895-6l931slsj2sdcpir9uf6k2cagnnduqr4.apps.googleusercontent.com"
const clientsecret = "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";
const list = require('./routes/list.js');
// const authController = require("./controllers/authController.js"); 


app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
app.use(express.json());

// setup session
app.use(session({
    secret:"j1e2e1v2a2n01",
    resave:false,
    saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await userdb.findOne({googleId:profile.id});

            if(!user){
                user = new userdb({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)


passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});



app.get("/auth/google/callback", (req, res, next) => {
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
});
// app.get("/auth/google/callback", authController.googleCallback); // Route handler for Google authentication callback


app.get("/login/sucess",async(req,res)=>{
    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})
// app.get("/login/success", authController.loginSuccess); // Route handler for successful login

app.use("/task",taskRoutes)
app.use("/task/list",list);   //todo


app.get("/logout", (req, res) => {
    req.logout(function(err) {
        if (err) {
            console.error('Error during logout:', err);
            res.status(500).json({ error: 'Internal server error. Failed to logout.' });
        } else {
            // Redirect to http://localhost:3000 after logout
            res.redirect("http://localhost:3000");
        }
    });
});
// app.get("/logout", authController.logout); // Route handler for logout




app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`)
})