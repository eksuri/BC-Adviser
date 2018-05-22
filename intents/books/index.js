const schema = require('./_schema.json')
exports.schema = schema

const texts = require('../../common/texts');


exports.GetBookIntent = function () {
    console.log("HI")

    const CourseAbbrev = this.event.request.intent.slots.CourseAbbrev.value;
    const CourseNumber = this.event.request.intent.slots.CourseNumber.value;
    const ItemNumber = this.event.request.intent.slots.ItemNumber.value;
    let speechOutput;
    let bookAndAuthor = "";

    if (CourseAbbrev == "" || CourseAbbrev == null)
    {
        speechOutput = "You need to provide a course name.";
    }
    else if (ItemNumber == "" || ItemNumber == null)
    {
        speechOutput = "You need to provide an item number.";
    } 
    else 
    {
        texts.getTexts(CourseAbbrev, CourseNumber, ItemNumber,  (books) => {
        
            if (books != null && books[0] != null)
            {
                i = 0;
                while (books[i] != null) 
                {
                    bookAndAuthor = bookAndAuthor + books[i] + ", by " + books[i+1];
                    if (books[i + 2] != null)
                    {
                        bookAndAuthor = bookAndAuthor + ", ";
                    }
                    else 
                    {
                         bookAndAuthor = bookAndAuthor + ".";
                    }
                    i = i + 2;
                }
               
                if (bookAndAuthor.includes("No Textbook Required"))
                {
                    speechOutput = "There are no recommended books for " + CourseAbbrev + " " + CourseNumber + " item number " + ItemNumber;
                }
                else
                {
                    speechOutput = "Books required for " + CourseAbbrev + " " + CourseNumber + " item number " + ItemNumber + " are: " +  bookAndAuthor;
                }
            }
            else {
                speechOutput = "There are no recommended books for " + CourseAbbrev + " " + CourseNumber + " item number " + ItemNumber;
            }
        });
    }
    this.response.speak(speechOutput);
    this.emit(':responseReady');
}

