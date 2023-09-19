/**
 * @ Author: Abdou Lahi DIOP
 * @ Create Time: 2023-09-18 17:55:39
 * @ Modified by: Abdou Lahi DIOP
 * @ Modified time: 2023-09-18 23:12:53
 * @ Description:
 */

import { Router } from "express";
import {
    AddEmployee,
    deleteEmployeeByDepartment,
    getEmployeesByDepartment,
    updateEmployeeByDepartment
} from "../controllers/employees.controller";

const router = Router({ mergeParams: true });

router.get('/', getEmployeesByDepartment);
router.post('/', AddEmployee);
router.put('/:employeeId', updateEmployeeByDepartment)
router.delete('/:employeeId', deleteEmployeeByDepartment);


export default router;