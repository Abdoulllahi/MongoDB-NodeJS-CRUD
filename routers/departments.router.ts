/**
 * @ Author: Abdou Lahi DIOP
 * @ Create Time: 2023-09-17 16:33:36
 * @ Modified by: Abdou Lahi DIOP
 * @ Modified time: 2023-09-18 22:24:54
 * @ Description:
 */

import { Router } from "express";
import {
    addDepartment,
    deleteDepartmentById,
    getDepartmentById,
    getDepartments,
    updateDepartmentById
} from "../controllers/departments.controller";
import employeeRouter from '../routers/employees.router';


const router = Router();

router.post('/', addDepartment);
router.get('/', getDepartments);
router.get('/:departmentId', getDepartmentById);
router.put('/:departmentId', updateDepartmentById);
router.delete('/:departmentId', deleteDepartmentById);
router.use('/:departmentId/employees', employeeRouter)

export default router;