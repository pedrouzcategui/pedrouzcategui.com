import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: 200 });
}

export async function POST() {
  return NextResponse.json({ message: "Resource Created" }, { status: 201 });
}

export async function PUT() {
  // Create post
  return NextResponse.json({ message: "Resource Updated" }, { status: 204 });
}

export async function DELETE() {
  // Create post
  return NextResponse.json({ message: "Resource Deleted" }, { status: 204 });
}
