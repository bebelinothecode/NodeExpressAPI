const Blog = require('../../models/taskmodel')

const getAllTasks = async(req, res) => {
    await Blog.find()
        .then((result)=>res.send(result))
        .catch((error)=>console.log(error));
}

const createTask = async (req, res) => {
    const blog = new Blog({
        name:req.body.name,
        completed:req.body.completed
    });
    console.log(req.body);

    await blog.save()
    .then((result)=> {
        res.send(result);})
    .catch((error)=>console.log(error));
}

const getTask = async (req, res) => {
    try{
        const {id:taskId} = req.params;
        const task = await Blog.findOne({_id:taskId});
        if(!task) {
            return res.status(404).json({msg:`No task with id: ${taskId}`})
        }
        
        return res.status(200).json({task});

    }catch(error) {
        return res.status(500).json({msg:error});
    }
}

const updateTask = async (req, res) => {
    try{
        const {id:taskId} = req.params;

        const task = await Blog.findByIdAndUpdate({_id:taskId},req.body,{new:true,runValidators:true});

        if(!task) {
            return res.status(404).json({msg:`No task with id: ${taskId}`})
        }
        res.status(200).json({task});
    }catch(error) {

    }
}

const deleteTask = async (req, res) => {
    // res.send('Task deleted');
    try{
        const{id:taskId} = req.params;
        const task = await Blog.findOneAndDelete({_id:taskId});
        if(!task) {
            return res.status(404).json({msg:`No task with id: ${taskId}`})
        }
        return res.status(200).json('Item deleted successfully');
    }catch(error) {
        return res.status(500).json({msg:error});
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}