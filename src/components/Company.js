import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import "./styles/CompanyList.css";
import {toast} from 'react-toastify'
import { getAllCompanies,addCompanyToDb,deleteCompanyToDb,editCompanyToDb } from "../services/company-service";
export const CompanyList = () => {
  const [companiesLoaded,setCompaniesLoaded] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [nextCompanyId, setNextCompanyId] = useState(1);
  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const [editingCompanyName, setEditingCompanyName] = useState("");

  //   useEffect(()=>{
  //     getAllCompanies().then((data)=>{
  //         let nc = []
  //         data.forEach((company)=>{
  //             nc.push({
  //                 id: company.id,
  //                 name: company.companyName
  //             })
  //         })
  //         setCompanies(nc);
  //     }).catch((err)=>{
  //         console.log(err);
  //     })
  //   },);

  const loadCompaniesFromDb = async ()=>{
    getAllCompanies()
    .then((data) => {
      let nc = [];
      data.forEach((company) => {
        nc.push({
          id: company.id,
          name: company.companyName,
        });
      });
      setCompanies(nc);
      
    })
    .catch((err) => {
      console.log(err);
    });
  }
  if(companiesLoaded === false){
   loadCompaniesFromDb();
   setCompaniesLoaded(true);
  }
  

  const addCompany = (e) => {
    e.preventDefault();
    if (!newCompanyName.trim()) return;

    addCompanyToDb({companyName: newCompanyName}).then((data)=>{
        const newCompany = {
            id: data.id,
            name: data.companyName,
          };
           setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
           setNewCompanyName("");
    }).catch((error)=>{
        console.log(error);
    })

  };

  const startEditingCompany = (id, name) => {
    setEditingCompanyId(id);
    setEditingCompanyName(name);
  };

  const cancelEditingCompany = () => {
    setEditingCompanyId(null);
    setEditingCompanyName("");
  };

  const saveEditingCompany = (id) => {
    editCompanyToDb({id:id,companyName:editingCompanyName}).then((data)=>{
            setEditingCompanyId(null);
    setEditingCompanyName("");
        loadCompaniesFromDb();
    }).catch((error)=>{
        console.log(error);
    })

    // setCompanies((prevCompanies) => {
    //   const updatedCompanies = prevCompanies.map((company) => {
    //     if (company.id === id) {
    //       company.name = editingCompanyName.trim()
    //         ? editingCompanyName
    //         : company.name;
    //     }
    //     return company;
    //   });
    //   return updatedCompanies;
    // });
    // setEditingCompanyId(null);
    // setEditingCompanyName("");
  };

  const deleteCompany = (id) => {
    // setCompanies((prevCompanies) => {
    //   const updatedCompanies = prevCompanies.filter(
    //     (company) => company.id !== id
    //   );
    //   return updatedCompanies;
    // });
    deleteCompanyToDb(id).then(()=>{
        toast.success("Company deleted successfully");
        loadCompaniesFromDb();
    }).catch((err)=>{
        console.log(err);
    })
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={addCompany}>
            <FormGroup>
              <Label for="companyName">Company Name</Label>
              <Input
                type="text"
                name="companyName"
                id="companyName"
                placeholder="Enter company name"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Add Company
            </Button>
          </Form>
        </Col>
        <Col>
          <h1>Company List</h1>
          <ul className="company-list">
            {companies.map((company) => (
              <li key={company.id}>
                <Card>
                  <CardHeader>ID: {company.id}</CardHeader>
                  <CardBody>
                    {editingCompanyId === company.id ? (
                      <Form onSubmit={() => saveEditingCompany(company.id)}>
                        <FormGroup>
                          <Label for={`companyName_${company.id}`}>Name:</Label>
                          <Input
                            type="text"
                            name={`companyName_${company.id}`}
                            id={`companyName_${company.id}`}
                            value={editingCompanyName}
                            onChange={(e) =>
                              setEditingCompanyName(e.target.value)
                            }
                          />
                        </FormGroup>
                      </Form>
                    ) : (
                      <>
                        <h2>{company.name}</h2>
                        <Button
                          color="primary"
                          onClick={() =>
                            startEditingCompany(company.id, company.name)
                          }
                        >
                          Edit
                        </Button>
                      </>
                    )}
                  </CardBody>
                  <CardFooter>
                    <Button
                      color="danger"
                      onClick={() => deleteCompany(company.id)}
                    >
                      Delete
                    </Button>
                    {editingCompanyId === company.id && (
                      <>
                        <Button
                          color="secondary"
                          onClick={cancelEditingCompany}
                        >
                          Cancel
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => saveEditingCompany(company.id)}
                        >
                          Save
                        </Button>
                      </>
                    )}
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};
