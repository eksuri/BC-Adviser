const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections');
const texts = require('../../common/web/texts');

exports.GetBookIntent = async function () {
    let speech = new Speech();

    const CourseAbbrev = this.event.request.intent.slots.CourseAbbrev.value;
    const CourseNumber = this.event.request.intent.slots.CourseNumber.value;
    const ItemNumber = this.event.request.intent.slots.ItemNumber.value;

    const courses = await sections.getCourseSection(quarter + year, CourseAbbrev, CourseNumber, ItemNumber);

    console.log(courses);

}

/*
exports.GetBookIntent = async function () {
    let speech = new Speech();

    const CourseAbbrev = this.event.request.intent.slots.CourseAbbrev.value;
    const CourseNumber = this.event.request.intent.slots.CourseNumber.value;
    const ItemNumber = this.event.request.intent.slots.ItemNumber.value;

    let bookAndAuthor = "";

    if (CourseAbbrev == "" || CourseAbbrev == null) {
        speech.say("You need to provide a course name.")
    }
    else if (ItemNumber == "" || ItemNumber == null) {
        speech.say("You need to provide an item number.")
    }
    else {
        books = await texts.getTexts(CourseAbbrev, CourseNumber, ItemNumber);

        if (books != null && books[0] != null) {
            i = 0;
            while (books[i] != null) {
                bookAndAuthor = bookAndAuthor + books[i] + ", by " + books[i + 1];
                if (books[i + 2] != null) {
                    bookAndAuthor = bookAndAuthor + ", ";
                }
                else {
                    bookAndAuthor = bookAndAuthor + ".";
                }
                i = i + 2;
            }

            if (bookAndAuthor.includes("No Textbook Required")) {
                speech.say("There are no recommended books for")
                    .say(CourseAbbrev)
                    .say(CourseNumber)
                    .say("item number")
                    .say(ItemNumber)
            }
            else {
                speech.say("Books required for")
                    .say(CourseAbbrev)
                    .say(CourseNumber)
                    .say("item number")
                    .say(ItemNumber)
                    .say("are")
                    .pause("1s")
                    .say(bookAndAuthor);
            }
        }
        else {
            speech.say("There are no recommended books for")
                .say(CourseAbbrev)
                .say(CourseNumber)
                .say("item number")
                .say(ItemNumber);
        }
    }
    this.emit(':tell', speech.ssml(true));
}

*/