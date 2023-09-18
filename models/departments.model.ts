/**
 * @ Author: Abdou Lahi DIOP
 * @ Create Time: 2023-09-17 09:41:39
 * @ Modified by: Abdou Lahi DIOP
 * @ Modified time: 2023-09-18 16:14:36
 * @ Description:
 */

import { InferSchemaType, Schema, model } from "mongoose";
import { employeeSchema } from "./employees.model";


const departmentSchema = new Schema({
    code: { type: String, unique: true },
    name: { type: String, unique: true },
    employees: [employeeSchema]
});

export type IDepartment = InferSchemaType<typeof departmentSchema>;
export default model<IDepartment>('Department', departmentSchema);