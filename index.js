import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import request from 'request';
import bodyParser from 'body-parser';


const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Set API base URL
// Create call API function
function callAPI(finishedAPI, ticker) {
  request(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=pk_3f8c0b7d4e2a4f1b9c5c6b8d4e2a4f1b`, (error, response, body) => {
      if (!error && response.statusCode === 200) {
          const data = JSON.parse(body);
          // console.log(data);
          finishedAPI(data);
      } else {
          console.error('Error fetching data:', error);
          finishedAPI();
      }
  });
}

// Set up Handlebars view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views'));

const otherstuff = "hello there, this is other stuff!";

//Set handlebars routes
app.get('/', (req, res) => {
  callAPI(function(doneAPI) {
    res.render('home', {
      stock: doneAPI
    });
  });
});

//Set handlebars POST routes
app.post('/', (req, res) => {
  callAPI(function(doneAPI) {
  // post_stuff = req.body.stock_ticker;
    res.render('home', {
      stock: doneAPI,
      // post_stuff: post_stuff
    });
  }, req.body.stock_ticker);
});

// Create about route
app.get('/about', (req, res) => {
    res.render('about');
});

// Set static files directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
