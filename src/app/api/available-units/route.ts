// src/app/api/available-units/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { carId, from, to } = body;
    if (!carId || !from || !to) return NextResponse.json({ error: "carId/from/to required" }, { status: 400 });

    const newFrom = new Date(from);
    const newTo = new Date(to);

    const units: any = await prisma.$queryRawUnsafe(`
      SELECT cu.id as carUnitId, cu.plate, cu.vin, cu.mileage, cu.color
      FROM CarUnit cu
      WHERE cu.carId = '${carId}'
        AND cu.status = 'available'
        AND NOT EXISTS (
          SELECT 1 FROM Reservation r
          WHERE r.carUnitId = cu.id
            AND r.status IN ('pending','confirmed','picked')
            AND r."from" < '${newTo.toISOString()}'
            AND r."to"   > '${newFrom.toISOString()}'
        )
        AND NOT EXISTS (
          SELECT 1 FROM Block b
          WHERE b.carUnitId = cu.id
            AND b."from" < '${newTo.toISOString()}'
            AND b."to"   > '${newFrom.toISOString()}'
        );
    `);

    return NextResponse.json({ units });
  } catch (e) {
    console.error("available-units error:", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}