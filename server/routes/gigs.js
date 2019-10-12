const express = require("express");
const pool = require("../config/postgres");

const router = express.Router();

// Get gig list
router.get("/", (req, res) => {
  pool.connect((err, client, done) => {
    if (err) {
      console.error(`Error fetching client from pool: \n ${err}`);
    }

    client.query("SELECT * FROM gigs", (q_err, q_res) => {
      if (q_err) {
        console.error(`Error running query: \n ${q_err}`);
        res.status(400).send(err);
      }
      done();
      res.status(200).send(q_res.rows);
    });
  });
});

// get gig by id
router.get("/:id", (req, res) => {
  pool.connect((err, client, done) => {
    if (err) {
      console.error(`Error fetching client from pool: \n ${err}`);
    }

    client.query(
      "SELECT * FROM gigs WHERE id=$1",
      [req.params.id],
      (q_err, q_res) => {
        if (q_err) {
          console.error(`Error running query: \n ${q_err}`);
          res.status(400).send(err);
        }
        done();
        res.status(200).send(q_res.rows);
      }
    );
  });
});

// Post a gig
router.post("/add", (req, res) => {
  pool.connect((err, client, done) => {
    if (err) {
      console.error(`Error fetching client from pool: \n ${err}`);
    }
    const {
      title,
      technologies,
      budget,
      description,
      contact_email
    } = req.body;
    client.query(
      "INSERT INTO gigs (title, technologies, budget, description, contact_email) VALUES($1, $2, $3, $4, $5)",
      [title, technologies, budget, description, contact_email],
      (q_err, q_res) => {
        if (q_err) {
          console.error(`Error running query: \n ${q_err}`);
          res.status(400).send(err);
        }
        done();
        res.status(201).json({ msg: "Query added" });
      }
    );
  });
});

// update a gig
router.post("/edit", (req, res) => {
  pool.connect((err, client, done) => {
    if (err) {
      console.error(`Error fetching client from pool: \n ${err}`);
    }
    const {
      title,
      technologies,
      budget,
      description,
      contact_email,
      id
    } = req.body;

    client.query(
      "UPDATE gigs SET title=$1, technologies=$2, budget=$3, description=$4, contact_email=$5 WHERE id=$6",
      [title, technologies, budget, description, contact_email, id],
      (q_err, q_res) => {
        if (q_err) {
          console.error(`Error updating query: \n ${q_err}`);
          res.status(400).send(err);
        }
        done();
        res.status(200).json({ msg: "Query updated" });
      }
    );
  });
});

// delete a gig
router.delete("/delete/:id", (req, res) => {
  pool.connect((err, client, done) => {
    if (err) {
      console.error(`Error fetching client from pool: \n ${err}`);
    }
    client.query(
      "DELETE FROM gigs WHERE id=$1",
      [req.params.id],
      (q_err, q_res) => {
        if (q_err) {
          console.error(`Error deleting query: \n ${q_err}`);
          res.status(400).send(err);
        }
        done();
        res.status(200).json({ msg: "Query deleted" });
      }
    );
  });
});

module.exports = router;
