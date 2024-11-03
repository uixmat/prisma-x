'use server';

import prisma from "@/lib/prisma";
import { UserStatus } from "@prisma/client";

import { revalidatePath } from 'next/cache'

// Types
interface CreateUserInput {
  email: string;
  firstName?: string;
  lastName?: string;
  nickname?: string;
  status?: UserStatus;
}

/**
 * Create a new user
 * @param data - The user data
 * @param path - The path to revalidate
 * @returns The created user
 */
export async function createUser(data: CreateUserInput, path: string) {
  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        nickname: data.nickname,
        status: data.status,
      },
    });
    revalidatePath(path);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

/**
 * Get all users ordered by creation date
 * @returns All users
 */
export async function getAllUsers() {
  try {
    return await prisma.user.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}

/**
 * Update a user's status
 * @param userId - The user's ID
 * @param status - The new status
 * @returns The updated user
 */
export async function updateUserStatus(userId: string, status: UserStatus) {
  try {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        status,
      },
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    throw new Error('Failed to update user status');
  }
}

/**
 * Toggle a user's status
 * @param userId - The user's ID
 * @param path - The path to revalidate
 * @returns True if the status was toggled successfully
 */
export async function toggleUserStatus(userId: string, path: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { status: true }
    });

    const newStatus = user?.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    await updateUserStatus(userId, newStatus);
    revalidatePath(path);
    revalidatePath('/');
    revalidatePath('/users');
    return true;
  } catch (error) {
    console.error("Error toggling user status:", error);
    throw new Error('Failed to toggle user status');
  }
}

/**
 * Delete a user
 * @param userId - The user's ID
 * @param path - The path to revalidate
 * @returns The deleted user
 */
export async function deleteUser(userId: string, path: string) {
  try {
    // First verify the user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Then attempt to delete
    const user = await prisma.user.delete({
      where: { id: userId },
    });
    
    revalidatePath(path);
    return user;
  } catch (error) {
    console.error('Error deleting user:', error);
    // Pass the specific error message to the client
    throw new Error(error instanceof Error ? error.message : 'Failed to delete user');
  }
}

/**
 * Update a user
 * @param userId - The user's ID
 * @param data - The user data
 * @param path - The path to revalidate
 * @returns The updated user
 */
export async function updateUser(userId: string, data: CreateUserInput, path: string) {
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        nickname: data.nickname,
        status: data.status,
      },
    });
    revalidatePath(path);
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}

/**
 * Get a user by their ID
 * @param userId - The user's ID
 * @returns The user
 */
export async function getUserById(userId: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}
