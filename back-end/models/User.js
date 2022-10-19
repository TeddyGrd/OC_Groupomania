const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    username:{type:String,required:true , unique:true, trimp: true},
    email: { type:String, required:true , unique:true,trimp:true  },
    password:{type: String, required: true, trimp: true},
    admin:{type:Number, required:true, default: 0},
    imageUrl:{type: String, required: true, default:"./uploads/profils/DefaultProfile.jpg"},
    likes:{type:[String]}
},
    {timestamps : true} )
  ;

userSchema.plugin(uniqueValidator);

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email')
  };

module.exports = mongoose.model('User',userSchema);