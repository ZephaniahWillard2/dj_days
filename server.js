    //Not sure what i need to do here. do i need to set up node etc? 
    //I guess there wouldnt be much of this code we would use if no node.
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());
app.use(express.static('public'));

    //changed here
const albumsFilePath = path.join(_dirname, "data", "albums.json");

    //Changed here.
    //Not sure what to change here. Do i even need the error messages?
app.get('/api/albums', (req, res) => {
    fs.readFile(albumsFilePath, 'utf8', (err, data) =>{
        if(err){
            console.error('Error reading scores data:', err);
            res.status(500).send('Error Reading Scores data.');
            return;
        }
        try{
            const albums = JSON.parse(data);
            res.json(albums);
        }catch (parseError){
            console.error("Error parsing scores data:", parseError);
            res.status(500).send("Error parsing scores data.");
        }
    });
});

    //changed here.
    //again, do need the error messages? I guess yes, they just need to 
    //change to something about albums not submitting?
app.post('/api/albums', (req, res) =>{
    fs.readFile(albumsFilePath, 'utf8', (err, data) =>{
        if(err){
            console.error('Error reading scores data:', err);
            res.status(500).send('Error reading scores data.');
            return;
        }
        let albums;
        try{
            albums = JSON.parse(data);
        }catch(parseError){
            console.error('Error parsing scores data:', err);
            res.status(500).send("Error parsing scores data");
            return;
        }
        albums.push(req.body);

        fs.writeFile(albumsFilePath, JSON.stringify(albums, null, 2), (writeErr) =>{
            if(writeErr){
                console.error('Error saving new score:', writeErr);
                res.status(500).send('Error saving new score.');
                return;
            }
            res.status(201).send('album added.');
        });
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});