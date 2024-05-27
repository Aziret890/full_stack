                search product
router.post("/search", async (req,res) => {
    const allTasks = await Task.find({title : req.body.query})
    if(!allTasks || allTasks.length === 0) res.status(400).send({error : "No task was found"})
    res.status(200).send(allTasks)
})