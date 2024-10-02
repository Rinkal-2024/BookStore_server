const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Book = require("../models/Book");
const authMiddlware = require("../middleware/authMiddleware");


const bookRouter = express.Router();

bookRouter.post('/', authMiddlware, expressAsyncHandler(async(req, res) =>{
    const book = await Book.create(req.body);

    if(book){
        res.status(200).json(book);
    }else{
        res.status(500).json({message: 'Failed to create book'});
    }
}))

bookRouter.get('', expressAsyncHandler(async(req, res) =>{
    const book = await Book.find({})



    if(book){
        res.status(200).json(book);
    }else{
        res.status(500).json({message: 'There are no books'});
    }
}))

bookRouter.put('/:id',authMiddlware, expressAsyncHandler(async(req, res) =>{
    const book = await Book.findById(req.params.id);
    if (book) {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true , runValidators : true}
        );
        res.status(200);
        res.json(updatedBook); 
    }else{
        res.status(500).json('update failed')
    }
}))

bookRouter.delete('/:id', expressAsyncHandler(async(req, res) =>{
    try{
        const book = await Book.findByIdAndDelete(req.params.id);
        res.status(200)
        res.send(book);
    }catch(error){
        res.status(500).json({message: 'Delete failed'})
    }
}))

bookRouter.get('/:id' ,expressAsyncHandler(async(req,res)=>{
    try {
        const book = await Book.findById(req.params.id);
        res.status(200);
        res.send(book);
      } catch (error) {
        res.status(500);
        throw new Error('No book found');
      }
}))

module.exports = bookRouter;
