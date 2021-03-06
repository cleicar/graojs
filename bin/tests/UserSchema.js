var UserSchema = function(di) {
  validate = di.validate;
  validator = di.validators.user;

  this.graoui = {
    bundle: "access",
    label: "Users",
    description: "Users of the system",
    refLabel: 'username'
  };

  this.json = {
    id : di.mongoose.Schema.ObjectId,
    username : {
      type : String,
      required : true,
      unique: true,
      trim : true,
      graoui: {
        label: "User Name",
        type: 'input',
        isList: true,
        isFilter: true
      }
    },
    password : {
      type : String,
      required : true,
      graoui: {
        label: "Password",
        type: 'password'
      }
    },
    email : {
      type : String,
      lowercase : true,
      required : false,
      index : true,
      unique : true,
      trim : true,
      validate : validate('isEmail'),
      graoui: {
        label: "Email",
        type: 'email',
        isList: true,
        isFilter: true
      }
    },
    activitys: [{ 
      type: di.mongoose.Schema.Types.ObjectId, 
      ref: 'Activity',
      graoui: {
        label: "Activitys",
        type: "select",
        attr: { multiple: true },
        isList: true,
        isFilter: true
      }
    }],
    enabled : {
      type: Boolean,
      graoui: {
        label: "Enabled",
        type: 'checkbox',
        value: "IS_ENABLED",
        attr: { checked: true },
        isList: true,
        isFilter: true
      }
    },
  };

  this.mongoose = new di.mongoose.Schema(this.json);

  this.mongoose.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) 
      return next();

    user.password = di.hash(user.password);
    next();
  });
};

module.exports = exports = UserSchema;
