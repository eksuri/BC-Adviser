class State {
    constructor(slots) {
        this.quarter = slots.quarter;
        this.year = slots.year;
        this.subject = slots.subject;
        this.number = slots.number;
        this.id = slots.courseId;
    }

    set quarter(slot) {
        if (slot) {
            this.courseQuarter = slot.value == "autumn" ? "fall" : slot.value;
        }
        else {
            const date = new Date();
            const month = date.getMonth();

            if (month < 4) {
                this.courseQuarter = "winter";
            } else if (month < 7 ) {
                this.courseQuarter = "spring";
            } else if (month < 9 ) {
                this.courseQuarter = "summer";
            } else {
                this.courseQuarter = "fall";
            }
        }
    }

    set year(slot) {
        if (slot) {
            this.courseYear = parseInt(slot.value);
        } else {
            const date = new Date();
            this.courseYear = date.getFullYear();
        }
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