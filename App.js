const express = require('express')
const cors= require('cors')
const axios = require('axios')
const app = express()
const port = 3000
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};


const urlPosts = "https://jsonplaceholder.typicode.com/posts"
const urlPhotos="https://jsonplaceholder.typicode.com/photos"


app.use(cors(corsOptions))


app.get('/api/posts',async (req, res) => {
      try {
        const [posts, photos] = await Promise.all([
      axios.get(urlPosts),
      axios.get(urlPhotos)
    ]);
    let slicedPhotos = photos.data.slice(0,100);




    const combinedArray = Array.from({ length: 100 }, (_, index) => ({   userId:posts.data[index].userId,idPost:posts.data[index].id,   
        titlePost:posts.data[index].title,
        
        body:posts.data[index].body, albumId: slicedPhotos[index].albumId,  idPhoto: slicedPhotos[index].id, PhotoTitle: slicedPhotos[index].title, url: slicedPhotos[index].url,
           thumbnailUrl: slicedPhotos[index].thumbnailUrl }));

            console.log(combinedArray);


    res.json(combinedArray);
    

}catch (error) {
    console.log(error)}
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})