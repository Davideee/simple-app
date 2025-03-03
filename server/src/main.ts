import cors from "cors";
import "dotenv/config";
import express from 'express';
import * as path from "node:path";
import * as fs from "node:fs";

// initialize express app
const app = express();

app.use(cors()); // enable `CORS` for all routes
app.use(express.json()); // enable parsing of json request body
app.use(express.urlencoded({ extended: true }));
interface DirectoryTree {
    name: string;
    children?: (DirectoryTree | string)[];
}
function getDirectoryTree(dir: string): DirectoryTree | string {
    const stats = fs.statSync(dir);
    if (!stats.isDirectory()) return path.basename(dir);

    return {
        name: path.basename(dir),
        children: fs.readdirSync(dir)
            .map(file => getDirectoryTree(path.join(dir, file)))
    };
}

console.log(JSON.stringify(getDirectoryTree(path.join(__dirname))));

// set the port and provide fallback
const PORT = process.env.PORT || 3001;

// route handler to accept GET requests to `/api`
app.get('/api', (_req, res) => {
    res.status(200).json({ message: 'Hello from the server!' });
})


let counter = 0;

// Endpoint zum Abrufen des aktuellen Zählers
app.get('/api/counter', (_, res) => {
    res.json({ counter });
});

// Endpoint zum Setzen eines neuen Zählers
app.post('/api/counter', (req, res) => {
    const { newCount } = req.body;
    console.log(newCount)
    counter = newCount;
    res.json({ counter });
});



// Debugging: Log the current __dirname and the path for static files
console.log("Current __dirname:", __dirname);
console.log("Serving static files from:", path.join(__dirname, 'public'));




// Serve static files from the 'dist/public' folder
app.use(express.static(path.join(__dirname, 'public')));



// catch-all handler to serve the index.html for all routes
app.get('*', (_req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    console.log("Sending index.html from:", indexPath); // Log the final path to index.html
    res.sendFile(indexPath);
});

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
