import inquirer from "inquirer";

class Student {
    constructor(
        public name: string,
        public id: number,
        public courses: string[],
        public balance: number,
        public fees: number
    ) {}

    enroll(course: string) {
        this.courses.push(course);
    }

    payfees(amount: number) {
        this.balance -= amount; // Balance se amount deduct kar rahe hain
    }
}

class StudentManagmentSystem {
    private students: Student[];

    constructor() {
        this.students = [];
    }

    async addStudents() {
        const answer = await inquirer.prompt([
            {
                message: "Please Enter Your Name",
                type: "input",
                name: "name" // Corrected name property
            },
            {
                message: "Please Select Your Course",
                type: "list",
                name: "course", // Corrected name property
                choices: [
                    "HTML fees 1000/=",
                    "CSS fees 800/=",
                    "Javascript fees 1300/=",
                    "Typescript fees 1200/="
                ]
            },
            {
                message: "Enter Your Selected Course Fees",
                type: "number",
                name: "fees", // Corrected name property
            },
            {
                message: "Please Enter Your Amount",
                type: "number",
                name: "amount" // Corrected name property
            }
        ]);

        const id = Math.floor(Math.random() * 10000 + 1000);
        const course = answer.course;
        const fees = parseInt(answer.fees); // Ensure fees is a number
        const amount = parseInt(answer.amount); // Ensure amount is a number
        const remainingBalance = amount - fees;
        const student = new Student(answer.name, id, [course], remainingBalance, fees);

        this.students.push(student);
    }

    displayStudent() {
        console.log("List of Students");
        this.students.forEach((student, index) => {
            console.log(`Student: ${index + 1}`);
            console.log(`Name: ${student.name}`);
            console.log(`Courses: ${student.courses.join(',')}`);
            console.log(`Balance: ${student.balance}`);
            console.log(`Remaining Balance: ${student.fees}`);
        });
    }
}

async function main() {
    const studentManagementSystem = new StudentManagmentSystem();
    while (true) {
        const { choices } = await inquirer.prompt({
            message: "Please select an action",
            type: "list",
            name: "choices",
            choices: ["Add Student", "Display Student", "Exit"]
        });

        switch (choices) {
            case "Add Student":
                await studentManagementSystem.addStudents();
                break;
            case "Display Student":
                studentManagementSystem.displayStudent();
                break;
            case "Exit":
                console.log("Exiting...");
                return;
            default:
                console.log("Invalid choice!!!");
        }
    }
}

main();