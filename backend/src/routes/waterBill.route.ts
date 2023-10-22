import express from "express";
import Joi from "joi";
import { checkToken } from "../config/safeRoutes";

import WaterBill from "../models/waterBill"; // Change EnergyBill to WaterBill
import { connection } from "../server/database";

const router = express.Router();

const WaterBillSchema = Joi.object().keys({ // Change EnergyBillSchema to WaterBillSchema
  waterBillID: Joi.string().optional().uuid(),
  liter: Joi.number().required(),
  value: Joi.number().required(),
  date: Joi.date().required(),
});

router.get("/all", (_, res) => {
  const waterBillRepository = connection!.getRepository(WaterBill); // Change energyBillRepository to waterBillRepository

  waterBillRepository.findAndCount().then((waterBills) => { // Change energyBills to waterBills
    res.json({ success: true, waterBills }); // Change energyBills to waterBills
  }).catch(() => res.json({ success: false }));
});

router.post("/register", (req, res) => {
  // Joy Validation
  const result = WaterBillSchema.validate(req.body); // Change EnergyBillSchema to WaterBillSchema
  if (result.error) {
    res.status(422).json({
      success: false,
      msg: `Validation err: ${result.error.details[0].message}`,
    });
    return;
  }

  const { liter, value, date } = req.body;

  const waterBillRepository = connection!.getRepository(WaterBill); 

  const waterBill = new WaterBill(); // Change EnergyBill to WaterBill
  waterBill.liter = liter;
  waterBill.value = value;
  waterBill.date = date;

  waterBillRepository.save(waterBill).then((e) => { // Change EnergyBill to WaterBill
    res.json({
      success: true,
      waterBillID: e.id, // Change EnergyBillID to WaterBillID
      msg: "The Water Bill was successfully registered", // Change EnergyBill to WaterBill
    });
  });
});

router.post("/edit", checkToken, (req, res) => {
  const result = WaterBillSchema.validate(req.body); // Change EnergyBillSchema to WaterBillSchema
  if (result.error) {
    res.status(422).json({
      success: false,
      msg: `Validation err: ${result.error.details[0].message}`,
    });
    return;
  }

  const { waterBillID, liter, value, date } = req.body; // Change energyBillID to waterBillID

  const waterBillRepository = connection!.getRepository(WaterBill); // Change energyBillRepository to waterBillRepository

  waterBillRepository.find({ id: waterBillID }).then((waterBill) => { // Change EnergyBill to WaterBill
    if (waterBill.length === 1) { // Change EnergyBill to WaterBill
      const query = { id: waterBill[0].id }; // Change EnergyBill to WaterBill
      const newvalues = { liter, value, date };
      waterBillRepository.update(query, newvalues)
        .then(() => {
          res.json({ success: true });
        })
        .catch(() => {
          res.json({
            success: false,
            msg: "There was an error. Please contract the administrator",
          });
        });
    } else {
      res.json({ success: false, msg: "Error updating Water Bill" }); // Change Energy Bill to Water Bill
    }
  });
});

export default router;
