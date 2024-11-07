function foo(name, score) {
    this.name = name;
    this.score = score;

    this.getGrade = function() {
        if (this.score >= 90) {
            return "A";
        } else if (this.score >= 80) {
            return "B";
        } else if (this.score >= 70) {
            return "C";
        } else if (this.score >= 60) {
            return "D";
        } else {
            return "F";
        }
    }
}

function bar(name, score) {
    this.name = name;
    this.score = score;
    
}


// getGrade를 프로토타입 메서드로 정의
bar.prototype.getGrade = function() {
    if (this.score >= 90) {
        return "A";
    } else if (this.score >= 80) {
        return "B";
    } else if (this.score >= 70) {
        return "C";
    } else if (this.score >= 60) {
        return "D";
    } else {
        return "F";
    }
};

export { foo, bar };