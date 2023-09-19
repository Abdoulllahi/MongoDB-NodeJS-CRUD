import { RequestHandler } from "express";
import { IResponse } from "../models/types";
import { IEmployee } from "../models/employees.model";
import { Types } from "mongoose";
import Department from "../models/departments.model"


export const AddEmployee: RequestHandler<{ departmentId: string }, IResponse<IEmployee>, IEmployee> =
    async (request, response, next) => {
        try {
            const { departmentId } = request.params;
            const newEmployee = {
                _id: new Types.ObjectId(),
                ...request.body
            }
            const result = await Department.updateOne(
                { _id: departmentId },
                { $push: { employees: newEmployee } }
            );
            if (!result) {
                response.status(422).json({ success: true, data: newEmployee });
            }
            response.status(201).json({ success: true, data: newEmployee })

        } catch (error) {
            next(error);
        }
}

export const getEmployeesByDepartment: RequestHandler<{departmentId: string}, IResponse<IEmployee[]>> = async (request, response, next) => {
    try {
        const result = await Department.findOne(
            { _id: request.params.departmentId },
            { _id: 0 });
        if (!result) {
            response.status(404).json({ success: false, data: [], message: "An error occurred!!!"})
        }
        response.status(200).json({ success: true, data: result?.employees })
    } catch (error) {
        next(error);
    }
}

export const updateEmployeeByDepartment: RequestHandler<{ departmentId: string, employeeId: string }, IResponse<number>, IEmployee> =
    async (request, response, next) => {
        try {
            const { departmentId, employeeId } = request.params;
            const result = await Department.updateOne(
                { _id: departmentId, 'employees._id': employeeId },
                {
                    $set: {
                        'employees.$.name': request.body.name,
                        'employees.$.email': request.body.email,
                        'employees.$.phone': request.body.phone
                }}
            )
        if (!result) {
            response.status(404).json({ success: false, data: 0, message: "An error occurred!!!"})
        }
            response.status(200).json({ success: true, data: (await result).modifiedCount });
    } catch (error) {
        next(error);
    }
}

export const deleteEmployeeByDepartment: RequestHandler<{ departmentId: string, employeeId: string }, IResponse<number>>
    = async (request, response, next) => {
        try {
            const { departmentId, employeeId } = request.params;
            const result = await Department.updateOne(
            { _id: departmentId, 'employees._id': employeeId },
            {$pull: {employees: {_id: employeeId}}}
        )
        if (!result) {
            response.status(404).json({ success: true, data: 0, message: "Employee not found" });
        }
            response.status(202).json({ success: true, data: result.modifiedCount });
        } catch (error) {
            next(error);
        }
    }

