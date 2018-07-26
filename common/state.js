class State {
    constructor(slots) {
        this.courseQuarter = slots.quarter ? (slots.quarter.value == "autumn" ? "fall" : slots.quarter.value) : null;
        this.courseYear = slots.year ? slots.year.value : null;
        this.courseSlug = slots.subject ? slots.subject.value : null;
        this.courseNumber = slots.number ? slots.number.value : null;
        this.courseId = slots.courseId ? slots.courseId.value : null
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