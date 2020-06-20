const express = require('express');
const router = require('./userRoutes');
const routes = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/product');


//-------------------multer storage setup----------------------
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, `${__dirname}/../src/photos/`);
    },
    filename: (req, file, cb)=> {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname , ext);
      cb(null, `${basename}-${Date.now()}${ext}`);
    }
  });

const upload = multer({ storage : storage });



//-----------------------routes------------------------------------
router.post('/new' ,upload.single('image') , (req, res)=>{
    
    //form proccessed files
    const formTextData = req.body;
    const formFileData = req.file;

    const imageUrl = `http://localhost:5000/src/photos/${formFileData.filename}`;


    const newProduct = new Product({
        ...formTextData,
        productPrice : parseInt(formTextData.productPrice), 
        imageUrl
    });
    newProduct.save()
    .then(()=>{
        res.status(201).json({
            message : "Product created successfully"
        });
    })
    .catch(err=>{
        res.status(501).json({
            message : err
        });
    });

});


router.get('/all', (req, res)=>{
    Product.find({})
    .then(docs=>{
        res.status(201).json(docs);
    })
    .catch(err=>{
        res.status(501).json({
            message : err
        })
    });
});

router.get('/:id' , (req, res)=>{
    Product.findById(req.params.id)
    .then(doc=>{
        res.status(201).json(doc);
    })
    .catch(err=>{
        res.status(501).json({
            error : err
        });
    });
});

module.exports = router;