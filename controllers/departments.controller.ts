/**
 * @ Author: Abdou Lahi DIOP
 * @ Create Time: 2023-09-17 16:34:58
 * @ Modified by: Abdou Lahi DIOP
 * @ Modified time: 2023-09-18 17:47:58
 * @ Description:
 */

import { RequestHandler } from "express";
import { IResponse } from "../models/types";
import Department, { IDepartment } from "../models/departments.model";



export const addDepartment: RequestHandler<unknown, IResponse<String>, IDepartment, unknown> =
    async (request, response, next) => {
        try {
            const { code, name } = request.body;
            const result = await Department.create({
                "code": code,
                "name": name
            });
            response.status(201).json({
                success: true,
                message: 'Department successfully created',
                data: result._id.toString()
            });
        } catch (error) {
            console.log('Error creating department')
            next(error)
        }
    }


export const getDepartments: RequestHandler<unknown, IResponse<IDepartment[]>, unknown, { page: number }> =
    async (request, response, next) => {
        try {
            const pageNumber = request.query.page || 1;
            const pageSize = 10;
            const results = await Department.find({}, { _v: 0 })
                .sort({ _id: 1 })
                .skip(pageSize * (pageNumber - 1))
                .limit(pageSize);

            response.status(200).json({ success: true, data: results })
        } catch (error) {
            next(error);
        }

    }


export const getDepartmentById: RequestHandler<{ departmentId: string }, IResponse<IDepartment>, unknown, unknown> =
    async (request, response, next) => {
        try {
            const { departmentId } = request.params;
            const result = await Department.findById(departmentId);
            if (!result) {
                return response.status(404).json({
                    success: false,
                    message: 'Department not found',
                });
            }

            response.status(200).json({
                success: true,
                data: result,
            });
        } catch (error) {
            next(error);
        }

    }


export const updateDepartmentById: RequestHandler<{ departmentId: string }, IResponse<number>, IDepartment> =
    async (request, response, next) => {
        try {
            const { departmentId } = request.params;
            const { code, name } = request.body;
            const result = await Department.updateOne(
                { _id: departmentId },
                { $set: { "code": code, "name": name } }
            );
            response.status(201).json({ success: true, data: result.modifiedCount });
        } catch (error) {
            next(error);
        }

    }



export const deleteDepartmentById: RequestHandler<{ departmentId: string }, IResponse<number>> =
    async (request, response, next) => {
        try {
            const { departmentId } = request.params;
            const result = await Department.deleteOne({ _id: departmentId });
            if (!result) {
                response.status(404).json({ success: false, data: 0, message: "Deletion failed" });
            }

            response.status(202).json({ success: true, data: result.deletedCount });
        } catch (error) {
            next(error);
        }

    }

// 1. request params
// 2. response body
// 3. request body
// 4. request query params