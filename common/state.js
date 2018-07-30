class State {
    constructor(slots) {
        this.quarter = slots.quarter;
        this.year = slots.year;
        this.subject = slots.subject;
        this.number = slots.number;
        this.id = slots.courseId;
    }

    set quarter(slot) {
        this.courseQuarter = slot ? (slot.value == "autumn" ? "fall" : slot.value) : null;
    }

    set year(slot) {
        this.courseYear = slot? slot.value : null;
    }

    set subject(slot) {
        if (slot.resolutions) {
            this.courseSlug = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        } else {
            this.courseSlug = slot? slot.value : null;
        }
    }

    set number(slot) {
        this.courseNumber = slot? slot.value : null;
    }

    set id(slot) {
        this.courseId = slot? slot.value : null;
    }

    get fullQuarter() {
        return (typeof this.courseQuarter != null & typeof this.courseYear != null) ? this.courseQuarter + this.courseYear : null;
    }

    get quarter() {
        return (typeof this.courseQuarter != null) ? this.courseQuarter : null;
    }

    get year() {
        return (typeof this.courseYear != null) ? this.courseYear : null;
    }

    get subject() {
        return (typeof this.courseSlug != null) ? this.courseSlug : null;
    }

    get number() {
        return (typeof this.courseNumber != null) ? this.courseNumber : null;
    }

    get id() {
        return (typeof this.courseId != null) ? this.courseId : null;
    }

}

module.exports = State