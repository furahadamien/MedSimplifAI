
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');


const DEFAULT_IMAGE_FILE_TYPES = /jpeg|jpg|png|gif/;
const DEFAULT_IMAGE_PROPERTY_NAME = 'image';
const DEFAULT_IMAGES_FOLDER = 'images';
const DEFAULT_IMAGE_WIDTH_PIXELS = 480;
const DEFAULT_IMAGE_HEIGHT_PIXELS = 480;

class Image{

    constructor(){
        let self = this;
        options = options || {};

        self.imageFileTypes = options.imageFileTypes || DEFAULT_IMAGE_FILE_TYPES;

        self.storage = multer.diskStorage({ //multer image storage
        destination: DEFAULT_IMAGES_FOLDER,
        filename: imageFileName
        });
    }

    create(req, res, callback) {
        let self = this;
    
        let upload = multer({
          storage: self.storage, //multer image upload
          fileFilter: imageFileFilter
        }).single(DEFAULT_IMAGE_PROPERTY_NAME);
    
        upload(req, res, function(err) {
          if(err) { 
            return callback(204);
          }
          else if(req.file === undefined) {
            return callback(422);
          }
          else {
            let imageFileName = req.file.originalname;
            let imagePath = path.resolve(DEFAULT_IMAGES_FOLDER + '/' + imageFileName);
            let image = { _id: imageFileName, filename: imageFileName };
    
            resize(imagePath);
    
            return callback(200, { images: [ image ] });
          }
        });
      }
}
module.exports = Image;