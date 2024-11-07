export default async function main() {
    const students = [
        {name:"alice" , score:85},
        {name:"bob" , score:92},
        {name:"chalre" , score:88},
        {name:"david" , score:76},
        {name:"Eve" , score:95}        
    ]

    for(let i=0;i < students.length;i++) {
        console.log(students[i].name)
    }

    students.forEach(student => {
        console.log(student.name,student.score)        
    });

    const names = students.map(student=>{return student.name});
    console.log(names)

    const topRanker = students.filter(student=> student.score > 90);
    console.log(topRanker)

    // reduce
    const avgScore = students.reduce(
        (total,student)=>total+student.score,
        0)/students.length;
    
    console.log(avgScore)



    
    
}