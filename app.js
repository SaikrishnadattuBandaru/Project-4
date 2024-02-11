const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));


const students =[
   {
      id_num: 1,
      name: 'Dattu',
      branch:'Mechanical',
      place: 'Vijayawada'
   },

   {
     id_num: 2,
     name: 'Ankesh',
     branch: 'Electrical',
     place: 'Hyderabad'
   },

   {
     id_num: 3,
     name: 'Basheer',
     branch: 'Electronics',
     place: 'Chennai'
   },

   {
     id_num: 4,
     name: 'Vinay',
     branch: 'Electronics',
     place: 'Warangal'
   }

];

app.get('/',(req,res) => 
{
    res.status(200).send("Hey, Welcome to REST API practice using node and express");
});

//GET method to acquire all objects
app.get('/api/students', (req,res) => 
{
    res.status(200).send(students);
});

//GET method to obtain a single object with specific id
app.get('/api/students/:id' , (req,res) => {
    id = req.params.id;
    let obj;
    for(i=0;i<students.length;i++)
    {
        if(students[i].id == id)
        {
            obj = students[i];
            break;
        }
    }
    res.status(200).json(obj);
});

//POST method to post a student object
app.post('/api/students', (req,res) => {
    const obj = {
        id: students.length + 1,
        name: req.body.name,
        branch: req.body.branch,
        place: req.body.place
    }

    students.push(obj);

    res.status(201).send(`A new object with id number ${students.length} is created`);
});

// PUT method to update an existing objects
//updating the place of a person 
app.put('/api/students',(req,res) => {
    const name = req.body.name;
    let ob;
    let old_place;
    for(i=0;i<students.length;i++)
    {
        if(students[i].name == name)
        {
            old_place = students[i].place;
            students[i].place = req.body.updated_place;
            ob=students[i];
        }
    }

    res.status(200).send(`The place of the person with name ${name} is changed from ${old_place} to the updated place that is ${obj.place}.`);
});

//DELETE the obj
app.delete('/api/students',(req,res) => {
    const name = req.body.name;
    let idx;
    for(i=0;i<students.length;i++)
    {
        if(students[i].name == name)
        {
            idx=i;
            break;
        }
    }
    for(i=idx+1;i<students.length;i++)
    {
        students[i].id = students[i].id - 1;
    }

    students.delete(idx);

    res.status(204).send(`The object was found at index ${idx} in the collection and it was deleted`);
});

const port=3000;
app.listen(port,()=>{console.log(`listening on port ${port}`)});