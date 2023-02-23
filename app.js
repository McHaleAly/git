const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = required('./models/blog');

// express app
const app = express();

//connect to mongodb
const dbURI = "mongodb+srv://<almchale>:<momw4kids>@nodetuts.bauetio.mongodb.net/nodetuts?retryWrites=true&w=majority";

mongoose.connect(dbURI,{ useNewUrlParser: true, userUnifiedTopology: true})
.then(result => app.listen(3000))
.catch(err => console.log(err));


//register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev')); 

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res => {
    const blog = new Blog ({
        title: 'new blog', 
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/', (req, res) => {
    const blogs = [
        {title:'Yoshi finds eggs', snippet:'Lorem ipsum dolor sit amet consectetur'},
        {title:'Mario finds stars', snippet:'Lorem ipsum dolor sit amet consectetur'},
        {title:'How to defeat browser', snippet:'Lorem ipsum dolor sit amet consectetur'},
    ];
  res.render('index', {title:'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about',{ title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create',{ title: 'Create a new Blog' });
});

// 404 page
app.use((req, res) => {
    res.render(404).render('404',{ title: '404' });
});