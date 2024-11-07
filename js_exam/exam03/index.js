import {foo,bar} from './foo.js';

export default async function main() {

    const students = [
        new foo("Alice", 85),
        new foo("Bob", 92),
        new foo("Charlie", 88),
        new foo("David", 76),
        new foo("Eve", 95)
    ];

    students.forEach((student) => {
        console.log(`${student.name}: ${student.score} (${student.getGrade()})`);
    });


    const students2 = [
        new bar("Alice", 85),
        new bar("Bob", 92),
        new bar("Charlie", 88),
        new bar("David", 76),
        new bar("Eve", 95)
    ];

    students2.forEach((student) => {
        console.log(`${student.name}: ${student.score} (${student.getGrade()})`);
    });



}