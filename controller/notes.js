const Notes = require("../schema/note");

const create = async (request,response)=>{
  const data = request.body;
  try {
    let newNote = new Notes(data);
    const created = await newNote.save();
    response.status(200);
    response.json(created);
  }
  catch(err)
  {
    response.status(424);
    response.json({
      success: false
    });
  }
}

const fetch = async (request,response)=>{
    const myNote = await Notes.find({userId:request.params.id});
    if(myNote.length > 0)
    {
      response.status(200);
      response.json({
        notes: myNote
      });
    }
    else {
      response.status(404);
      response.json({
        message: "notes not available"
      });
    }
}

const deleteNote = async (request,response)=>{
    try {
      await Notes.findByIdAndDelete(request.params.id);
      response.status(200);
      response.json({
        success: true
      });
    }
    catch(err)
    {
      response.status(424);
      response.json({
        success: false
      });
    }
}

module.exports = {
  create,
  fetch,
  deleteNote
}
