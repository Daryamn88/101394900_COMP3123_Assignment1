const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

router.get('/employees', async (req, res) => {
  const employees = await Employee.find();
  res.status(200).json(employees);
});

router.post('/employees', async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.status(201).json({ message: 'Employee created successfully' });
});

// GET all employees
router.get('/employees', async (req, res) => {
    try {
      const employees = await Employee.find();
      res.status(200).json(employees);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
  

// GET employee by ID
router.get('/employees/:eid', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// POST (Create new employee)
router.post('/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// PUT (Update employee by ID)
router.put('/employees/:eid', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, {
      new: true,
    });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee details updated successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// DELETE employee by ID
router.delete('/employees', async (req, res) => {
    try {
      const employeeId = req.query.eid;
      const employee = await Employee.findByIdAndDelete(employeeId);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;
