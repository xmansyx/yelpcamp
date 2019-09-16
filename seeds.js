const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

var data = [
    {
        name: "Egypt",
        image: "https://images.unsplash.com/photo-1552528366-608e1b2f60cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Consectetur eiusmod eiusmod et fugiat reprehenderit pariatur voluptate ea eiusmod tempor ea ea. Non est pariatur elit ullamco. Dolor ad dolor enim proident. Lorem proident quis elit in commodo quis in consectetur aute. Dolore veniam elit magna eu labore ad enim. Esse enim commodo sit laboris duis laboris irure laboris in."
    },
    {
        name: "US",
        image: "https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Culpa cillum pariatur qui tempor sint ut ad consectetur. Dolor labore aliquip id dolor. Laboris adipisicing anim aliqua nostrud deserunt quis irure est tempor dolore nulla in ut nulla. Mollit culpa aute commodo nisi aute elit reprehenderit est consequat et consequat ullamco velit aute. In tempor dolore dolor eu deserunt esse exercitation eu sunt ad."
    },
    {
        name: "US",
        image: "https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Ad officia minim esse qui. Non Lorem eiusmod anim ut minim laboris magna dolor ullamco incididunt eiusmod amet in labore. Eu et quis anim duis id. Ullamco sint incididunt aute sint enim adipisicing nisi id et incididunt tempor ipsum voluptate do. Amet et ad non eu culpa reprehenderit ad ad voluptate ut irure."
    }
]
function seedDb() {
    Campground.deleteMany({}, (err) => {
        if (err)
            console.log(err)
        else {
            data.forEach((seed) => {
                Campground.create(seed, (err, addSeed) => {
                    if (err)
                        console.log(err)
                    else {
                        console.log("added a campground");
                        Comment.create({
                            text:"good campground",
                            author:"ahmed"
                        },(err,comment)=>{
                            if(err)
                                console.log(err);
                            else{
                                addSeed.comments.push(comment);
                                addSeed.save();
                                console.log("added comment");
                                
                            }
                                
                        })
                    }

                });
            });
        }
    });

}
module.exports = seedDb();