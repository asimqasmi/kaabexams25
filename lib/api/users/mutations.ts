import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import {
  userId,
  NewUserParams,
  // UpdateUserParams,
  // updateUserSchema,
  insertUserSchema,
  users,
  userIdSchema,
} from "@/lib/db/schema/auth";

export const createUser = async (user: NewUserParams) => {
  const newUser = insertUserSchema.parse(user);
  try {
    const [u] = await db.insert(users).values(newUser).returning();
    return { user: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

// export const updateUser = async (id: userId, user: UpdateUserParams) => {
//   const { id: userId } = userIdSchema.parse({ id });
//   const newUser = updateUserSchema.parse(user);
//   try {
//     const [u] =  await db
//      .update(users)
//      // .set({...newUser, updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ") })
//      .where(eq(users.id, userId!))
//      .returning();
//     return { user: u };
//   } catch (err) {
//     const message = (err as Error).message ?? "Error, please try again";
//     console.error(message);
//     throw { error: message };
//   }
// };

export const deleteUser = async (id: userId) => {
  const { id: userId } = userIdSchema.parse({ id });
  try {
    const [u] = await db.delete(users).where(eq(users.id, userId!)).returning();
    return { user: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
