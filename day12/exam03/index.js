function foo(name,score) {
    this.name = name
    this.score = score

    this.getGrade = function() {
        if(this.score > 90) {
            return "A"
        }
        else if(this.score > 80) {
            return "B"
        }
        else if(this.score > 70) {
            return "C"
        }
        else if(this.score > 60) {
            return "D"
        }
        else {
            return "F"
        }
    }
}

export default async function main() {
    console.log("hello es6");

    let _student1 = new foo("Alice",85)

    console.log(_student1)

    console.log(_student1.getGrade())


}