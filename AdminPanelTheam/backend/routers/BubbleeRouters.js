

const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
const aws = require("aws-sdk");

aws.config.update({
  accessKeyId: "AKIARD63KSO4FYHW7VVX",
  secretAccessKey: "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",
  region: "ap-south-1",
});

let uploadFiles = async (file) => {
  return new Promise(function (resolve, reject) {
    // this function will upload file to aws and return the link

    let s3 = new aws.S3({ apiVersion: "2006-03-01" }); // we will be using the s3 service of aws

    var uploadParams = {
      Bucket: "bp-profilepicture-upload",
      Key: "abc/" + file.originalname,
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ error: err });
      }
      console.log("file uploaded succesfully");
      return resolve(data.Location);
    });
  });
};

const affilSchema = require('../modal/Affliate')
const CreateAffiliatedPartner = async function(req,res){
  try {
    const data = req.body;
    const files = req.files

    const {} = data
    if (
      !(
        files[0].mimetype == "image/png" ||
        files[0].mimetype == "image/jpg" ||
        files[0].mimetype == "image/jpeg"
      )
    ) {
      return res.status(400).send({
        status: false,
        message: "Only .png, .jpg and .jpeg format allowed!",
      });
    }
    let uploadedFileURL = await uploadFiles(files[0]);

    data.profilePic = uploadedFileURL;

    
    let CreateAffiliatedPartner = await affilSchema.create(data)
    return res.status(201).send({
      status: true,
      message: "Success",
      profilePic: uploadedFileURL,
    });
    
    
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
}

router.post('/CreateAffiliatedPartners', CreateAffiliatedPartner);


//////////////////////////////////////////
router.delete('/CreateAffiliatedPartners/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return res.status(400).json({ error: 'Invalid id parameter' });
    }
    const result = await affilSchema.deleteOne({ _id: id });
    res.json({ message: 'Affiliated partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
//////////////////////////////////////////
router.put('/CreateAffiliatedPartners/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  
  console.log(id)
  

  try {
    const updates = await affilSchema.findOne({_id:id});
    if (!updates) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    const updateddata = await affilSchema.findByIdAndUpdate(id, data, { new: true });
    if (!updateddata) {
      return res.status(500).json({ error: 'Failed to update affiliate' });
    }

    console.log(updateddata);
    return res.status(200).send({ status: true, message: "Success", data: updateddata });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});


//get affillatte


router.get('/CreateAffiliatedPartners/:id', async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id); 
    const savedDropdwn = await affilSchema.findById(id);
    console.log(savedDropdwn);

    res.status(200).json(savedDropdwn);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});


router.get('/CreateAffiliatedPartners', async (req, res) => {
  try {
       console.log("hello")
  
// console.log(newBusinessState)
    const savedDropdwn = await affilSchema.find();
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});


//post business sttatee
const BusinessStateSchema = require('../modal/BusinessState');

router.post('/AddBusinessState', async (req, res) => {
  try {
    const { BusinessState, Country, State, Tax } = req.body;
console.log(req.body)
    // const newBusinessState = new BusinessStateSchema({
    //   BusinessState,
    //   Country,
    //   State,
    //   Tax,
    // });
// console.log(newBusinessState)
    const savedDropdwn = await BusinessStateSchema.create(req.body);
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});



//GET API


router.get('/AddBusinessState', async (req, res) => {
  try {
       console.log("hello")
    // const newBusinessState = new BusinessStateSchema({
    //   BusinessState,
    //   Country,
    //   State,
    //   Tax,
    // });
// console.log(newBusinessState)
    const savedDropdwn = await BusinessStateSchema.find();
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});




// BusinessState.find({}, (err, businessStates) => {
//   if (err) {
//     console.error(err)
//   } else {
//     console.log(businessStates)
//   }
// })




// router.post('/AddBusinessCountry', async (req, res) => {
//   const { CountryName, Currency, Status } = req.body;

//   if (!CountryName || !Currency || !Status) {
//     return res.status(422).json({ error: 'Please fill the field properly' });
//   }

//   try {
//     const AddBusinessCountry = new BusinessCountry({
//       CountryName,
//       Currency,
//       Status,
//     });

//     const NewAddBusinessCountry = await AddBusinessCountry.save();

//     if (NewAddBusinessCountry) {
//       res.status(201).json({ message: 'Country Added Successfully' });
//     } else {
//       res.status(201).json({ message: 'Country Register Failed' });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send('Server Error');
//   }
// });

// router.post('/AddBusinessState', async (req, res) => {
//   const { BusinessState, Currency, Status } = req.body;

//   if (!BusinessState || !Currency || !Status) {
//     return res.status(422).json({ error: 'Please fill the field properly' });
//   }

//   try {
//     const AddBusinessState = new BAddBusinessStateSchema({
//       BusinessState,
//       Currency,
//       Status,
//     });

//     const NewAddBusinessStat = await AddBusinessState.save();

//     if (NewAddBusinessStat) {
//       res.status(201).json({ message: 'State Added Successfully' });
//     } else {
//       res.status(201).json({ message: 'State Register Failed' });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send('Server Error');
//   }
// });

//post addbusinesscountry

const BusinessCountrySchema = require('../modal/BusinessCountry');

router.post('/AddBusinessCountry', async (req, res) => {
  try {
    const { CountryName, Currency, SelectCurrency, Status } = req.body;
console.log(req.body)
    // const newBusinessState = new BusinessStateSchema({
    //   BusinessState,
    //   Country,
    //   State,
    //   Tax,
    // });
// console.log(newBusinessState)
    const savedDropdwn = await BusinessCountrySchema.create(req.body);
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});





//get api


router.get('/AddBusinessCountry', async (req, res) => {
  try {
       console.log("hello")
   
// console.log(newBusinessState)
    const savedDropdwn = await BusinessCountrySchema.find();
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});

//POST tax



const TaxSchema = require('../modal/Tax');

router.post('/AddCountryTax', async (req, res) => {
  try {
    const { Country, State, Tax } = req.body;
console.log(req.body)
    // const newBusinessState = new BusinessStateSchema({
    //   BusinessState,
    //   Country,
    //   State,
    //   Tax,
    // });
// console.log(newBusinessState)
    const savedDropdwn = await TaxSchema.create(req.body);
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});



//get tax

router.get('/AddCountryTax', async (req, res) => {
  try {
    const { Country, State, Tax } = req.body;
console.log(req.body)
    // const newBusinessState = new BusinessStateSchema({
    //   BusinessState,
    //   Country,
    //   State,
    //   Tax,
    // });
// console.log(newBusinessState)
    const savedDropdwn = await TaxSchema.find();
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});



const GeneralSchema = require('../modal/General');

router.post('/GlobalSetup', async (req, res) => {
  try {
    // const { Country, State, Tax } = req.body;
// console.log(req.body)
    // const newBusinessState = new BusinessStateSchema({
    //   BusinessState,
    //   Country,
    //   State,
    //   Tax,
    // });
// console.log(newBusinessState)
    const savedDropdwn = await GeneralSchema.create(req.body);
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});


///post createcustomer




aws.config.update({
  accessKeyId: "AKIARD63KSO4FYHW7VVX",
  secretAccessKey: "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",
  region: "ap-south-1",
});

let uploadFile = async (file) => {
  return new Promise(function (resolve, reject) {
    // this function will upload file to aws and return the link

    let s3 = new aws.S3({ apiVersion: "2006-03-01" }); // we will be using the s3 service of aws

    var uploadParams = {
      Bucket: "bp-profilepicture-upload",
      Key: "abc/" + file.originalname,
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ error: err });
      }
      console.log("file uploaded succesfully");
      return resolve(data.Location);
    });
  });
};

const CreateCustomerSchema = require('../modal/CreateCustomer');
const CreateCustomer = async function(req,res){
  try {
    const data = req.body;
    const files = req.files

    const {Name ,MobileNumber,EmailId,profilePic} = data
    if (
      !(
        files[0].mimetype == "image/png" ||
        files[0].mimetype == "image/jpg" ||
        files[0].mimetype == "image/jpeg"
      )
    ) {
      return res.status(400).send({
        status: false,
        message: "Only .png, .jpg and .jpeg format allowed!",
      });
    }
    let uploadedFileURL = await uploadFile(files[0]);

    data.profilePic = uploadedFileURL;

    //creating customer
    let CreateCustomer = await CreateCustomerSchema.create(data)
    return res.status(201).send({
      status: true,
      message: "Success",
      profilePic: uploadedFileURL,
    });
    
    
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
}

////////////Get customer by id 

router.get('/CreateCustomer/:id', async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id); 
    const savedDropdwn = await CreateCustomerSchema.findById(id);
    console.log(savedDropdwn);

    res.status(200).json(savedDropdwn);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});



router.get('/CreateCustomer', async (req, res) => {
  try {
    const {Name ,MobileNumber,EmailId,profilePic  } = req.body;
console.log(req.body)
    // const newBusinessState = new BusinessStateSchema({
    //   BusinessState,
    //   Country,
    //   State,
    //   Tax,
    // });
// console.log(newBusinessState)
    const savedDropdwn = await CreateCustomerSchema.find();
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});

router.post('/CreateCustomer', CreateCustomer);

///////////Delete Customer 


router.delete('/CreateCustomer/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return res.status(400).json({ error: 'Invalid id parameter' });
    }
    const result = await CreateCustomerSchema.deleteOne({ _id: id });
    res.json({ message: 'Affiliated partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

////////////put Customer

router.put('/CreateCustomer/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  
  console.log(id)
  

  try {
    const updates = await CreateCustomerSchema.findOne({_id:id});
    if (!updates) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    const updateddata = await CreateCustomerSchema.findByIdAndUpdate(id, data, { new: true });
    if (!updateddata) {
      return res.status(500).json({ error: 'Failed to update Customer' });
    }

    console.log(updateddata);
    return res.status(200).send({ status: true, message: "Success", data: updateddata });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//post Merchant


// const MerchantSchema = require('../modal/Merchant');

// router.post('/CreateMerchants', async (req, res) => {
//   try {
//     const { } = req.body;
// console.log(req.body)
    
//     const savedDropdwn = await MerchantSchema.create(req.body);
//     console.log(savedDropdwn);

//     res.status(201).json(savedDropdwn);
//   } 

  
//    catch (error) {
//     console.log(error.message)
//     res.status(400).json({ message: error.message });
//   }
// });


// post Merchant


aws.config.update({
  accessKeyId: "AKIARD63KSO4FYHW7VVX",
  secretAccessKey: "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",
  region: "ap-south-1",
});

let uploadsFiles = async (file) => {
  return new Promise(function (resolve, reject) {
    // this function will upload file to aws and return the link

    let s3 = new aws.S3({ apiVersion: "2006-03-01" }); // we will be using the s3 service of aws

    var uploadParams = {
      Bucket: "bp-profilepicture-upload",
      Key: "abc/" + file.originalname,
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ error: err });
      }
      console.log("file uploaded succesfully");
      return resolve(data.Location);
    });
  });
};

const MerchantSchema = require('../modal/Merchant');
const CreateMerchants = async function(req,res){
  try {
    const data = req.body;
    const files = req.files

    const {} = data
    if (
      !(
        files[0].mimetype == "image/png" ||
        files[0].mimetype == "image/jpg" ||
        files[0].mimetype == "image/jpeg"
      )
    ) {
      return res.status(400).send({
        status: false,
        message: "Only .png, .jpg and .jpeg format allowed!",
      });
    }
    let uploadedFileURL = await uploadsFiles(files[0]);

    data.profilePic = uploadedFileURL;

    //creating customer
    let CreateMerchants = await MerchantSchema.create(data)
    return res.status(201).send({
      status: true,
      message: "Success",
      profilePic: uploadedFileURL,
    });
    
    
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
}




router.post('/CreateMerchants', CreateMerchants);
///////Get merchant by id

router.get('/CreateMerchants/:id', async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id); 
    const savedDropdwn = await MerchantSchema.findById(id);
    console.log(savedDropdwn);

    res.status(200).json(savedDropdwn);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

//get merchannt
router.get('/CreateMerchants', async (req, res) => {
  try {
       console.log("hello")
   
// console.log(newBusinessState)
    const savedDropdwn = await MerchantSchema.find();
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});


//////Put merchant

router.put('/CreateMerchants/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  
  console.log(id)
  

  try {
    const updates = await MerchantSchema.findOne({_id:id});
    if (!updates) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    const updateddata = await MerchantSchema.findByIdAndUpdate(id, data, { new: true });
    if (!updateddata) {
      return res.status(500).json({ error: 'Failed to update affiliate' });
    }

    console.log(updateddata);
    return res.status(200).send({ status: true, message: "Success", data: updateddata });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});
////////////Delete Merchants


router.delete('/CreateMerchants/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return res.status(400).json({ error: 'Invalid id parameter' });
    }
    const result = await MerchantSchema.deleteOne({ _id: id });
    res.json({ message: 'Affiliated partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

//POST MerchantDetails



aws.config.update({
  accessKeyId: "AKIARD63KSO4FYHW7VVX",
  secretAccessKey: "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",
  region: "ap-south-1",
});

let Upload = async (file) => {
  return new Promise(function (resolve, reject) {
    // this function will upload file to aws and return the link

    let s3 = new aws.S3({ apiVersion: "2006-03-01" }); // we will be using the s3 service of aws

    var uploadParams = {
      Bucket: "bp-profilepicture-upload",
      Key: "abc/" + file.originalname,
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ error: err });
      }
      console.log("file uploaded succesfully");
      return resolve(data.Location);
    });
  });
};

const MerchantDetailsSchema = require('../modal/MerchantDetails');
const MerchantDetails = async function(req,res){
  try {
    const data = req.body;
    const files = req.files

    const {} = data
    if (
      !(
        files[0].mimetype == "image/png" ||
        files[0].mimetype == "image/jpg" ||
        files[0].mimetype == "image/jpeg"
      )
    ) {
      return res.status(400).send({
        status: false,
        message: "Only .png, .jpg and .jpeg format allowed!",
      });
    }
    let uploadedFileURL = await Upload(files[0]);

    data.profilePic = uploadedFileURL;

    //creating customer
    let MerchantDetails = await MerchantDetailsSchema.create(data)
    return res.status(201).send({
      status: true,
      message: "Success",
      profilePic: uploadedFileURL,
    });
    
    
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
}


router.post('/CreateCategory',MerchantDetails );



/////////////Get Merchant By id 

router.get('/CreateCategory/:id', async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id); 
    const savedDropdwn = await MerchantDetailsSchema.findById(id);
    console.log(savedDropdwn);

    res.status(200).json(savedDropdwn);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

//get merchant


router.get('/CreateCategory', async (req, res) => {
  try {
       console.log("hello")
   
// console.log(newBusinessState)
    const savedDropdwn = await MerchantDetailsSchema.find();
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});


///////////////Put Merchant Details
router.put('/CreateCategory/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  
  console.log(id)
  

  try {
    const updates = await MerchantDetailsSchema.findOne({_id:id});
    if (!updates) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    const updateddata = await MerchantDetailsSchema.findByIdAndUpdate(id, data, { new: true });
    if (!updateddata) {
      return res.status(500).json({ error: 'Failed to update affiliate' });
    }

    console.log(updateddata);
    return res.status(200).send({ status: true, message: "Success", data: updateddata });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//////////////////Delete Merchant Details


router.delete('/CreateCategory/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return res.status(400).json({ error: 'Invalid id parameter' });
    }
    const result = await MerchantDetailsSchema.deleteOne({ _id: id });
    res.json({ message: 'Affiliated partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
/////////////////////////////Item category

const CreateItemCategorieschema = require('../modal/CreateItemCategory');

router.post('/CreateItemCategory', async (req, res) => {
  try {
    const {  } = req.body;
console.log(req.body)
    // const newBusinessState = new BusinessStateSchema({
    //   BusinessState,
    //   Country,
    //   State,
    //   Tax,
    // });
// console.log(newBusinessState)
    const savedDropdwn = await CreateItemCategorieschema.create(req.body);
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});
    

//////Delete CreateItemCategory

router.delete('/CreateItemCategory/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return res.status(400).json({ error: 'Invalid id parameter' });
    }
    const result = await CreateItemCategorieschema.deleteOne({ _id: id });
    res.json({ message: 'Affiliated partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get CreateItemCategory
router.get('/CreateItemCategory', async (req, res) => {
  try {
       console.log("hello")
   
// console.log(newBusinessState)
    const savedDropdwn = await CreateItemCategorieschema.find();
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});

////Get itemCategory by id

router.get('/CreateItemCategory/:id', async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id); 
    const savedDropdwn = await CreateItemCategorieschema.findById(id);
    console.log(savedDropdwn);

    res.status(200).json(savedDropdwn);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});


////Put Item Category
router.put('/CreateItemCategory/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  
  console.log(id)
  

  try {
    const updates = await CreateItemCategorieschema.findOne({_id:id});
    if (!updates) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    const updateddata = await CreateItemCategorieschema.findByIdAndUpdate(id, data, { new: true });
    if (!updateddata) {
      return res.status(500).json({ error: 'Failed to update affiliate' });
    }

    console.log(updateddata);
    return res.status(200).send({ status: true, message: "Success", data: updateddata });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//post and get catalogue

//////////////////////////////////////////////////////////////////


aws.config.update({
  accessKeyId: "AKIARD63KSO4FYHW7VVX",
  secretAccessKey: "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",
  region: "ap-south-1",
});

let upload = async (file) => {
  return new Promise(function (resolve, reject) {
    // this function will upload file to aws and return the link

    let s3 = new aws.S3({ apiVersion: "2006-03-01" }); // we will be using the s3 service of aws

    var uploadParams = {
      Bucket: "bp-profilepicture-upload",
      Key: "abc/" + file.originalname,
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ error: err });
      }
      console.log("file uploaded succesfully");
      return resolve(data.Location);
    });
  });
};

const ItemCatalogueSchema = require('../modal/ItemCatalogue');
const ItemCatalogue = async function(req,res){
  try {
    const data = req.body;
    const files = req.files

    const {} = data
    if (
      !(
        files[0].mimetype == "image/png" ||
        files[0].mimetype == "image/jpg" ||
        files[0].mimetype == "image/jpeg"
      )
    ) {
      return res.status(400).send({
        status: false,
        message: "Only .png, .jpg and .jpeg format allowed!",
      });
    }
    let uploadedFileURL = await upload(files[0]);

    data.profilePic = uploadedFileURL;

    //creating customer
    let ItemCatalogue = await ItemCatalogueSchema.create(data)
    return res.status(201).send({
      status: true,
      message: "Success",
      profilePic: uploadedFileURL,
    });
    
    
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
}



router.post('/CatalogueCategory', ItemCatalogue);


//get  catalogue
router.get('/CatalogueCategory', async (req, res) => {
  try {
       console.log("hello")
   
// console.log(newBusinessState)
    const savedDropdwn = await ItemCatalogueSchema.find();
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});
/////////// GeT catalogue by id



router.get('/CatalogueCategory/:id', async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id); 
    const savedDropdwn = await ItemCatalogueSchema.findById(id);
    console.log(savedDropdwn);

    res.status(200).json(savedDropdwn);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});


////Put Item Catalogue
router.put('/CatalogueCategory/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  
  console.log(id)
  

  try {
    const updates = await ItemCatalogueSchema.findOne({_id:id});
    if (!updates) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    const updateddata = await ItemCatalogueSchema.findByIdAndUpdate(id, data, { new: true });
    if (!updateddata) {
      return res.status(500).json({ error: 'Failed to update affiliate' });
    }

    console.log(updateddata);
    return res.status(200).send({ status: true, message: "Success", data: updateddata });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

///////////Delete Catalogue

router.delete('/CatalogueCategory/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return res.status(400).json({ error: 'Invalid id parameter' });
    }
    const result = await ItemCatalogueSchema.deleteOne({ _id: id });
    res.json({ message: 'Affiliated partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


//post and get subscription
const CreateSubscriptionCategorySchema = require('../modal/CreateSubscriptionCategory');

router.post('/CreateSubscriptionCategory', async (req, res) => {
  try {
    const {  } = req.body;
console.log(req.body)
   
    const savedDropdwn = await CreateSubscriptionCategorySchema.create(req.body);
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});



//GET API


router.get('/CreateSubscriptionCategory', async (req, res) => {
  try {
       console.log("hello")
   

    const savedDropdwn = await CreateSubscriptionCategorySchema.find();
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});


///////Get Subs Category

router.get('/CreateSubscriptionCategory/:id', async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id); 
    const savedDropdwn = await CreateSubscriptionCategorySchema.findById(id);
    console.log(savedDropdwn);

    res.status(200).json(savedDropdwn);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});


////Put Subs Category
router.put('/CreateSubscriptionCategory/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  
  console.log(id)
  

  try {
    const updates = await CreateSubscriptionCategorySchema.findOne({_id:id});
    if (!updates) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    const updateddata = await CreateSubscriptionCategorySchema.findByIdAndUpdate(id, data, { new: true });
    if (!updateddata) {
      return res.status(500).json({ error: 'Failed to update affiliate' });
    }

    console.log(updateddata);
    return res.status(200).send({ status: true, message: "Success", data: updateddata });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});
///////////////////Delete Subscription plan

router.delete('/CreateSubscriptionCategory/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return res.status(400).json({ error: 'Invalid id parameter' });
    }
    const result = await CreateSubscriptionCategorySchema.deleteOne({ _id: id });
    res.json({ message: 'Affiliated partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
///////////////////////////////////////
///POST PPROMO

aws.config.update({
  accessKeyId: "AKIARD63KSO4FYHW7VVX",
  secretAccessKey: "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",
  region: "ap-south-1",
});

let uploads = async (file) => {
  return new Promise(function (resolve, reject) {
    // this function will upload file to aws and return the link

    let s3 = new aws.S3({ apiVersion: "2006-03-01" }); // we will be using the s3 service of aws

    var uploadParams = {
      Bucket: "bp-profilepicture-upload",
      Key: "abc/" + file.originalname,
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ error: err });
      }
      console.log("file uploaded succesfully");
      return resolve(data.Location);
    });
  });
};

const PromoCodeSchema = require('../modal/PromoCode');
const PromoCode = async function(req,res){
  try {
    const data = req.body;
    const files = req.files

    const {} = data
    if (
      !(
        files[0].mimetype == "image/png" ||
        files[0].mimetype == "image/jpg" ||
        files[0].mimetype == "image/jpeg"
      )
    ) {
      return res.status(400).send({
        status: false,
        message: "Only .png, .jpg and .jpeg format allowed!",
      });
    }
    let uploadedFileURL = await uploads(files[0]);

    data.profilePic = uploadedFileURL;

    //creating customer
    let PromoCode = await PromoCodeSchema.create(data)
    return res.status(201).send({
      status: true,
      message: "Success",
      profilePic: uploadedFileURL,
    });
    
    
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
}



router.post('/CreatePromoCode', PromoCode);


//get Promo
router.get('/CreatePromoCode', async (req, res) => {
  try {
       console.log("hello")
   
// console.log(newBusinessState)
    const savedDropdwn = await PromoCodeSchema.find();
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});

///////Get promo by id 

router.get('/CreatePromoCode/:id', async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id); 
    const savedDropdwn = await PromoCodeSchema.findById(id);
    console.log(savedDropdwn);

    res.status(200).json(savedDropdwn);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});


////Put Promo
router.put('/CreatePromoCode/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  
  console.log(id)
  

  try {
    const updates = await PromoCodeSchema.findOne({_id:id});
    if (!updates) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    const updateddata = await PromoCodeSchema.findByIdAndUpdate(id, data, { new: true });
    if (!updateddata) {
      return res.status(500).json({ error: 'Failed to update affiliate' });
    }

    console.log(updateddata);
    return res.status(200).send({ status: true, message: "Success", data: updateddata });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

///Delete Promo

router.delete('/CreatePromoCode/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return res.status(400).json({ error: 'Invalid id parameter' });
    }
    const result = await PromoCodeSchema.deleteOne({ _id: id });
    res.json({ message: 'Affiliated partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



//Post login

const LoginSchema = require('../modal/Login')

router.post('/Login',async(req,res)=>{
try{
  
    const login = await LoginSchema.findOne(req.body);
    if (!login){
      return res.send({status:false})
    }
    res.send({status:true})
    }
    catch(err){
      console.log(err.message)
    }

    
})


/////////////////////////////////////////
//POST Notification

aws.config.update({
  accessKeyId: "AKIARD63KSO4FYHW7VVX",
  secretAccessKey: "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",
  region: "ap-south-1",
});

let uploadss = async (file) => {
  return new Promise(function (resolve, reject) {
    // this function will upload file to aws and return the link

    let s3 = new aws.S3({ apiVersion: "2006-03-01" }); // we will be using the s3 service of aws

    var uploadParams = {
      Bucket: "bp-profilepicture-upload",
      Key: "abc/" + file.originalname,
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ error: err });
      }
      console.log("file uploaded succesfully");
      return resolve(data.Location);
    });
  });
};

const  NotificationSchema= require('../modal/Notification');

const  Notification= async function(req,res){
  try {
    const data = req.body;
    const files = req.files

    const {} = data
    if (
      !(
        files[0].mimetype == "image/png" ||
        files[0].mimetype == "image/jpg" ||
        files[0].mimetype == "image/jpeg"
      )
    ) {
      return res.status(400).send({
        status: false,
        message: "Only .png, .jpg and .jpeg format allowed!",
      });
    }
    let uploadedFileURL = await uploadss(files[0]);

    data.profilePic = uploadedFileURL;

    //creating customer
    let Notification = await NotificationSchema.create(data)
    return res.status(201).send({
      status: true,
      message: "Success",
      profilePic: uploadedFileURL,
    });
    
    
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
}



router.post('/CreateNotification',Notification );


//get merchannt
router.get('/CreateNotification', async (req, res) => {
  try {
       console.log("hello")
   
// console.log(newBusinessState)
    const savedDropdwn = await NotificationSchema.find();
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});



//////POST Dispute 

const CreateDisputeSchema = require('../modal/Dispute');

router.post('/DisputeReasons', async (req, res) => {
  try {
    const {  } = req.body;
console.log(req.body)
   
    const savedDropdwn = await CreateDisputeSchema.create(req.body);
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});

///////Delete Dispute

router.delete('/DisputeCategory/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return res.status(400).json({ error: 'Invalid id parameter' });
    }
    const result = await CreateDisputeSchema.deleteOne({ _id: id });
    res.json({ message: 'Affiliated partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


////Get Dispute 

router.get('/CreateDisputeReason', async (req, res) => {
  try {
       console.log("hello")
   
// console.log(newBusinessState)
    const savedDropdwn = await CreateDisputeSchema.find();
    console.log(savedDropdwn);

    res.status(201).json(savedDropdwn);
  } 

  
   catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});

///////////Get Dispute by id 

router.get('/DisputeCategory/:id', async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id); 
    const savedDropdwn = await CreateDisputeSchema.findById(id);
    console.log(savedDropdwn);

    res.status(200).json(savedDropdwn);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});


////Put Promo
router.put('/DisputeCategory/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  
  console.log(id)
  

  try {
    const updates = await CreateDisputeSchema.findOne({_id:id});
    if (!updates) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    const updateddata = await CreateDisputeSchema.findByIdAndUpdate(id, data, { new: true });
    if (!updateddata) {
      return res.status(500).json({ error: 'Failed to update affiliate' });
    }

    console.log(updateddata);
    return res.status(200).send({ status: true, message: "Success", data: updateddata });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;

