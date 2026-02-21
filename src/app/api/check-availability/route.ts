// src/app/api/check-availability/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { from, to } = body;
    if (!from || !to) return NextResponse.json({ error: "from/to required" }, { status: 400 });

    const newFrom = new Date(from);
    const newTo = new Date(to);
    if (isNaN(newFrom.getTime()) || isNaN(newTo.getTime())) {
      return NextResponse.json({ error: "invalid_dates" }, { status: 400 });
    }

    const rows: Array<any> = await prisma.$queryRawUnsafe(`
      SELECT cu.id as carUnitId, c.id as carId, c.brand, c.model, c.variant
      FROM CarUnit cu
      JOIN Car c ON c.id = cu.carId
      WHERE cu.status = 'available'
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

    const map = new Map();
    rows.forEach((r: any) => {
      const key = r.carId;
      const prev = map.get(key);
      if (prev) prev.availableCount++;
      else map.set(key, { carId: r.carId, brand: r.brand, model: r.model, variant: r.variant, availableCount: 1 });
    });

    const models = Array.from(map.values()).sort((a: any, b: any) => b.availableCount - a.availableCount);

    return NextResponse.json({ from: newFrom.toISOString(), to: newTo.toISOString(), models });
  } catch (e) {
    console.error("check-availability error:", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}