/**
 * @ Author: Abdou Lahi DIOP
 * @ Create Time: 2023-09-17 09:41:25
 * @ Modified by: Abdou Lahi DIOP
 * @ Modified time: 2023-09-18 21:43:25
 * @ Description:
 */

import { InferSchemaType, Schema, model } from "mongoose";

export const employeeSchema = new Schema({
    name: { first: String, last: String },
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
})

export type IEmployee = InferSchemaType<typeof employeeSchema>;