import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 }); // Si la validación no es correcta, devuelve error

  // crea el 'issue' utilizando el cliente de prisma
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  // devuelve el objeto creado con el status 201(objeto creado)
  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(req: NextRequest) {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  try {
    const updatedIssue = await prisma.issue.update({
      where: { id: body.id },
      data: { title: body.title, description: body.description, status: body?.status },
    });
    return NextResponse.json(updatedIssue, { status: 200 });
  } catch (error) {
    return NextResponse.json("Issue not found", { status: 404 });
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  try {
    const deletedIssue = await prisma.issue.delete({
      where: { id: body.id },
    });
    // Reestablecer 'AUTO_INCREMENT'
    await prisma.$executeRaw`ALTER TABLE issue AUTO_INCREMENT = 1;`;
    return NextResponse.json(deletedIssue, { status: 200 });
  } catch (error) {
    return NextResponse.json("Issue not found", { status: 404 });
  }
}
