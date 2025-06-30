import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up Handlebars view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views'));

const otherstuff = "hello there, this is other stuff!";

//Set handlebars routes
app.get('/', (req, res) => {
    res.render('home', {
        stuff : otherstuff
      });
});


// Set static files directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
