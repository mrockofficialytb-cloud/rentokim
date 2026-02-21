// src/app/api/reservations/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { carUnitId, from, to, customer } = body;
    if (!carUnitId || !from || !to || !customer?.email || !customer?.name) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }

    const newFrom = new Date(from);
    const newTo = new Date(to);

    const conflict: any = await prisma.$queryRawUnsafe(`
      SELECT 1 FROM Reservation r
      WHERE r.carUnitId = '${carUnitId}'
        AND r.status IN ('pending','confirmed','picked')
        AND r."from" < '${newTo.toISOString()}'
        AND r."to"   > '${newFrom.toISOString()}'
      LIMIT 1;
    `);
    if (conflict && conflict.length) return NextResponse.json({ error: "not_available" }, { status: 409 });

    const cust = await prisma.customer.upsert({
      where: { email: customer.email },
      update: {
        name: customer.name,
        phone: customer.phone ?? undefined,
        drivingLicense: customer.drivingLicense ?? undefined,
        updatedAt: new Date(),
      },
      create: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone ?? null,
        drivingLicense: customer.drivingLicense ?? null,
      },
    });

    const reservation = await prisma.reservation.create({
      data: {
        carUnitId,
        from: newFrom,
        to: newTo,
        customerId: cust.id,
        status: "pending",
        source: "web",
      },
    });

    const ownerEmail = process.env.OWNER_EMAIL;
    const ownerMail = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: ownerEmail,
      subject: `Nová rezervace - ${reservation.id}`,
      text: `Přišla nová rezervace.\nID: ${reservation.id}\nZákazník: ${cust.name} ${cust.email}\nAuto ID: ${carUnitId}\nOd: ${newFrom.toISOString()}\nDo: ${newTo.toISOString()}\nStatus: pending`,
    };
    const customerMail = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: cust.email,
      subject: `Potvrzení rezervace ${reservation.id}`,
      text: `Dobrý den ${cust.name},\n\nVaše rezervace byla přijata a zpracovává se. ID rezervace: ${reservation.id}.\nOd: ${newFrom.toISOString()} Do: ${newTo.toISOString()}\n\nDěkujeme.`,
    };

    try {
      await transporter.sendMail(ownerMail);
      await transporter.sendMail(customerMail);
    } catch (mailErr) {
      console.error("mailer error:", mailErr);
      // pokračujeme i když mail selže
    }

    return NextResponse.json({ reservationId: reservation.id, status: reservation.status }, { status: 201 });
  } catch (e) {
    console.error("reservations error:", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}