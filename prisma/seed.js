// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.reservation.deleteMany();
  await prisma.block.deleteMany();
  await prisma.carUnit.deleteMany();
  await prisma.car.deleteMany();
  await prisma.customer.deleteMany();

  // 1) Nový Caravelle (2 jednotky)
  const caravelle = await prisma.car.create({
    data: {
      brand: "Volkswagen",
      model: "Nový Caravelle",
      variant: null,
      year: 2024,
      seats: 8,
      transmission: "manual",
      fuel: "diesel",
    }
  });

  await prisma.carUnit.createMany({
    data: [
      { carId: caravelle.id, plate: "2B1 1111", mileage: 15000, color: "bílá", status: "available" },
      { carId: caravelle.id, plate: "2B1 1112", mileage: 20000, color: "stříbrná", status: "available" }
    ]
  });

  // 2) Nový Caravelle Style (1 jednotka)
  const caravelleStyle = await prisma.car.create({
    data: {
      brand: "Volkswagen",
      model: "Nový Caravelle",
      variant: "Style",
      year: 2024,
      seats: 8,
      transmission: "auto",
      fuel: "diesel",
    }
  });

  await prisma.carUnit.create({
    data: { carId: caravelleStyle.id, plate: "2B1 1113", mileage: 8000, color: "černá", status: "available" }
  });

  // 3) Crafter skříňový - střední rozvor (1 jednotka)
  const crafterMid = await prisma.car.create({
    data: {
      brand: "Volkswagen",
      model: "Crafter",
      variant: "skříňový - střední rozvor",
      year: 2023,
      seats: 3,
      transmission: "manual",
      fuel: "diesel",
    }
  });

  await prisma.carUnit.create({
    data: { carId: crafterMid.id, plate: "3C2 2221", mileage: 60000, color: "bílá", status: "available" }
  });

  // 4) Crafter skříňový - dlouhý rozvor (1 jednotka)
  const crafterLong = await prisma.car.create({
    data: {
      brand: "Volkswagen",
      model: "Crafter",
      variant: "skříňový - dlouhý rozvor",
      year: 2023,
      seats: 3,
      transmission: "manual",
      fuel: "diesel",
    }
  });

  await prisma.carUnit.create({
    data: { carId: crafterLong.id, plate: "3C2 2222", mileage: 55000, color: "stříbrná", status: "available" }
  });

  // 5) Multivan Long (1 jednotka)
  const multivan = await prisma.car.create({
    data: {
      brand: "Volkswagen",
      model: "Multivan",
      variant: "Long",
      year: 2024,
      seats: 7,
      transmission: "auto",
      fuel: "petrol",
    }
  });

  await prisma.carUnit.create({
    data: { carId: multivan.id, plate: "1A2 3333", mileage: 5000, color: "modrá", status: "available" }
  });

  // 6) California (1 jednotka)
  const california = await prisma.car.create({
    data: {
      brand: "Volkswagen",
      model: "California",
      variant: null,
      year: 2024,
      seats: 4,
      transmission: "auto",
      fuel: "diesel",
    }
  });

  await prisma.carUnit.create({
    data: { carId: california.id, plate: "1A2 3334", mileage: 4000, color: "béžová", status: "available" }
  });

  console.log("Seed hotov — vloženy modely a jednotky.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });