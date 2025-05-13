import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createTeacherDismissal,
  deleteTeacherDismissal,
  updateTeacherDismissal,
} from "@/lib/api/teacherDismissals/mutations";
import { 
  teacherDismissalIdSchema,
  insertTeacherDismissalParams,
  updateTeacherDismissalParams 
} from "@/lib/db/schema/teacherDismissals";

export async function POST(req: Request) {
  try {
    const validatedData = insertTeacherDismissalParams.parse(await req.json());
    const { teacherDismissal } = await createTeacherDismissal(validatedData);

    revalidatePath("/teacherDismissals"); // optional - assumes you will have named route same as entity

    return NextResponse.json(teacherDismissal, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateTeacherDismissalParams.parse(await req.json());
    const validatedParams = teacherDismissalIdSchema.parse({ id });

    const { teacherDismissal } = await updateTeacherDismissal(validatedParams.id, validatedData);

    return NextResponse.json(teacherDismissal, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = teacherDismissalIdSchema.parse({ id });
    const { teacherDismissal } = await deleteTeacherDismissal(validatedParams.id);

    return NextResponse.json(teacherDismissal, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
