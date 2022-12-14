import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { Container, Button, Table, Row, Col } from "react-bootstrap";

const MakeAdmin = () => {
  const [makeadmin, setMakeAdmin] = useState([]);

  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9000/api/users/getallusers")
      .then((res) => res.json())
      .then((data) => setMakeAdmin(data));
  }, [status]);

  const handleUpdate = (id) => {
    const url = `http://localhost:9000/api/users/update/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(makeadmin),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setStatus(!status);
          Swal.fire("Made Admin Successfully");
        } else {
          setStatus(false);
        }
      });
  };

  return (
    <Container className="mb-5 mt-5" style={{ minHeight: "100vh" }}>
      <div className="col-12 col-md-8 mx-auto">
        <h3 className="text-light-green text-center mt-5 mb-3 text-decoration-underline">
          {" "}
          All Users List
        </h3>
      </div>
      <div>
        <h3 className="text-center my-3">
          Car Bd Has Got Total {makeadmin.length} Users
        </h3>
      </div>
      <Row>
        <Col xs={12} md={10} className="mx-auto">
          <Table striped bordered hover responsive>
            <thead className="text-center">
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Make Admin</th>
              </tr>
            </thead>
            {makeadmin.map((user) => (
              <tbody className="text-center" key={user._id}>
                <tr>
                  <td>
                    <span className="fw-bold text-muted">{user?.email}</span>
                  </td>

                  <td>
                    {user?.isAdmin === true ? (
                      <h6 className="text-success fw-bolder">
                      {user?.isAdmin} {}
                      </h6>
                    ) : (
                      <h6 className="text-danger fw-bolder">
                      {user?.isAdmin}
                       {false}
                      </h6>
                    )}
                  </td>
                  <td>
                    <Button
                      onClick={() => handleUpdate(user._id)}
                      className="btn-light-green fw-semi-bold shadow-none"
                    >
                      Make Admin
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default MakeAdmin;