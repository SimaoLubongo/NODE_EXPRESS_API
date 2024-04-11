import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
uuidv4();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

//GET request to root URL
app.get('/', (req, res) => res.send('Hello World'));

//Routes

let users = [];

//----------------------------User details--------------------- 
//GET request to /user endpoint
app.get('/user', (req, res) => {
    res.send(users);
})

//POST request to /user endpoint
app.post('/user', (req, res) => {
    const user = req.body;

    users.push({ ...user, id: uuidv4() });

    res.send(`User with the name ${user.firstName} has been added to the database!`);
});

//GET request to /user/:id endpoint to find a user with a particular id 
app.get('/user/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id == id);

    res.send(foundUser);
});

//DELETE request to /user/:id endpoint to delete a user using a particular id
app.delete('/user/:id', (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id != id);

    res.send(`User with the id ${id} deleted from the database!`);
});

//PATCH request to /user/:id endpoint to update a user's details using the user's id
app.patch('/user/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, address } = req.body;

    const user = users.find((user) => user.id == id);

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (address) user.address = address;

    res.send(`User with the id ${id} has been updated from the database!`);
});

//----------------------------Category---------------------------
let categories = [];

//GET request to /category endpoint
app.get('/category', (req, res) => {
    res.send(categories);
})

//POST request to /category endpoint
app.post('/category', (req, res) => {
    const category = req.body;

    categories.push({ ...category, id: uuidv4() });

    res.send(`Category named ${category.categoryName} has been added to the database!`);
});

//GET request to /category/:id endpoint to find a certain category with a particular id 
app.get('/category/:id', (req, res) => {
    const { id } = req.params;

    const foundCategories = categories.find((category) => category.id == id);

    res.send(foundCategories);
});

//DELETE request to /category/:id endpoint to delete a category using a particular id
app.delete('/category/:id', (req, res) => {
    const { id } = req.params;

    categories = categories.filter((category) => category.id != id);

    res.send(`Category ${id} deleted from the database! `);
});

//PATCH request to /category/:id endpoint to update a category using a particular id
app.patch('/category/:id', (req, res) => {
    const { id } = req.params;
    const { categoryName, image } = req.body;

    const category = categories.find((category) => category.id == id);

    if (categoryName) category.categoryName = categoryName;
    if (image) category.image = image;

    res.send(`Category with the id ${id} has been updated from the database!`);
});

//----------------------------Cart---------------------------

let cartSummary = [];

//GET request to /cart endpoint
app.get('/cart', (req, res) => {
    res.send(cartSummary);
})

//POST request to /cart endpoint
app.post('/cart', (req, res) => {
    const cart = req.body;

    cartSummary.push({ ...cart, id: uuidv4() });

    res.send(`Items have been added to cart!`);
});

//GET request to /cart/:id endpoint to find a cart using cart id 
app.get('/cart/:id', (req, res) => {
    const { id } = req.params;

    const foundCart = cartSummary.find((cart) => cart.id == id);

    res.send(foundCart);
});

//DELETE request to /cart/:id endpoint to delete a cart using a cart id
app.delete('/cart/:id', (req, res) => {
    const { id } = req.params;

    cartSummary = cartSummary.filter((cart) => cart.id != id);

    res.send(`Cart number ${id} has been deleted from the database! `);
});

//PATCH request to /cart/:id endpoint to update a cart using a cart id
app.patch('/cart/:id', (req, res) => {
    const { id } = req.params;
    const { numItems, itemDescription, address } = req.body;

    const cart = cartSummary.find((cart) => cart.id == id);

    if (numItems) cartSummary.numItems = numItems;
    if (itemDescription) cartSummary.itemDescription = itemDescription;
    if (address) cartSummary.address = address;

    res.send(`Cart number ${id} has been updated from the database!`);
});

//----------------------------delivery---------------------------

let deliveryDetails = [];

//GET request to /delivery endpoint
app.get('/delivery', (req, res) => {
    res.send(deliveryDetails);
});

//POST request to /delivery endpoint
app.post('/delivery', (req, res) => {
    const delivery = req.body;

    deliveryDetails.push({ ...delivery, id: uuidv4() });

    res.send(`Delivery address ${delivery.address} has been added to database!`);
});

//GET request to /delivery/:id endpoint to find an address using a delivery id 
app.get('/delivery/:id', (req, res) => {
    const { id } = req.params;

    const foundAddress = deliveryDetails.find((delivery) => delivery.id == id);

    res.send(foundAddress);
});

//DELETE request to /delivery/:id endpoint to delete a delivery id
app.delete('/delivery/:id', (req, res) => {
    const { id } = req.params;

    deliveryDetails = deliveryDetails.filter((delivery) => delivery.id != id);

    res.send(`Delivery ID ${id} has been deleted from the database!`);
});

//PATCH request to /delivery/:id endpoint to update delivery details using a delivery id
app.patch('/delivery/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, address } = req.body;

    const delivery = deliveryDetails.find((delivery) => delivery.id == id);

    if (firstName) deliveryDetails.firstName = firstName;
    if (lastName) deliveryDetails.lastName = lastName;
    if (address) deliveryDetails.address = address;

    res.send(`Delivery details for ${id} has been updated from the database!`);
});

//Start server
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})

module.exports = app;

