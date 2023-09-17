/**
 * @ Author: Abdou Lahi DIOP
 * @ Create Time: 2023-09-17 09:41:39
 * @ Modified by: Abdou Lahi DIOP
 * @ Modified time: 2023-09-17 15:47:04
 * @ Description:
 */

import { InferSchemaType, Schema, model } from "mongoose";
import { employeeSchema } from "./employees.model";


const departmentSchema = new Schema({
    code: String,
    name: String,
    employees: [employeeSchema]
});

export type IDepartment = InferSchemaType<typeof departmentSchema>;
export default model<IDepartment>('Department', departmentSchema);