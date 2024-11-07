

async function main() {
    // 예제 데이터
    const students = [
        { name: "Alice", score: 85 },
        { name: "Bob", score: 92 },
        { name: "Charlie", score: 88 },
        { name: "David", score: 76 },
        { name: "Eve", score: 95 }
    ];

    students.forEach((student) => {
        console.log(`${student.name}: ${student.score}`);
    });

    // map() 함수를 사용하여 학생들의 이름만 추출
    // map: 학생들의 이름을 추출
    const names = students.map(student => student.name);
    console.log("학생 이름 목록:", names);

        
    // filter: 점수가 90점 이상인 학생 필터링
    const topScorers = students.filter(student => student.score >= 90);
    console.log("점수 90 이상인 학생들:", topScorers);
    // 출력: [{ name: "Bob", score: 92 }, { name: "Eve", score: 95 }]

    // reduce: 전체 점수의 평균 계산
    const averageScore = students.reduce((total, student) => total + student.score, 0) / students.length;
    console.log("평균 점수:", averageScore);

}

export default main;