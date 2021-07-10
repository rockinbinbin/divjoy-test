import { Item, User } from '.prisma/client';
import prisma from '../../../lib/prisma'

/**** USERS ****/

// Get user by uid
async function getUser(uid: string) {
  const user = await prisma.user.findUnique({
    where: { id: uid },
  })
  return user;
}

// Get user by stripeCustomerId
async function getUserByCustomerId(customerId: string) {
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  })
  return user;
}

// Create a new user
async function createUser(uid: string, data: Partial<User>) { // Partial<T> represents all subsets of T
  const user = await prisma.user.create({
    data: { id: uid, ...data },
  })
  return user
}

// Update an existing user
async function updateUser(uid: string, data: Partial<User>) { // Partial<T> represents all subsets of T
  const user = await prisma.user.update({
    where: { id: uid },
    data
  })
  return user
}

// Update a user by their stripeCustomerId
async function updateUserByCustomerId(customerId: string, data: Partial<User>) { // Partial<T> represents all subsets of T
  const user = await prisma.user.update({
    where: { stripeCustomerId: customerId },
    data
  })
  return user
}

/**** ITEMS ****/

// Fetch item data
async function getItem(id: number) {
  const item = await prisma.item.findUnique({
    where: { id },
  })
  return item
}

// Fetch all items by owner
async function getItemsByOwner(ownerId: string) {
  const feed = await prisma.item.findMany({
    where: { ownerId },
  })
  return feed;
}

// Create a new item
async function createItem(data: Item) {
  const item = await prisma.item.create({
    data,
  })
  return item
}

// Update an item
async function updateItem(id: number, data: Partial<Item>) { // Partial<T> represents all subsets of T
  const item = await prisma.item.update({
    where: { id },
    data
  })
  return item
}

// Delete an item
async function deleteItem(id: number) {
  const res = await prisma.item.delete({
    where: { id }
  })
  return res
}

export {
  getUser,
  getUserByCustomerId,
  createUser,
  updateUser,
  updateUserByCustomerId,
  getItem,
  getItemsByOwner,
  createItem,
  updateItem,
  deleteItem,
};
