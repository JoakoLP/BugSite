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
