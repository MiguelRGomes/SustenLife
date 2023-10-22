import express from "express";
import Joi from "joi";
import { checkToken } from "../config/safeRoutes";

import EnergyBill from "../models/energyBill";
import { connection } from "../server/database";

const router = express.Router();

const EnergyBillSchema = Joi.object().keys({
  energyBillID: Joi.string().optional().uuid(),
  watts: Joi.number().required(),
  value: Joi.number().required(),
  date: Joi.date().required(),
});

router.get("/all", (_, res) => {
  const energyBillRepository = connection!.getRepository(EnergyBill);

  energyBillRepository.findAndCount().then((energyBills) => {
    res.json({ success: true, energyBills });
  }).catch(() => res.json({ success: false }));
});

router.post("/register", (req, res) => {
  // Joy Validation
  const result = EnergyBillSchema.validate(req.body);
  if (result.error) {
    res.status(422).json({
      success: false,
      msg: `Validation err: ${result.error.details[0].message}`,
    });
    return;
  }

  const { watts, value, date, user_id } = req.body;

  const energyBillRepository = connection!.getRepository(EnergyBill);

  const energyBill = new EnergyBill();
  energyBill.watts = watts;
  energyBill.value = value;
  energyBill.date = date;
  energyBill.user_id = user_id;

  energyBillRepository.save(energyBill).then((e) => {
    res.json({
      success: true,
      energyBillID: e.id,
      msg: "The EnergyBill was successfully registered",
    });
  });
});

router.post("/edit", checkToken, (req, res) => {
  const result = EnergyBillSchema.validate(req.body);
  if (result.error) {
    res.status(422).json({
      success: false,
      msg: `Validation err: ${result.error.details[0].message}`,
    });
    return;
  }

  const { energyBillID, watts, value, date } = req.body;

  const energyBillRepository = connection!.getRepository(EnergyBill);

  energyBillRepository.find({ id: energyBillID }).then((energyBill) => {
    if (energyBill.length === 1) {
      const query = { id: energyBill[0].id };
      const newvalues = { watts, value, date };
      energyBillRepository.update(query, newvalues)
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
      res.json({ success: false, msg: "Error updating Energy Bill" });
    }
  });
});

export default router;