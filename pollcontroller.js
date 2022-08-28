const Poll=require('./poll')

exports.createpollgetcontroller=(req, res, next)=>{
    res.render('forms')
}
exports.createpollpostcontroller=async(req, res, next)=>{
let {title,description,option}=req.body
  option=option?.map((opt)=>{
    return {

        name: opt,
        vote:0
    }
  })

  let polls=new Poll({title,description,option});
try{
await polls.save();
res.redirect('/polls')
}catch(e){
    console.log(e);
}
    console.log(req.body);
   
}

exports.getAllPolls = async (req, res, next) => {
  try {
      let polles = await Poll.find()
      res.render('polls', {polles})
  } catch (e) {
      console.log(e)
  }
}