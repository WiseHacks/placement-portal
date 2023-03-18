// import Base from "../components/Base";
import { useState, useEffect } from "react";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";
import "./styles/RoleSelection.css"
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  //handle change event
  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const resetData = () => {
    setData({
      email: "",
      password: "",
      role: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (error.isError) {
      toast.error("Form data is invalid");
      setError({ ...error, isError: false });
      return;
    }

    //data validate
    console.log("in handle submit");

    //call server api for sending data
    signUp(data)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
        toast.success("User is registered successfully!!");
        resetData();
      })
      .catch((error) => {
        console.log(error);

        setError({
          errors: error,
          isError: true,
        });
      });
  };

  return (
    <div className="position-relative container-fluid d-flex justify-content-center align-items-center bg-image bg-opacity">
      {/* White card */}
      <div
        className="card p-4 position-absolute top-50 start-50 translate-middle"
        style={{
          width: "50vw",
          height: "70vh",
          backgroundColor: "rgba(255,255,255,0.85)",
          borderRadius: "50px",
          overflow: "auto",
        }}
      >
        <div className="d-flex flex-column justify-content-center h-100">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <img
              src={require("./logo/logo_new.png")}
              alt="Logo"
              className="mr-2"
              style={{ width: "400px" }}
            />
          </div>
          <Form>
                    {/*email field */}
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input style= {{ paddingLeft: "20px"}}
                        type="email"
                        placeholder="Enter here"
                        id="email"
                        onChange={(e) => handleChange(e, "email")}
                        value={data.email}
                        invalid={
                          error.errors?.response?.data?.email ? true : false
                        }
                      ></Input>
                      <FormFeedback>
                        {error.errors?.response?.data?.email}
                      </FormFeedback>
                    </FormGroup>

                    {/*password field */}
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        style= {{ paddingLeft: "20px"}} 
                        type="password"
                        placeholder="Enter here"
                        id="password"
                        onChange={(e) => handleChange(e, "password")}
                        invalid={
                          error.errors?.response?.data?.password ? true : false
                        }
                        value={data.password}
                      ></Input>

                      <FormFeedback>
                        {error.errors?.response?.data?.password}
                      </FormFeedback>
                    </FormGroup>

                    {/*role field */}
                    <FormGroup>
                      <Label for="roleSelect">Register As</Label>
                      <Input
                        style= {{ paddingLeft: "20px"}} 
                        id="roleSelect"
                        name="select"
                        type="select"
                        onChange={(e) => handleChange(e, "role")}
                        value={data.role}
                      >
                        <option>ADMIN</option>
                        <option>MODERATOR</option>
                        <option>STUDENT</option>
                      </Input>
                    </FormGroup>

                    <Container className="text-center">
                      <Button onClick={handleSubmit} >
                        Register
                      </Button>
                    </Container>
                  </Form>
        </div>
                  
      </div>
    </div>
  );
};

export default Signup;
