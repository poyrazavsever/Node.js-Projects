
const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const path = require('path');

const errorController = require('./controllers/errors')
const sequelize = require('./utility/database');

const Category = require('./models/category')
const Product = require('./models/product')

app.set('view engine', 'pug')
app.set('views', './views')

const adminRoutes = require("./routes/admin")
const userRoutes = require("./routes/shop")

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "/public")))

app.use('/admin', adminRoutes)
app.use(userRoutes)

app.use(errorController.get404Page)

Product.belongsTo(Category, {
    foreignKey : {
        allowNull : false
    }
});
Category.hasMany(Product);

sequelize
    .sync({force : true})
    .then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    });

app.listen(3000, () => {
    console.log("listening on port 3000")
})
