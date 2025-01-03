import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AdminModule = () => {
  const [companies, setCompanies] = useState([]);
  const [methods, setMethods] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: '',
    location: '',
    linkedInProfile: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    periodicity: '',
  });
  const [newMethod, setNewMethod] = useState({
    name: '',
    description: '',
    sequence: '',
    mandatory: false,
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingMethodIndex, setEditingMethodIndex] = useState(null);

  // Handle input changes
  const handleInputChange = (field, value, isCompany = true, index = null) => {
    if (isCompany) {
      if (index !== null) {
        const updatedCompanies = [...companies];
        updatedCompanies[index] = { ...updatedCompanies[index], [field]: value };
        setCompanies(updatedCompanies);
      } else {
        setNewCompany({ ...newCompany, [field]: value });
      }
    } else {
      if (index !== null) {
        const updatedMethods = [...methods];
        updatedMethods[index] = { ...updatedMethods[index], [field]: value };
        setMethods(updatedMethods);
      } else {
        setNewMethod({ ...newMethod, [field]: value });
      }
    }
  };

  // Add new company or method
  const handleAdd = (isCompany = true) => {
    if (isCompany) {
      if (!newCompany.name || !newCompany.location || !newCompany.linkedInProfile) {
        alert('Name, Location, and LinkedIn Profile are required!');
        return;
      }
      setCompanies([...companies, { ...newCompany }]);
      setNewCompany({
        name: '',
        location: '',
        linkedInProfile: '',
        emails: '',
        phoneNumbers: '',
        comments: '',
        periodicity: '',
      });
    } else {
      if (!newMethod.name || !newMethod.description || !newMethod.sequence) {
        alert('Name, Description, and Sequence are required!');
        return;
      }
      setMethods([...methods, { ...newMethod }]);
      setNewMethod({
        name: '',
        description: '',
        sequence: '',
        mandatory: false,
      });
    }
  };

  // Edit existing company or method
  const handleEdit = (index, isCompany = true) => {
    isCompany ? setEditingIndex(index) : setEditingMethodIndex(index);
  };

  const handleSaveEdit = (isCompany = true) => {
    isCompany ? setEditingIndex(null) : setEditingMethodIndex(null);
  };

  // Delete company or method
  const handleDelete = (index, isCompany = true) => {
    if (isCompany) {
      setCompanies(companies.filter((_, i) => i !== index));
    } else {
      setMethods(methods.filter((_, i) => i !== index));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Module</h2>

      {/* Company Management */}
      <h3>Company Management</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>LinkedIn Profile</TableCell>
              <TableCell>Emails</TableCell>
              <TableCell>Phone Numbers</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Periodicity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company, index) => (
              <TableRow key={index}>
                {Object.keys(company).map((key) => (
                  <TableCell key={key}>
                    {editingIndex === index ? (
                      <TextField
                        value={company[key]}
                        onChange={(e) => handleInputChange(key, e.target.value, true, index)}
                      />
                    ) : (
                      company[key]
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  {editingIndex === index ? (
                    <Button variant="contained" onClick={() => handleSaveEdit()}>
                      Save
                    </Button>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEdit(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add New Company */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
        {Object.keys(newCompany).map((field) => (
          <TextField
            key={field}
            label={field}
            value={newCompany[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            required={['name', 'location', 'linkedInProfile'].includes(field)}
          />
        ))}
        <IconButton color="primary" onClick={() => handleAdd()}>
          <AddCircleOutlineIcon />
        </IconButton>
      </div>

      {/* Communication Methods Management */}
      <h3>Communication Method Management</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Sequence</TableCell>
              <TableCell>Mandatory</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {methods.map((method, index) => (
              <TableRow key={index}>
                {Object.keys(method).map((key) => (
                  <TableCell key={key}>
                    {editingMethodIndex === index ? (
                      <TextField
                        value={method[key]}
                        onChange={(e) => handleInputChange(key, e.target.value, false, index)}
                      />
                    ) : (
                      key === 'mandatory' ? (method[key] ? 'Yes' : 'No') : method[key]
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  {editingMethodIndex === index ? (
                    <Button variant="contained" onClick={() => handleSaveEdit(false)}>
                      Save
                    </Button>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEdit(index, false)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(index, false)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add New Communication Method */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
        {Object.keys(newMethod).map((field) => (
          <TextField
            key={field}
            label={field}
            value={newMethod[field]}
            onChange={(e) => handleInputChange(field, e.target.value, false)}
          />
        ))}
        <IconButton color="primary" onClick={() => handleAdd(false)}>
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default AdminModule;
