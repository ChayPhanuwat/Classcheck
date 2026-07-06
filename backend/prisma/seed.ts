import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      { roleName: "Admin", description: "System Administrator" },
      { roleName: "Director", description: "School Director" },
      { roleName: "ViceDirector", description: "Vice Director" },
      { roleName: "Teacher", description: "Teacher" },
    ],
    skipDuplicates: true,
  });

  await prisma.schoolYear.createMany({
    data: [
      {
        yearName: "2569",
        startDate: new Date("2026-05-01"),
        endDate: new Date("2027-03-31"),
        isActive: true,
      },
    ],
    skipDuplicates: true,
  });

  const schoolYear = await prisma.schoolYear.findFirst();

  if (!schoolYear) throw new Error("No school year found");

  await prisma.semester.createMany({
    data: [
      {
        semesterName: "1",
        schoolYearId: schoolYear.id,
        startDate: new Date("2026-05-01"),
        endDate: new Date("2026-10-01"),
        isActive: true,
      },
      {
        semesterName: "2",
        schoolYearId: schoolYear.id,
        startDate: new Date("2026-11-01"),
        endDate: new Date("2027-03-31"),
        isActive: false,
      },
    ],
    skipDuplicates: true,
  });

  console.log("🌱 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });