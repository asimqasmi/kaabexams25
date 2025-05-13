import { db } from ".";
import { teachers } from "./schema/teachers";
import { students } from "./schema/students";
// import { lessons } from "./schema/lessons";
// import { subjects } from "./schema/subjects";
// import { specialities } from "./schema/specialities";
// import { rooms } from "./schema/rooms";
// import { periods } from "./schema/periods";
// import { timings } from "./schema/timings";
// import { seasons } from "./schema/seasons";

// import { seedSpecialities } from "./seeds/seedSpecialities";
// import { seedSubjects } from "./seeds/seedSubjects";
import { seedTeachers } from "./seeds/seedTeachers";
import { seedStudents } from "./seeds/seedStudents";
// import { seedLessons } from "./seeds/seedLessons";
// import { seedRooms } from "./seeds/seedRooms";
// import { seedPeriods } from "./seeds/seedPeriods";
// import { seedTimings } from "./seeds/seedTimings";
// import { seedSeasons } from "./seeds/seedSeasons";

// import { seedDays } from "./seeds/days";
// import { seedClassrooms } from "./seeds/classrooms";
// import { seedSublessons } from "./seeds/sublessons";
// import { seedAbsences } from "./seeds/absences";

async function cleanupTables() {
  console.log("Cleaning up existing data...");
  await db.transaction(async (tx) => {
    console.log("Start transaction");

    await tx.delete(students);
    // await tx.delete(lessons);
    // await tx.delete(rooms);
    await tx.delete(teachers);
    // await tx.delete(subjects);
    // await tx.delete(specialities);
    // await tx.delete(periods);
    // await tx.delete(timings);
    // await tx.delete(seasons);
  });
  console.log("Cleanup completed.");
}

const main = async () => {
  console.log("Seeding Started......");

  await cleanupTables();

  try {
    // await seedSpecialities();
    // await seedSubjects();
    await seedTeachers();
    // await seedRooms();
    // await seedLessons();
    await seedStudents();
    // await seedPeriods();
    // await seedTimings();
    // await seedSeasons();
    // await seedDays();
    // await seedClassrooms();
    // await seedSublessons();
    // await seedAbsences();

    console.log("Seeding Finished..... 🌱");
  } catch (error) {
    console.error("Error seeding:", error);
  } finally {
    process.exit(0);
  }
};

main()
  .then()
  .catch((err) => {
    console.log(err);
    process.exit(0);
  });
