let express = require('express');
let app = express();
let mongoose = require('mongoose');
let postsRouter = require('./routes/posts');
let multer = require('multer');
let callbackRequestsRouter = require('./routes/callback-requests');
let emails = require('./routes/emails');
let Post = require('./models/posts').Post;
let userRouter = require('./routes/users');
let cookieParser = require('cookie-parser');
let auth = require('./controllers/auth');




mongoose.connect('mongodb://localhost/Travels',{useNewUrlParser: true, useUnifiedTopology: true});


app.use(express.json());
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'), 
    filename: (req, file, cb) => cb(null, file.originalname)
});

app.set('view engine', 'ejs');
app.use(multer({storage: imageStorage }).single('imageFile'));
app.use(cookieParser());
app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestsRouter);
app.use('/emails',emails);
app.use('/users', userRouter);

app.get('/sight',async (req, resp) => {
    let id = req.query.id;
    let post = await Post.findOne({id: id});
    resp.render('sight', {
        title: post.title,
        imageUrl: post.imageURL,
        date: post.date,
        text: post.text
    })
})


app.get('/admin', (req, resp) => {
    let token = req.cookies['auth_token'];
    if (token && auth.checkToken(token)){
        resp.render('admin');
    }else{
        resp.redirect('/login');
    }
    
})

app.use('/login', (req, resp) => {
    resp.render('login')
})
app.use(express.static('public'));
app.listen(4000, () => console.log('Listening 4000...'));